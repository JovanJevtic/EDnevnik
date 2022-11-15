const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');

connectDB();

const app = express();
const PORT = process.env.PORT || 5300;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/ucenik', require('./routes/ucenikRoute.js'));
app.use('/api/profesor', require('./routes/profesorRoute.js'));
app.use('/api/predmet', require('./routes/predmetRoute.js'));

app.listen(PORT, () => {
  console.log(`Application running on port: ${PORT}`)
});