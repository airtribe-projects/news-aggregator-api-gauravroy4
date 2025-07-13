const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');
const rounds = 10; // bcrypt hashing rounds

// 📌 Register User
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email.' });
    }

    const hashedPassword = await bcrypt.hash(password, rounds);
    const allowedRoles = ['user', 'admin'];
    const userRole = allowedRoles.includes(role) ? role : 'user';

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: userRole,
    });

    const savedUser = await newUser.save();

    return res.status(201).json({
      message: 'User registered successfully.',
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
      },
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

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
      refreshToken,
    });
  } catch (error) {
    console.error('Login Error:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
