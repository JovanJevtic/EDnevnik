const mongoose = require('mongoose');

const PredmetSchema = mongoose.Schema({
  ime: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model('Predmet', PredmetSchema);