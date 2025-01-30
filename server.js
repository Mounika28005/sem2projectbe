const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const { port, sessionSecret } = require('./config/config');
require('./connection/db'); // Initialize database connection

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Adjust to match your frontend URL
  credentials: true,
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(
  session({
    secret: sessionSecret, // Ensure this is a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
  })
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
