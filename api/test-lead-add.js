const axios = require('axios');
const jwt = require('jsonwebtoken');

const secret = 'dev-secret';
const token = jwt.sign({ user: 'admin' }, secret);

async function test() {
  try {
    const res = await axios.post('http://localhost:4000/leads', {
        name: 'Script Added Lead',
        phone: '999-999-9999',
        interest: 'high',
        notes: 'Added via test script'
    }, {
        headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Success:', res.data);
  } catch (err) {
    console.error('Error:', err.response ? err.response.data : err.message);
  }
}

test();
