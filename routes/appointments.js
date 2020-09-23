const express = require('express');
const router = express.Router();
const {
  appointmentsController: { getAppointments, deleteAppointment, createAppointment, validateAppointment }
} = require('../controllers');

// GET all appointments for doctor at particular day
router.get('/', async (req, res) => {
  try {
    const { doctorId, date } = req.query;
    const { rows } = await getAppointments({ doctorId, date });
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

// DELETE existing appointment for doctor
router.delete('/:id/:doctorId', async (req, res) => {
  try {
    const { id, doctorId } = req.params;
    const { rowCount } = await deleteAppointment({ id, doctorId });
    console.log(rowCount);
    if (!rowCount) {
      return res.status(400).json({
        message: 'Bad request',
        status: 'failed'
      });
    }
    res.json({ status: 'success' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: 'Please try again later',
      status: 'failed'
    });
  }
});

/*
  POST create appointment for doctor

  {
    "patientId": 1,
    "doctor_id": 1,
    "kind": "Follow-up",
    "dateTime": "2020-09-23 14:30:00"
}

  Constraints:
  1. date_time start 15 minute interval (i.e. 15, 30, 45)
  2. a doctor can have multiple appointments with same date_time, but the max is 3 
*/
router.post('/', async (req, res) => {
  try {
    const { patientId, doctorId, kind, dateTime } = req.body;
    const [date, time] = dateTime.split(' ');
    const [hours, minutes, _] = time.split(':');
    if (minutes % 15) {
      return res.status(400).json({
        message: 'Bad request',
        status: 'failed'
      });
    }
    // format timestamp
    const dateTimeWithoutSeconds = `${date} ${hours}:${minutes}:00`;
    // check count
    const test = await validateAppointment({ doctorId, dateTimeWithoutSeconds });

    // create appointment
    // const { rowCount } = await createAppointment({ patientId, doctorId, kind, dateTime });
    // if (!rowCount) {
    //   return res.status(400).json({
    //     message: 'Bad request',
    //     status: 'failed'
    //   });
    // }
    res.json({ status: 'success' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: 'Please try again later',
      status: 'failed'
    });
  }
});

module.exports = router;
