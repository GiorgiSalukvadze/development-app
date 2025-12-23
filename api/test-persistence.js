const axios = require('axios');

async function testBackend() {
  try {
    console.log('1. Logging in...');
    const login = await axios.post('http://localhost:4000/auth/login', {
      username: 'admin',
      password: 'admin123'
    });
    const token = login.data.token;
    console.log('   Login successful. Token acquired.');

    console.log('2. Updating Unit 1a...');
    const update = await axios.patch('http://localhost:4000/units/floor-1-unit-1a', {
      description: 'UPDATED_VIA_TEST_SCRIPT_' + Date.now()
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('   Update response:', update.data);

    console.log('3. Verifying Update...');
    const project = await axios.get('http://localhost:4000/project');
    const unit = project.data.buildings[0].floors[0].units.find(u => u.id === 'floor-1-unit-1a');
    
    if (unit.description.startsWith('UPDATED_VIA_TEST_SCRIPT_')) {
      console.log('SUCCESS: Backend is persisting data correctly.');
      console.log('New Description:', unit.description);
    } else {
      console.error('FAILURE: Data did not persist.');
      console.log('Current Description:', unit.description);
    }

  } catch (err) {
    console.error('ERROR:', err.response ? err.response.data : err.message);
  }
}

testBackend();
