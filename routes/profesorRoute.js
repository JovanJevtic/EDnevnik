const express = require('express');
const router = express.Router();

const { protectProfesor } = require('../middlewares/authProfesor');
const { validateProfesorInput } = require('../middlewares/validateProfesorInput')
const { protectAdmin } = require('../middlewares/authAdmin');

const { registerProfesor, loginProfesor, getProfesor, updateProfesor, getMe } = require('../controllers/profesorController');

router.post('/', protectAdmin,  validateProfesorInput, registerProfesor);
router.post('/login', loginProfesor);
router.get('/me', protectProfesor, getMe);
router.put('/update/:id', protectProfesor, updateProfesor);
router.get('/:id', getProfesor);

module.exports = router;