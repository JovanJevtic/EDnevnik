const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://Jovan:nebojebojedunava@cluster0.26f9vqu.mongodb.net/?retryWrites=true&w=majority");
    console.log(`Successfully connected ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

module.exports = connectDB;