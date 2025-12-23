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

// Disable caching for all routes
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.set('Expires', '0');
  res.set('Pragma', 'no-cache');
  next();
});

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

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

// Request Queue to prevent Lost Updates during concurrent edits
class RequestQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
  }

  add(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this.process();
    });
  }

  async process() {
    if (this.processing) return;
    if (this.queue.length === 0) return;

    this.processing = true;
    const { task, resolve, reject } = this.queue.shift();

    try {
      const result = await task();
      resolve(result);
    } catch (err) {
      reject(err);
    } finally {
      this.processing = false;
      this.process();
    }
  }
}

const writeQueue = new RequestQueue();

function generateId() {
  return Date.now().toString() + Math.floor(Math.random() * 1000).toString();
}

function loadProject(callback) {
  db.get('SELECT data FROM project WHERE id = ?', ['project-1'], (err, row) => {
    if (err) return callback(err);
    if (row && row.data) {
      const project = JSON.parse(row.data);
      let needsSave = false;

      // Migration: Ensure hotspots exist if missing
      if (project.buildings && project.buildings[0] && !project.buildings[0].hotspots) {
        console.log('Migrating: Adding missing hotspots field from seed/default');
        project.buildings[0].hotspots = [];
        needsSave = true;
      }

      // Migration: Ensure leads have IDs (Global)
      if (project.leads) {
          project.leads.forEach(l => {
              if (!l.id) {
                  l.id = generateId();
                  needsSave = true;
              }
          });
      }

      // Migration: Ensure leads have IDs (Unit Level)
      if (project.buildings) {
          project.buildings.forEach(b => b.floors.forEach(f => f.units.forEach(u => {
              if (u.salesLeads) {
                  u.salesLeads.forEach(l => {
                      if (!l.id) {
                          l.id = generateId();
                          needsSave = true;
                      }
                  });
              }
          })));
      }

      if (needsSave) {
          console.log('[SERVER] Migrations applied. Saving...');
          saveProject(project, () => {});
      }

      return callback(null, project);
    }
    const seed = loadSeed();
    db.run('INSERT OR REPLACE INTO project (id, data) VALUES (?, ?)', ['project-1', JSON.stringify(seed)], () => {
      callback(null, seed);
    });
  });
}

function saveProject(project, callback) {
  console.log(`[SERVER] Saving project... (Buildings: ${project.buildings.length})`);
  db.run('INSERT OR REPLACE INTO project (id, data) VALUES (?, ?)', ['project-1', JSON.stringify(project)], (err) => {
    if (err) console.error('[SERVER] Save failed:', err);
    else console.log('[SERVER] Save successful.');
    callback(err);
  });
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
  
  writeQueue.add(() => new Promise((resolve, reject) => {
    loadProject((err, project) => {
      if (err || !project) return reject({ status: 500, error: 'Failed to load project' });
      const { unit, floor } = findUnit(project, unitId);
      if (!unit || !floor) return reject({ status: 404, error: 'Unit not found' });

      Object.assign(unit, changes);
      updateFloorStatus(floor);
      saveProject(project, saveErr => {
        if (saveErr) return reject({ status: 500, error: 'Failed to save unit' });
        resolve(unit);
      });
    });
  }))
  .then(unit => res.json(unit))
  .catch(err => res.status(err.status || 500).json({ error: err.error }));
});

