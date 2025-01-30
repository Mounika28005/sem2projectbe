const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userEmail: { type: String, required: true },
  // image: { type: String, required: false }, // URL to the uploaded image
});

module.exports = mongoose.model('Post', postSchema);
