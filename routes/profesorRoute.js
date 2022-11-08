const express = require('express');
const router = express.Router();

const { protect } = require('../middlewares/authProfesor');
const { validateProfesorInput } = require('../middlewares/validateProfesorInput')

const { registerProfesor, loginProfesor, getProfesor, updateProfesor, getMe } = require('../controllers/profesorController');

router.get('/', (req, res) => {
  console.log('dasjdaskjk')
  res.send('ello')
})
router.post('/', validateProfesorInput, registerProfesor);
router.post('/login', loginProfesor);
router.get('/me', protect, getMe);
router.put('/update/:id', protect, updateProfesor);
router.get('/:id', getProfesor);

module.exports = router;