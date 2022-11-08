const Profesor = require('../models/Profesor');
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
const registerProfesor = asyncHandler(async (req, res) => {
  const { ime, prezime, isRazrednik, predmet, sifra, email } = req.body;

  if (!ime || !email || !sifra || !prezime || !isRazrednik || !predmet) {
    res.status(400)
    throw new Error('Sva polja su obavezna!');
  }

  //* Check if user is already existing
  const profesorExists = await Profesor.findOne({ email });
  if (profesorExists) {
    res.status(400);
    throw new Error('Profesor sa ovim emailom vec postoji');
  }

  //* Password hash
  const salt = await bcrypt.genSalt(10);
  const hashedPwd = await bcrypt.hash(sifra, salt);

  //* Create a user
  const profesor = await Profesor.create({
    ime,
    prezime,
    email,
    sifra: hashedPwd,
    predmet,
    isRazrednik
  });

  res.status(201).json({
    _id: profesor._id,
    ime: profesor.ime,
    email: profesor.email,
    prezime: profesor.prezime,
    predmet: profesor.predmet,
    isRazrednik: profesor.isRazrednik,
    token: generateToken(profesor._id)
  });
});

//? Desc: Logging a user
//* Route: POST api/users/login
//! Access: Public
const loginProfesor = asyncHandler(async (req, res) => {
  const { email, sifra } = req.body;

  //* Check for user email
  const profesor = await Profesor.findOne({ email })

  if (profesor && (await bcrypt.compare(sifra, profesor.password))) {
    res.json({
      _id: profesor._id,
      ime: profesor.ime,
      email: profesor.email,
      prezime: profesor.prezime,
      predmet: profesor.predmet,
      isRazrednik: profesor.isRazrednik,
      token: generateToken(profesor._id)
    })
  } else {
    res.status(400);
    throw new Error('Nevazeci unos');
  }
});


//? Desc: Get data for currently logged in user
//* Route: GET api/users/me
//! Access: Private
const getMe = asyncHandler(async (req, res) => {
  if (!req.profesor) {
    res.status(404).json({ message: 'Niste prijavljeni' });
  }
  res.status(200).json(req.profesor);
});

//? Desc: Getting an user info
//* Route: GET api/users/:id
//! Access: Public
const getProfesor = asyncHandler(async (req, res) => {
  const profesor = await Profesor.findById(req.params.id);

  if (!profesor) {
    res.status(404).json({ message: 'Nepostojeci profesor' })
  }

  res.status(200).json({ ime: profesor.name, email: profesor.email })
});

//? Desc: Update currently logged in user
//* Route: PUT api/users/:id
//! Access: Private
const updateProfesor = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new Error('You are logged out');
  }

  const data = {
    name: req.body.name
  }

  try {
    await User.updateOne({ _id: req.user._id }, data);
    const newUser = await User.findById(req.user._id);

    res.status(200).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      customerId: newUser.customerId
    });
  } catch (error) {
    console.log(error)
  }
});

module.exports = {
  registerProfesor,
  loginProfesor,
  getMe,
  getProfesor,
  updateProfesor,
}