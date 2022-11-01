const mongoose = require('mongoose');

const RazredSchema = mongoose.Schema({
  name: {
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
  }]
})

module.exports = mongoose.model('Razred', RazredSchema);