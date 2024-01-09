// app.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const roleRoutes = require('./routes/roleRoutes');
const mainRoutes = require('./routes/mainRoutes');

const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

// Enable CORS for all routes
app.use(cors());

// Serve static files from the 'views' directory
app.use(express.static(path.join(__dirname, 'views')));

// Define the route for users
app.use('/api/users', userRoutes);

// Define the route for users
app.use('/api/roles', roleRoutes);

// Define the route for authentication
app.use('/api/auth', authRoutes);

// Define the route for html pages
app.use('/', mainRoutes);

// Handle 404 responses
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

module.exports = app;