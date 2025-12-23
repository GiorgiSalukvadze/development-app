const axios = require('axios');

const API_URL = 'http://localhost:4000';
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';

async function checkLeads() {
    try {
        console.log('Authenticating...');
        const authRes = await axios.post(`${API_URL}/auth/login`, {
            username: ADMIN_USER,
            password: ADMIN_PASS
        });
        const token = authRes.data.token;
        console.log('Got token, fetching leads...');

        const leadsRes = await axios.get(`${API_URL}/leads`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        const leads = leadsRes.data;
        console.log(`Found ${leads.length} leads.`);
        
        leads.forEach((l, i) => {
            console.log(`[Lead ${i}] ID: ${l.id}, Name: ${l.name}, Source: ${l.source || 'global'}, Unit: ${l.unitName}, Floor: ${l.floorName}`);
            if (l.unitName && !l.floorName) {
                console.warn(`    >>> WARNING: Lead ${i} has Unit but NO Floor!`);
                console.log('    Full Object:', JSON.stringify(l, null, 2));
            }
        });

    } catch (error) {
        console.error('Error:', error.message);
        if (error.response) console.error(error.response.data);
    }
}

checkLeads();
