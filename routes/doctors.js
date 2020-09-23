const express = require('express');
const router = express.Router();
const {
  doctorsController: { getAll }
} = require('../controllers');

// GET all doctors
router.get('/', async (req, res) => {
  try {
    const { rows } = await getAll();
    res.json({
      status: 'success',
      data: rows
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: 'Please try again later',
      status: 'failed'
    });
  }
});

module.exports = router;
