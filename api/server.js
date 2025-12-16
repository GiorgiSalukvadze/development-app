const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'admin123';

const app = express();
app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, 'data.sqlite');
const seedPath = path.join(__dirname, 'seed', 'project.json');

const db = new sqlite3.Database(dbPath);
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS project (id TEXT PRIMARY KEY, data TEXT)');
});

function loadSeed() {
  const raw = fs.readFileSync(seedPath, 'utf8');
  return JSON.parse(raw);
}

function loadProject(callback) {
  db.get('SELECT data FROM project WHERE id = ?', ['project-1'], (err, row) => {
    if (err) return callback(err);
    if (row && row.data) {
      return callback(null, JSON.parse(row.data));
    }
    const seed = loadSeed();
    db.run('INSERT OR REPLACE INTO project (id, data) VALUES (?, ?)', ['project-1', JSON.stringify(seed)], () => {
      callback(null, seed);
    });
  });
}

function saveProject(project, callback) {
  db.run('INSERT OR REPLACE INTO project (id, data) VALUES (?, ?)', ['project-1', JSON.stringify(project)], callback);
}

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Missing token' });
  const [, token] = authHeader.split(' ');
  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

app.get('/health', (_, res) => res.json({ ok: true }));

app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = jwt.sign({ user: username }, JWT_SECRET, { expiresIn: '12h' });
    return res.json({ token });
  }
  res.status(401).json({ error: 'Invalid credentials' });
});

app.get('/project', (req, res) => {
  loadProject((err, project) => {
    if (err) return res.status(500).json({ error: 'Failed to load project' });
    res.json(project);
  });
});

app.post('/admin/reset', authenticate, (req, res) => {
  const seed = loadSeed();
  saveProject(seed, err => {
    if (err) return res.status(500).json({ error: 'Failed to reset project' });
    res.json(seed);
  });
});

app.patch('/units/:unitId', authenticate, (req, res) => {
  const { unitId } = req.params;
  const changes = req.body || {};
  loadProject((err, project) => {
    if (err || !project) return res.status(500).json({ error: 'Failed to load project' });
    const { unit, floor } = findUnit(project, unitId);
    if (!unit || !floor) return res.status(404).json({ error: 'Unit not found' });

    Object.assign(unit, changes);
    updateFloorStatus(floor);
    saveProject(project, saveErr => {
      if (saveErr) return res.status(500).json({ error: 'Failed to save unit' });
      res.json(unit);
    });
  });
});

app.patch('/units/:unitId/status', authenticate, (req, res) => {
  const { unitId } = req.params;
  const { status } = req.body;
  if (!['sold', 'available'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  loadProject((err, project) => {
    if (err || !project) return res.status(500).json({ error: 'Failed to load project' });
    const { unit, floor } = findUnit(project, unitId);
    if (!unit || !floor) return res.status(404).json({ error: 'Unit not found' });
    unit.status = status;
    updateFloorStatus(floor);
    saveProject(project, saveErr => {
      if (saveErr) return res.status(500).json({ error: 'Failed to update status' });
      res.json(unit);
    });
  });
});

app.patch('/floors/:floorId/status', authenticate, (req, res) => {
  const { floorId } = req.params;
  const { status } = req.body;
  if (!['sold', 'available'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  loadProject((err, project) => {
    if (err || !project) return res.status(500).json({ error: 'Failed to load project' });
    const floor = findFloor(project, floorId);
    if (!floor) return res.status(404).json({ error: 'Floor not found' });

    floor.units = floor.units.map(u => ({ ...u, status }));
    updateFloorStatus(floor);
    saveProject(project, saveErr => {
      if (saveErr) return res.status(500).json({ error: 'Failed to save floor status' });
      res.json(floor);
    });
  });
});

function findUnit(project, unitId) {
  for (const building of project.buildings) {
    for (const floor of building.floors) {
      const unit = floor.units.find(u => u.id === unitId);
      if (unit) return { unit, floor };
    }
  }
  return { unit: null, floor: null };
}

function findFloor(project, floorId) {
  for (const building of project.buildings) {
    const floor = building.floors.find(f => f.id === floorId);
    if (floor) return floor;
  }
  return null;
}

function updateFloorStatus(floor) {
  floor.status = floor.units.every(u => u.status === 'sold') ? 'sold' : 'available';
}

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});



