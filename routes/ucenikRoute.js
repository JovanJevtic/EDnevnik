const express = require('express');
const router = express.Router();

const { getUserByJbmg, registerUcenik, loginUcenik } = require("../controllers/ucenikController");
const { protectAdmin } = require('../middlewares/authAdmin');

router.post('/', protectAdmin,  registerUcenik);
router.post('/login', loginUcenik);
router.get('/:jbmg', getUserByJbmg);

module.exports = router;