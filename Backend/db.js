const {Pool} = require('pg');
require('dotenv').config();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.connect()
    .then(() => console.log("Połączono z bazą"))
    .catch(err => console.error("Error",err));

module.exports = pool;
