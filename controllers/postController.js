const postService = require('../services/postService');

async function createPost(req, res) {
  console.log("Session Data:", req.session); // Debug session
  
  const { title, content } = req.body;
  const userEmail = req.session?.user?.email;

  if (!req.session.user) {
    return res.status(401).json({ error: "Unauthorized" }); // Ensure proper error handling
  }

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  try {
    const post = await postService.createPost(title, content, userEmail);
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}



async function getUserPosts(req, res) {
  const userEmail = req.session.user.email;
  try {
    const posts = await postService.getPostsByUserEmail(userEmail);
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { createPost, getUserPosts };
