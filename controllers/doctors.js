const pool = require('../database');

const getAll = () => {
  return pool.query('SELECT * FROM doctors;');
};

module.exports = { getAll };
