const express = require('express');
const router = express.Router();

const Predmet = require('../models/Predmet');

router.get('/:ime', async (req, res) => {
  const predmet = await Predmet.findOne(req.params.ime);

  if (!predmet) {
    res.status(404).json({ message: 'Nepostojeci predmet' })
  }

  res.status(200).json({ id: predmet._id, ime: predmet.name })
});

router.post('/', async (req, res) => {
  const { ime } = req.body;

  if (!ime) {
    res.status(400)
    throw new Error('Sva polja su obavezna')
  }

  const predmetPostoji = await Predmet.findOne({ ime: ime });
  if (predmetPostoji) {
    res.status(400).json({ msg: `predmet ovog imena vec postoji: ${predmetPostoji.ime}` });
    // throw new Error("Predmet ovog imena vec postoji");
  }

  try {
     const predmet = await Predmet.create({
      ime: ime
    });

    res.status(200).json({
      id: predmet._id,
      ime: predmet.ime
    }) 
  } catch (err) {
    res.status(400).json({ err: err });
  }
});

module.exports = router;