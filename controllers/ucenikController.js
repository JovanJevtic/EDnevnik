const Ucenik = require('../models/Ucenik');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const generator = require('generate-password');
const nodemailer = require('nodemailer');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_UCENIK, {
    expiresIn: '30d',
  })
}

//? Desc: Register a user
//* Route: POST api/users/register
//! Access: Public
const registerUcenik = asyncHandler(async (req, res) => {
  const { jbmg, ime, prezime, datumRodjenja, imeRoditelja, razredId, email } = req.body;

  if (!jbmg || !ime || !prezime || !datumRodjenja || !imeRoditelja || !razredId || !email) {
    res.status(400)
    throw new Error('Sva polja su obavezna!');
  }

  //* Check if user is already existing
  const ucenikPostoji = await Ucenik.findOne({ jbmg: jbmg });
  if (ucenikPostoji) {
    res.status(400);
    throw new Error('Ucenik sa ovim JBMG-om vec postoji');
  }

  //* Generate Password
  const sifra = generator.generate({
    length: 10,
	  numbers: true
  })

  //* Password hash
  const salt = await bcrypt.genSalt(10);
  const hashedPwd = await bcrypt.hash(sifra, salt);

  try {
    //* Create a ucenik
    const ucenik = await Ucenik.create({
      ime,
      prezime,
      jbmg,
      sifra: hashedPwd,
      razredId,
      imeRoditelja,
      datumRodjenja,
      email
    });

    if (ucenik) {
      const transporter = nodemailer.createTransport({ 
        service: 'gmail',
        auth: { 
            user: process.env.NODEMAILER_AUTH_EMAIL, 
            pass: process.env.NODEMAILER_AUTH_PWD
        } 
      });

      const mailOptions = { 
          from: process.env.NODEMAILER_AUTH_EMAIL, 
          to: email,     
          subject: 'Account Verification Code', 
          html: 'Zdravo,  '+ ime +',\n\n' + 'Vasa lozinka za prijavu je: ' + sifra  + '\n\n, Hvala!\n' 
      };

      try {
          const sendResult = await transporter.sendMail(mailOptions);
      } catch (error) {
          res.status(400);
          throw new Error(error);
      }
    }

    
    res.status(201).json({
      _id: ucenik._id,
      jbmg: ucenik.email,
      email: ucenik.email,
      ime: ucenik.ime,
      prezime: ucenik.prezime,
      imeRoditelja: ucenik.imeRoditelja,
      razredId: ucenik.razredId,
      datumRodjenja: ucenik.datumRodjenja,
      token: generateToken(ucenik._id)
    });    
  } catch (error) {
    res.status(400);
    throw new Error(error);
    throw new Error("Greska pri kreiranju ucenika!");
  }
});

//? Desc: Get ucenik by jbmg
//* Route: POST api/ucenik/:jbmg
//! Access: Public
const getUserByJbmg = asyncHandler(async (req, res) => {
  const ucenik = await Ucenik.findById(req.params.id);

  if (!ucenik) {
    res.status(404);
    throw new Error("Nepostojeci ucenik");
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