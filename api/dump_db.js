const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'project.db');
const db = new sqlite3.Database(dbPath);

db.get('SELECT data FROM project WHERE id = ?', ['project-1'], (err, row) => {
    if (err) {
        console.error('Error:', err);
        return;
    }
    if (row && row.data) {
        const project = JSON.parse(row.data);
        console.log('Project loaded from DB.');
        
        // Check Floor 1
        const floor1 = project.buildings[0].floors.find(f => f.id === 'floor-1');
        if (floor1) {
            console.log('Floor 1:', JSON.stringify({ id: floor1.id, name: floor1.name, floorNumber: floor1.floorNumber }));
        } else {
            console.log('Floor 1 NOT FOUND');
        }

        // Check Floor 5
        const floor5 = project.buildings[0].floors.find(f => f.id === 'floor-5');
        if (floor5) {
            console.log('Floor 5:', JSON.stringify({ id: floor5.id, name: floor5.name, floorNumber: floor5.floorNumber }));
        } else {
            console.log('Floor 5 NOT FOUND');
        }
    } else {
        console.log('No project data found.');
    }
});
