const bcrypt = require('bcryptjs');
const User = require('../models/user');

async function registerUser(username, email, password) {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({ username, email, password: hashedPassword });
  return user.save();
}

async function authenticateUser(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Email not found');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error('Invalid password');
  }

  return user;
}

module.exports = { registerUser, authenticateUser };
