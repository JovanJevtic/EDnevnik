const express = require('express');
const router = express.Router();

const { register, login, getAdmin } = require('../controllers/adminController');

router.post('/', register);
router.post('/login', login);
router.get('/me', getAdmin);

module.exports = router;