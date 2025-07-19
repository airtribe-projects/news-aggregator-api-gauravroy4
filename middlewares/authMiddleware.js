const jwt = require('jsonwebtoken');
const Users = require('../models/userProvider');
const config = require('../config/config');

const authMiddleware = async (req, res, next) => {
  let token;

  // 1. Check Authorization Header
  if (req.headers.authorization) {
    const authHeader = req.headers.authorization;
    token = authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : authHeader;
  }

  // 2. Check req.token (if some middleware has set it manually)
  if (!token && req.token) {
    token = req.token;
  }

  // 3. Check Cookie
  if (!token && req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    const dbUser = await Users.findById(decoded.id);
    const user = dbUser && dbUser.select('-password'); // Exclude password from user object

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('JWT Auth Error:', err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
