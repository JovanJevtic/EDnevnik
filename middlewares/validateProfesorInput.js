const { check, validationResult } = require('express-validator');

exports.validateProfesorInput = [
  check('ime')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Polje ime ne smije biti prazno!')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Minimalno 3 karaktera neophodna!')
    .bail(),
  check('email')
    .isEmail()
    .trim()
    .normalizeEmail()
    .not()
    .isEmpty()
    .withMessage('Nevazeca email address!')
    .bail(),
  check('sifra')
    .isLength(8)
    .withMessage('Sifra mora biti minimalno 8 karaktera dugacka!'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];
