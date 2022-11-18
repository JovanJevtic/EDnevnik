const express = require('express');
const router = express.Router();

const { getUserByJbmg, registerUcenik } = require("../controllers/ucenikController");

router.post('/', registerUcenik);
router.get('/:jbmg', getUserByJbmg);

module.exports = router;