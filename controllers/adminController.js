const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_ADMIN, {
        expiresIn: '30d',
    })
}

const register = asyncHandler(async (req, res) => {
    const { ime, email, adminSifra, sifra } = req.body;
  
    if (!ime || !email || !sifra || !adminSifra) {
      res.status(400)
      throw new Error('Sva polja su obavezna!');
    }
  
    //* Check if user is already existing
    const adminExists = await Admin.findOne({ $or: [{email: email}, {ime: ime}] });
    if (adminExists) {
      res.status(400);
      throw new Error('Admin sa ovim emailom ili imenom vec postoji');
    }

    if (adminSifra === process.env.ADMIN_PWD) {
        //* Password hash
        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(sifra, salt);

        try {
            //* Create a user
            const admin = await Admin.create({
              ime,
              email,
              sifra: hashedPwd
            });
        
            res.status(201).json({
              _id: admin._id,
              ime: admin.ime,
              email: admin.email,
              token: generateToken(admin._id)
            });    
          } catch (error) {
            res.status(400);
            throw new Error(error)
          //   throw new Error("Error while creating Admin");
          }
      } else {
        res.status(400);
        throw new Error('Nevazeca admin lozinka, pristup odbijen!');
      }

  });
  

const login = asyncHandler(async (req, res) => {
    const { email, sifra } = req.body;

    //* Check for user email
    const admin = await Admin.findOne({ email })
  
    if (admin && (await bcrypt.compare(sifra, admin.sifra))) {
      res.json({
        _id: admin._id,
        ime: admin.ime,
        email: admin.email,
        token: generateToken(admin._id)
      })
    } else {
      res.status(400);
      throw new Error('Nevazeci unos');
    }
});

const getAdmin = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.params.id);
  
    if (!admin) {
      res.status(404).json({ message: 'Nepostojeci admin' })
    }
  
    res.status(200).json({ ime: profesor.ime, email: profesor.email })
  });

const getMe = asyncHandler(async (req, res) => {
    if (!req.admin) {
      res.status(400).json({ message: 'Niste prijavljeni' });
    }
    res.status(200).json(req.admin);
  });
module.exports = {
    login,
    register,
    getAdmin,
    getMe
}