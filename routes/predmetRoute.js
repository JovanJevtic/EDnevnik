const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { protectAdmin } = require('../middlewares/authAdmin');
const Profesor = require('../models/Profesor');

const Predmet = require('../models/Predmet');

router.get('/:ime', asyncHandler(async (req, res) => {
  const predmet = await Predmet.findOne({ ime: req.params.ime });

  if (!predmet) {
    res.status(400).json({ message: 'Nepostojeci predmet' })
  }

  res.status(200).json({ id: predmet._id, ime: predmet.ime, profesori: predmet.profesori })
}));

router.post('/', protectAdmin, asyncHandler(async (req, res) => {
  const { ime, profesori } = req.body;

  if (!ime) {
    res.status(400)
    throw new Error('Polje ime je obavezno')
  }

  const predmetPostoji = await Predmet.findOne({ ime: ime });
  if (predmetPostoji) {
    res.status(400);
    throw new Error("Predmet ovog imena vec postoji");
  }

  try {
     const predmet = await Predmet.create({
      ime: ime,
      profesori: profesori
    });

    console.log(predmet);

    res.status(200).json({
      id: predmet._id,
      ime: predmet.ime,
      profesori: predmet.profesori
    }) 
  } catch (err) {
    res.status(400);
    throw new Error(err);
  }
}));

router.put('/:ime', protectAdmin, asyncHandler(async (req, res) => {
  const predmet = await Predmet.findOne({ ime: req.params.ime });

  if (!predmet) {
    res.status(404);
    throw new Error("Nepostojeci predmet!");
  }

  try {
    try {
      await Predmet.updateOne({ ime: req.params.ime }, {
        $addToSet: {profesori: req.body.profesori}
      });


      const updotovaniPredmet = await Predmet.findOne({ ime: req.params.ime });
      res.status(200).json({ predmet: updotovaniPredmet });
    } catch (error) {
      res.status(400);
      throw new Error("Problem while updating Predmet!");
    }
  }  catch(err) {
    res.status(400);
    throw new Error("Problem with your input!");
  }
}));

router.get('/', asyncHandler(async (req, res) => {
  const predmeti = await Predmet.find();

  res.status(200).json(predmeti);
}));

router.post('/getProfesorByPredmet', asyncHandler(async (req, res)=> {
  const { predmetId } = req.body;

  if(!predmetId) {
    res.status(400);
    throw new Error("All fields are required!");
  }

  const profesors = await Profesor.find({ predmet: predmetId });

  res.status(200).json(profesors);
}));

module.exports = router;