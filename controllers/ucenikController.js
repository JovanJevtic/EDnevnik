const Ucenik = require('../models/Ucenik');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
  return jwt.sign({ id }, 'process.env.JWT_SECRET', {
    expiresIn: '30d',
  })
}

//? Desc: Register a user
//* Route: POST api/users/register
//! Access: Public
const registerUcenik = asyncHandler(async (req, res) => {
  const { jbmg, ime, prezime, datumRodjenja, imeRoditelja, razredId } = req.body;

  if (!jbmg || !ime || !prezime || !datumRodjenja || !imeRoditelja || !razredId) {
    res.status(400)
    throw new Error('Sva polja su obavezna!');
  }

  //* Check if user is already existing
  const ucenikPostoji = await Ucenik.findOne({ jbmg: jbmg });
  if (ucenikPostoji) {
    res.status(400);
    throw new Error('Ucenik sa ovim JBMG-om vec postoji');
  }

  //* Password hash
  const salt = await bcrypt.genSalt(10);
  const hashedPwd = await bcrypt.hash(sifra, salt);

  //* Create a user
  const ucenik = await Profesor.create({
    ime,
    prezime,
    jbmg,
    sifraRoditelja: hashedPwd,
    razredId,
    imeRoditelja,
    datumRodjenja
  });

  res.status(201).json({
    _id: ucenik._id,
    ime: ucenik.ime,
    jbmg: ucenik.email,
    prezime: ucenik.prezime,
    imeRoditelja: ucenik.imeRoditelja,
    razredId: ucenik.razredId,
    datumRodjenja: ucenik.datumRodjenja,
    token: generateToken(ucenik._id)
  });
});

//? Desc: Get ucenik by jbmg
//* Route: POST api/ucenik/:jbmg
//! Access: Public
const getUserByJbmg = asyncHandler( async (req, res) => {
  const ucenik = await Ucenik.findOne(req.params.jbmg);

  if (!ucenik) {
    res.status(404).json({ message: 'Nepostojeci ucenik' })
  }

  res.status(200).json({ 
    ime: ucenik.name,
    prezime: ucenik.email,
    imeRoditelja: ucenik.imeRoditelja,
    datumRodjenja: ucenik.datumRodjenja,
    razredId: ucenik.razredId 
  });
});

module.exports = {
  registerUcenik,
  getUserByJbmg
}