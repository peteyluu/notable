const pool = require('../database');

const getAppointments = ({ doctorId, date }) => {
  return pool.query('select * from appointments WHERE doctor_id = $1 AND date_time::DATE = $2', [doctorId, date]);
};
const deleteAppointment = ({ id, doctorId }) => {
  return pool.query('DELETE FROM appointments WHERE id = $1 AND doctor_id = $2', [id, doctorId]);
};
const createAppointment = ({ patientId, doctorId, kind, dateTime }) => {
  return pool.query('INSERT INTO appointments (patient_id, doctor_id, kind, date_time) VALUES ($1, $2, $3, $4)', [
    patientId,
    doctorId,
    kind,
    dateTime
  ]);
};
const validateAppointment = ({ doctorId, dateTime }) => {
  return pool.query('SELECT * from appointments WHERE doctor_id = $1 AND date_time = $2;', [doctorId, dateTime]);
};

module.exports = {
  getAppointments,
  deleteAppointment,
  createAppointment,
  validateAppointment
};
