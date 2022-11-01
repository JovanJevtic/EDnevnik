const mongoose = require('mongoose');

const PredmetSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model('Predmet', PredmetSchema);