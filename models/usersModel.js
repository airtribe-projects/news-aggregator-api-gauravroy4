const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

    // Add preferences
    preferences: {
        categories: [String],  // e.g., ["technology", "sports"]
        language: { type: String, default: 'en' }  // e.g., "en", "hi"
    }
});

module.exports = mongoose.model('User', userSchema);
