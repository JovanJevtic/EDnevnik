const express = require('express');
const router = express.Router();

const Razred = require('../models/Razred');

router.get('/:ime', async (req, res) => {
  const razred = await Razred.findOne(req.params.ime);

  if (!razred) {
    res.status(404).json({ message: 'Nepostojeci razred' });
  }

  res.status(200).json({ razred: razred })
});

router.post('/', async (req, res) => {
  const { ime, smjer, razrednik, predmeti, ucenici } = req.body;

  if (!ime || !smjer || !razrednik || !predmeti || !ucenici) {
    res.status(400)
    throw new Error('Sva polja su obavezna')
  }

  const razredPostoji = await Razred.findOne({ ime: ime });
  if (razredPostoji) {
    res.status(400).json({ msg: `Razred sa ovim imenom vec postoji: ${razredPostoji.ime}` });
    // throw new Error("Predmet ovog imena vec postoji");
  }
 
  try {
     const razred = await Razred.create({
      ime: ime,
      smjer: smjer,
      razrednik,
      predmeti,
      ucenici
    });

    res.status(200).json({
      razred: razred
    }) 
  } catch (err) {
    res.status(400).json({ err: err });
  }
});

module.exports = router;