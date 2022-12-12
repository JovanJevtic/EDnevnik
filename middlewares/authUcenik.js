const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Ucenik = require('../models/Ucenik');

const protectUcenik = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_UCENIK)

      // Get profesor from the token
      req.ucenik = await Ucenik.findById(decoded.id).select('-password')

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

module.exports = { protectUcenik }; 