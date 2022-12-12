const mongoose = require('mongoose');

const RazredSchema = mongoose.Schema({
  ime: {
    type: String,
    required: true
  },
  smjer: {
    type: String,
    required: true
  },
  razrednik: {
    type: mongoose.Types.ObjectId,
    ref: 'Profesor'
  },
  predmeti: [{
    type: mongoose.Types.ObjectId,
    ref: 'Predmet'
  }],
  ucenici: [{
    type: mongoose.Types.ObjectId,
    ref: 'Ucenik'
  }]
}, {
  timestamps: true
})

module.exports = mongoose.model('Razred', RazredSchema);