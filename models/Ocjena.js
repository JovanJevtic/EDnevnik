const mongoose = require('mongoose');

const OcjenaSchema = mongoose.Schema({
  ocjena: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5]
  },
  ucenik: {
    type: mongoose.Types.ObjectId,
    ref: 'Ucenik',
    required: true
  },    
  date: {
    type: Date,
    default: Date.now()
  },
  type: {
    type: String,
    enum: ['usmena', 'pismena'],
    default: 'usmena'
  },
  predmet: {
    type: mongoose.Types.ObjectId,
    ref: 'Predmet',
    required: true
  },
  profesor: {
    type: mongoose.Types.ObjectId,
    ref: 'Profesor',
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Ocjena', OcjenaSchema);