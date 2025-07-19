const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');
const config = require('../config/config');

const authMiddleware = async (req, res, next) => {
  let token;

  if (req.headers.authorization) {
    const authHeader = req.headers.authorization;
    token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
  }

  if (!token && req.token) token = req.token;
  if (!token && req.cookies?.token) token = req.cookies.token;

  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    const user = User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user;
    next();
  } catch (err) {
    console.error('JWT Auth Error:', err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
