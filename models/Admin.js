const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
  ime: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  sifra: {
    type: String,
    required: true
  }
}, {
    timestamps: true
});

module.exports = mongoose.model('Admin', AdminSchema);