const { execSync } = require('child_process');
const path = require('path');
const { Pool } = require('pg');
const fs = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);

const createDatabase = () => {
  try {
    const filename = path.join(__dirname, 'init.sql');
    console.log(filename);
    execSync(`psql -U postgres -a -q -f ${filename}`);
    console.log('created database');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const createTables = async client => {
  const schemas = ['/schema/patients.sql', '/schema/doctors.sql', '/schema/appointments.sql'];
  try {
    const data = await Promise.all(schemas.map(schema => readFileAsync(path.join(__dirname, schema), 'utf8')));
    client.query(data.join('\n'));
    console.log('created tables');
  } catch (err) {
    console.error(err.message);
  }
};

createDatabase();

// establish pool instance with options
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'secret',
  database: 'notable_database'
});

// connect to database
pool
  .connect()
  .then(client => {
    console.log('connected to db');
    createTables(client);
  })
  .catch(err => console.error(`error connecting to db: ${err.message}`));

module.exports = pool;
