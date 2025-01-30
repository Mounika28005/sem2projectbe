const Post = require('../models/post');

async function createPost(title, content, userEmail) {
  const post = new Post({ title, content, userEmail });
  return post.save();
}

async function getPostsByUserEmail(userEmail) {
  return Post.find({ userEmail });
}

module.exports = { createPost, getPostsByUserEmail };

