const fs = require('fs');
const path = require('path');

// Paths
const propertyServicePath = path.join(__dirname, 'src', 'app', 'services', 'property.service.ts');
const seedPath = path.join(__dirname, 'api', 'seed', 'project.json');

// Read PropertyService.ts
const content = fs.readFileSync(propertyServicePath, 'utf8');

// Extract realFloorPolygons array string
// We look for "private realFloorPolygons = [" and the closing "];"
// This is a bit brittle but should work for this specific file structure
const startMarker = 'private realFloorPolygons = [';
const startIndex = content.indexOf(startMarker);

if (startIndex === -1) {
    console.error('Could not find realFloorPolygons in PropertyService.ts');
    process.exit(1);
}

// Find the end of the array. We count brackets to handle nesting.
let openBrackets = 0;
let endIndex = -1;
let foundStart = false;

for (let i = startIndex + startMarker.length - 1; i < content.length; i++) {
    if (content[i] === '[') {
        openBrackets++;
        foundStart = true;
    } else if (content[i] === ']') {
        openBrackets--;
    }

    if (foundStart && openBrackets === 0) {
        endIndex = i + 1; // Include the closing ']'
        break;
    }
}

if (endIndex === -1) {
    console.error('Could not parse realFloorPolygons array');
    process.exit(1);
}

const arrayString = content.substring(startIndex + startMarker.length - 1, endIndex);

// The arrayString is likely not valid JSON because:
// 1. Keys are not quoted (id: vs "id":)
// 2. It has 'as const' assertions
// 3. It uses single quotes or backticks potentially
// We need to clean it up to parse it as JSON, or use eval/new Function (dangerous but fine for this local one-off script)

// Let's try to evaluate it as JS.
// We need to mock "as const" which is valid TS but invalid JS.
// We can strip " as const" strings.
const cleanString = arrayString.replace(/ as const/g, '');

let floorPolygons;
try {
    // We wrap it in parenthesis to make it an expression
    floorPolygons = eval('(' + cleanString + ')');
} catch (e) {
    console.error('Failed to eval extracted array:', e);
    // Fallback: try to fix common JSON issues if eval fails (e.g. comments)
    // But eval should work if it's just a JS object literal
    process.exit(1);
}

console.log(`Found ${floorPolygons.length} floors in frontend data.`);

// Load existing seed to keep project metadata
const seed = JSON.parse(fs.readFileSync(seedPath, 'utf8'));

// Transform floors
const newFloors = floorPolygons.map(floorData => {
    // Generate units for this floor
    // We mimic the logic from PropertyService.ts roughly, but stick to the data provided in unitPolygons
    const units = floorData.unitPolygons.map((unitData, index) => { 
        const unitId = `${floorData.id}-${unitData.id || `unit-${index + 1}`}`;
        const unitNumber = floorData.floorNumber * 100 + (index + 1); // rough guess if name isn't parseable, but name is usually "Unit 101"
        
        return {
            id: unitId,
            name: unitData.name,
            floorId: floorData.id,
            status: unitData.status || 'available',
            area: unitData.area,
            bedrooms: unitData.bedrooms,
            bathrooms: unitData.bathrooms,
            price: unitData.price,
            polygonPoints: unitData.svgPoints,
            description: `Beautiful ${unitData.bedrooms} bedroom apartment on floor ${floorData.floorNumber}`,
            features: [
                'Central heating',
                'Air conditioning',
                'Balcony',
                'Parking space'
            ]
        };
    });

    // Check if floor is sold (all units sold)
    const allSold = units.every(u => u.status === 'sold');

    return {
        id: floorData.id,
        buildingId: 'building-1', // Assuming single building for now
        floorNumber: floorData.floorNumber,
        name: floorData.name,
        status: allSold ? 'sold' : 'available',
        polygonPoints: floorData.svgPoints,
        floorPlanImage: floorData.floorPlanImage,
        floorPlanViewBox: floorData.floorPlanViewBox,
        units: units
    };
});

// Update seed
seed.buildings[0].floors = newFloors;
// Update total floors count
seed.buildings[0].totalFloors = newFloors.length;

// Write back to file
fs.writeFileSync(seedPath, JSON.stringify(seed, null, 2), 'utf8');

console.log(`Updated ${seedPath} with ${newFloors.length} floors.`);
