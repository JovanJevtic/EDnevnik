const mongoose = require('mongoose');

const ProfesorSchema = mongoose.Schema({
  ime: {
    type: String,
    required: true
  },
  prezime: {
    type: String,
    required: true
  },
  isRazrednik: {
    type: Boolean,
    required: true
  },
  predmet: {
    type: mongoose.Types.ObjectId,
    ref: "Predmet"
  },
  sifra: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Profesor', ProfesorSchema);