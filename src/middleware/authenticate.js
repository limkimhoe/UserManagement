const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // Get the token from the header
  
    if (!token) {
      return res.sendStatus(401); // No token, unauthorized
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Token is invalid
      }
  
      req.user = user; // Populate req.user with the decoded token payload
      next();
    });
  }
  
  module.exports = authenticateToken;
