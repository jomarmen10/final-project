const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  comment: {type:String}
})

module.exports = mongoose.model('Comment', CommentSchema);
