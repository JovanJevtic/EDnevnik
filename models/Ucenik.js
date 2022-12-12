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
  sifra: {
    type: String,
    required: true
  },
  razredId: {
    type: mongoose.Types.ObjectId,
    ref: "Razred"
  },
  email: {
    type: String, 
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Ucenik', UcenikSchema);