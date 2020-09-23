const express = require('express');
const routes = require('./routes');

const app = express();
const PORT = 3000;

app.use(express.json());


app.use('/api/doctors', routes.doctors);
app.use('/api/appointments', routes.appointments);

app.listen(PORT, () => console.log(`Listing on port ${PORT}`));
