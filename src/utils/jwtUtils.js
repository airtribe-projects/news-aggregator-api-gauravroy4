const jwt = require('jsonwebtoken');
const config = require('../../config/config');

function generateToken(payload) {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: '1h' });
}

function generateRefreshToken(payload) {
  return jwt.sign(payload, config.JWT_REFRESH_SECRET, { expiresIn: '7d' });
}

module.exports = {
  generateToken,
  generateRefreshToken,
};
