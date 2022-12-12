const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Admin = require('../models/Admin');

const protectAdmin = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN)

      // Get profesor from the token
      req.admin = await Admin.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Pristup odbijen, za ovu radnju je potreban admin access!')
    }
  } else {
    res.status(401)
    throw new Error('Pristup odbijen, za ovu radnju je potreban admin access!')
  }
});

module.exports = { protectAdmin };