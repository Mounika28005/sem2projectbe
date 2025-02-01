const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  console.log("Session Data:", req.session);
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

router.post('/', isAuthenticated, postController.createPost);
router.get('/', isAuthenticated, postController.getUserPosts);

module.exports = router;
