const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');
const config = require('../config/config');
const rounds = 10; // bcrypt salt rounds

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role, preferences = [] } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    // Check for duplicate user
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email.' });
    }

    // Role handling
    const allowedRoles = ['user', 'admin'];
    const userRole = allowedRoles.includes(role) ? role : 'user';

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: userRole,
      preferences,
    });

    return res.status(200).json({
      message: 'User registered successfully.',
      user: user.toJSON(),
    });
  } catch (error) {
    console.error('Register Error:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Create token payload
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = jwt.sign(payload, config.jwtSecret, {
      expiresIn: '1h',
    });

    const refreshToken = jwt.sign(payload, config.jwtRefreshSecret, {
      expiresIn: '7d',
    });

    return res.status(200).json({
      message: 'Login successful',
      token: accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error('Login Error:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
