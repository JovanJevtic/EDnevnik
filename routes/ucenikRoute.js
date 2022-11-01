const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Oj, ovo api/ucenik')
});

module.exports = router;