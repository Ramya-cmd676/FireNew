const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String, // Plain text for now (not recommended in production)
});

module.exports = mongoose.model('User', userSchema);
