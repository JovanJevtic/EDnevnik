const express = require('express');
const router = express.Router();

const { register, login, getAdmin, getMe } = require('../controllers/adminController');
const { protectAdmin } = require('../middlewares/authAdmin');


router.post('/', register);
router.post('/login', login);
router.get('/get', getAdmin);
router.get('/me', protectAdmin, getMe)

module.exports = router;