const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5500;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home');
});

app.use('/api/ucenik', require('./routes/ucenikRoute.js'));
app.use('/api/profesor', require('./routes/profesorRoute.js'));

app.listen(PORT, () => {
  console.log(`Application running on port: ${PORT}`)
});