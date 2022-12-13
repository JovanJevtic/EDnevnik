const express = require('express');
const router = express.Router();
const { protectAdmin } = require('../middlewares/authAdmin');
const { protectProfesor } = require('../middlewares/authProfesor');

const { createOcjena, updateOcjena } = require('../controllers/ocjenaController');

const Ocjena = require('../models/Ocjena');

router.post('/', protectProfesor, createOcjena);

module.exports = router;