app.patch('/units/:unitId/status', authenticate, (req, res) => {
  const { unitId } = req.params;
  const { status } = req.body;
  if (!['sold', 'available'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  writeQueue.add(() => new Promise((resolve, reject) => {
    loadProject((err, project) => {
      if (err || !project) return reject({ status: 500, error: 'Failed to load project' });
      const { unit, floor } = findUnit(project, unitId);
      if (!unit || !floor) return reject({ status: 404, error: 'Unit not found' });
      unit.status = status;
      updateFloorStatus(floor);
      saveProject(project, saveErr => {
        if (saveErr) return reject({ status: 500, error: 'Failed to update status' });
        resolve(unit);
      });
    });
  }))
  .then(unit => res.json(unit))
  .catch(err => res.status(err.status || 500).json({ error: err.error }));
});

app.patch('/floors/:floorId/status', authenticate, (req, res) => {
  const { floorId } = req.params;
  const { status } = req.body;
  if (!['sold', 'available'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  writeQueue.add(() => new Promise((resolve, reject) => {
    loadProject((err, project) => {
      if (err || !project) return reject({ status: 500, error: 'Failed to load project' });
      const floor = findFloor(project, floorId);
      if (!floor) return reject({ status: 404, error: 'Floor not found' });

      floor.units = floor.units.map(u => ({ ...u, status }));
      updateFloorStatus(floor);
      saveProject(project, saveErr => {
        if (saveErr) return reject({ status: 500, error: 'Failed to save floor status' });
        resolve(floor);
      });
    });
  }))
  .then(floor => res.json(floor))
  .catch(err => res.status(err.status || 500).json({ error: err.error }));
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

// Hotspots endpoints
app.get('/hotspots', (req, res) => {
  loadProject((err, project) => {
    if (err) return res.status(500).json({ error: 'Failed to load project' });
    const hotspots = project.buildings[0]?.hotspots || [];
    res.json(hotspots);
  });
});

app.post('/hotspots', authenticate, (req, res) => {
  const hotspots = req.body;
  if (!Array.isArray(hotspots)) {
    return res.status(400).json({ error: 'Invalid body, expected array of hotspots' });
  }

  writeQueue.add(() => new Promise((resolve, reject) => {
    loadProject((err, project) => {
      if (err || !project) return reject({ status: 500, error: 'Failed to load project' });
      
      // Ensure building exists
      if (!project.buildings || project.buildings.length === 0) {
        return reject({ status: 404, error: 'No buildings found' });
      }

      project.buildings[0].hotspots = hotspots;

      saveProject(project, saveErr => {
        if (saveErr) return reject({ status: 500, error: 'Failed to save hotspots' });
        resolve(hotspots);
      });
    });
  }))
  .then(hotspots => res.json(hotspots))
  .catch(err => res.status(err.status || 500).json({ error: err.error }));
});

// Leads Endpoints
app.get('/leads', (req, res) => {
  loadProject((err, project) => {
    if (err) return res.status(500).json({ error: 'Failed to load project' });
    
    // 1. Start with global leads
    let allLeads = project.leads || [];

    // 2. Aggregate leads from all units
    if (project.buildings) {
      project.buildings.forEach(building => {
        if (building.floors) {
          building.floors.forEach(floor => {
            if (floor.units) {
              floor.units.forEach(unit => {
                if (unit.salesLeads && Array.isArray(unit.salesLeads)) {
                  // Map unit leads to include context
                  const unitLeads = unit.salesLeads.map(lead => ({
                    ...lead,
                    unitId: unit.id,
                    unitName: unit.name,
                    floorName: floor.name || `Floor ${floor.floorNumber}`,
                    source: 'unit'
                  }));
                  allLeads = allLeads.concat(unitLeads);
                }
              });
            }
          });
        }
      });
    }

    res.json(allLeads);
  });
});

app.patch('/leads/:id', authenticate, (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    writeQueue.add(() => new Promise((resolve, reject) => {
        loadProject((err, project) => {
            if (err || !project) return reject({ status: 500, error: 'Failed to load project' });

            let leadFound = false;
            let updatedLead = null;

            // 1. Check global leads
            if (project.leads) {
                const idx = project.leads.findIndex(l => l.id === id);
                if (idx !== -1) {
                    project.leads[idx] = { ...project.leads[idx], ...updates };
                    updatedLead = project.leads[idx];
                    leadFound = true;
                }
            }

            // 2. Check unit leads (if not found in global)
            if (!leadFound && project.buildings) {
                for (const b of project.buildings) {
                    for (const f of b.floors) {
                        for (const u of f.units) {
                            if (u.salesLeads) {
                                const idx = u.salesLeads.findIndex(l => l.id === id);
                                if (idx !== -1) {
                                    u.salesLeads[idx] = { ...u.salesLeads[idx], ...updates };
                                    updatedLead = u.salesLeads[idx];
                                    leadFound = true;
                                    break; 
                                }
                            }
                        }
                        if (leadFound) break;
                    }
                    if (leadFound) break;
                }
            }

            if (!leadFound) {
                return reject({ status: 404, error: 'Lead not found' });
            }

            saveProject(project, saveErr => {
                if (saveErr) return reject({ status: 500, error: 'Failed to update lead' });
                resolve(updatedLead);
            });
        });
    }))
    .then(lead => res.json(lead))
    .catch(err => res.status(err.status || 500).json({ error: err.error }));
});

app.post('/leads', authenticate, (req, res) => {
  const lead = req.body;
  if (!lead.name || !lead.phone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  writeQueue.add(() => new Promise((resolve, reject) => {
    loadProject((err, project) => {
      if (err || !project) return reject({ status: 500, error: 'Failed to load project' });
      
      if (!project.leads) project.leads = [];
      const newLead = { ...lead, id: generateId() };
      project.leads.push(newLead);

      saveProject(project, saveErr => {
        if (saveErr) return reject({ status: 500, error: 'Failed to save lead' });
        resolve(newLead);
      });
    });
  }))
  .then(newLead => res.json(newLead))
  .catch(err => res.status(err.status || 500).json({ error: err.error }));
});

app.delete('/leads/:id', authenticate, (req, res) => {
  const { id } = req.params;

  writeQueue.add(() => new Promise((resolve, reject) => {
    loadProject((err, project) => {
      if (err || !project) return reject({ status: 500, error: 'Failed to load project' });

      let deleted = false;
      
      // 1. Try deleting from global
      if (project.leads) {
          const initialLen = project.leads.length;
          project.leads = project.leads.filter(l => l.id !== id);
          if (project.leads.length < initialLen) deleted = true;
      }

      // 2. Try deleting from units
      if (!deleted && project.buildings) {
          project.buildings.forEach(b => b.floors.forEach(f => f.units.forEach(u => {
              if (u.salesLeads) {
                  const initialLen = u.salesLeads.length;
                  u.salesLeads = u.salesLeads.filter(l => l.id !== id);
                  if (u.salesLeads.length < initialLen) deleted = true;
              }
          })));
      }

      if (!deleted) {
        return reject({ status: 404, error: 'Lead not found' });
      }

      saveProject(project, saveErr => {
        if (saveErr) return reject({ status: 500, error: 'Failed to delete lead' });
        resolve({ success: true });
      });
    });
  }))
  .then(result => res.json(result))
  .catch(err => res.status(err.status || 500).json({ error: err.error }));
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});



