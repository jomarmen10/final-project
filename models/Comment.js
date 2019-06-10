const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  comment: {type:String, require:true}
})

module.exports = mongoose.model('Comment', CommentSchema);
