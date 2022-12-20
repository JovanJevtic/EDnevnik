const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const cors = require('cors');

const { errorHandler } = require('./middlewares/errorMiddleware');

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = ['http://localhost:5500', 'http://localhost:5000', 'http://localhost:3000', 'http://localhost:8100', 'http://localhost:8101'];
app.use(cors({
    origin: allowedOrigins
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/admin', require('./routes/adminRoutes')); 
app.use('/api/profesor', require('./routes/profesorRoute.js'));
app.use('/api/ucenik', require('./routes/ucenikRoute.js'));

app.use('/api/razred', require('./routes/razredRoute.js'));
app.use('/api/predmet', require('./routes/predmetRoute.js')); 
app.use('/api/ocjena', require('./routes/ocjenaRoute'));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Application running on port: ${PORT}`)
});