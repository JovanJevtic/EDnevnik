const mongoose = require('mongoose');

const PredmetSchema = mongoose.Schema({
  ime: {
    type: String,
    required: true,
    unique: true
  },
  profesori: [{
    type: mongoose.Types.ObjectId,
    ref: 'Profesor',
    unique: true
  }],
}, {
  timestamps: true
})

module.exports = mongoose.model('Predmet', PredmetSchema);