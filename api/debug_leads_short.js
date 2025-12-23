const axios = require('axios');

const API_URL = 'http://localhost:4000';
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';

async function checkLeads() {
    try {
        const authRes = await axios.post(`${API_URL}/auth/login`, {
            username: ADMIN_USER,
            password: ADMIN_PASS
        });
        const token = authRes.data.token;

        const leadsRes = await axios.get(`${API_URL}/leads`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        const leads = leadsRes.data;
        
        // Only print problematic leads (first 5 to be safe)
        const problems = leads.filter(l => l.unitName && !l.floorName);
        console.log(`Found ${problems.length} leads with Unit but NO Floor.`);
        
        // We can't see the floor object here because this is the CLIENT side view.
        // The server response already stripped the floor object if it wasn't mapped.
        // We need to inspect what the server is DOING.
        // But since we can't inspect the server memory, we rely on the response.
        
        problems.forEach(l => {
             console.log(`Lead ID: ${l.id}, Unit: ${l.unitName}, UnitID: ${l.unitId}`);
        });

    } catch (error) {
        console.error(error.message);
    }
}

checkLeads();
