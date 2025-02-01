const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const { port, sessionSecret } = require('./config/config');
require('./connection/db'); // Initialize database connection
const MongoStore = require('connect-mongo');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

// CORS Configuration
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://yourfrontenddomain.com'], // Allow both local and deployed frontend
    credentials: true, // Allow cookies/auth headers
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  })
);

// Handle Preflight Requests
app.options('*', cors()); // Allow all preflight requests

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: { secure: false } // Change to true if using HTTPS
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
