const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  User: {type:String, require:True}
})

module.exports = mongoose.model('User', UserSchema);
