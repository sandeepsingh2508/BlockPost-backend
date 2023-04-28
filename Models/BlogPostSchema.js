const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  userId:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true
  }
});

module.exports = mongoose.model('BlogPost', BlogPostSchema);
