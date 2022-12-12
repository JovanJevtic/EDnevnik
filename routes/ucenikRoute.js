const express = require('express');
const router = express.Router();

const { getUserByJbmg, registerUcenik } = require("../controllers/ucenikController");
const { protectAdmin } = require('../middlewares/authAdmin');

router.post('/', protectAdmin,  registerUcenik);
router.get('/:jbmg', getUserByJbmg);

module.exports = router;