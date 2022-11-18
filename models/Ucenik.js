const mongoose = require('mongoose');

const UcenikSchema = mongoose.Schema({
  jbmg: {
    type: String,
    required: true
  },
  ime: {
    type: String,
    required: true
  },
  prezime: {
    type: String,
    required: true
  },
  imeRoditelja: {
    type: String,
    required: true
  },
  datumRodjenja: {
    type: Date,
    required: true
  },
  sifraRoditelja: {
    type: String,
    required: true
  },
  razredId: {
    type: mongoose.Types.ObjectId,
    ref: "Razred"
  }
})

module.exports = mongoose.model('Ucenik', UcenikSchema);