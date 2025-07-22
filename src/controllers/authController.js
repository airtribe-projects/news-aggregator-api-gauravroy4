const bcrypt = require('bcryptjs');
const Users = require('../models/userProvider');
const rounds = 10;
const { allowedRoles } = require('./../../config/constants');
const { generateToken, generateRefreshToken } = require('../utils/jwtUtils');

exports.registerUser = async (req, res) => {
  try {
    let { name, email, password, role = 'user', preferences, language } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }
    const normalizedEmail = email.toLowerCase();

    const existingUser = await Users.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email.' });
    }

    const hashedPassword = await bcrypt.hash(password, rounds);
    const userRole = allowedRoles.includes(role) ? role : 'user';
    const userPreferences = {
      categories: preferences,
      language: language
    };

    const newUser = new Users({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role: userRole,
      preferences: userPreferences
    });

    const savedUser = await newUser.save();

    return res.status(200).json({
      message: 'User registered successfully.',
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
      },
    });
  } catch (error) {
    console.error('Register Error:', error.stack || error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
    const normalizedEmail = email.toLowerCase();

    const user = await Users.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const tokenPayload = { id: user._id, email: user.email, role: user.role };
    const token = generateToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    return res.status(200).json({
      message: 'Login successful',
      token,
      refreshToken,
    });
  } catch (error) {
    console.error('Login Error:', error.stack || error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
