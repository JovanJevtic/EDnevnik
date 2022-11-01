const mongoose = require('mongoose');

const ProfesorSchema = mongoose.Schema({
  name: {
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
  sifraProfesora: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Profesor', ProfesorSchema);