const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Profesor = require('../models/Profesor');

const protectProfesor = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_PROF)

      // Get profesor from the token
      req.profesor = await Profesor.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  } else {
    res.status(401)
    throw new Error('Not authorized')
  }
});

module.exports = { protectProfesor };