const authService = require('../services/authService');

async function signup(req, res) {
  const { username, email, password } = req.body;
  try {
    const user = await authService.registerUser(username, email, password);
    req.session.user = { _id: user._id, email: user.email };
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await authService.authenticateUser(email, password);
    req.session.user = { _id: user._id, email: user.email };
    res.status(200).json({ message: 'Logged in successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Could not log out' });
    }
    res.status(200).json({ message: 'Logged out successfully' });
  });
}

module.exports = { signup, login, logout };
