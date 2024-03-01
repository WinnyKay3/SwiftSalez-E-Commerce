const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String },
    profilePicture: { type: String },
    bio: { type: String },
    phone: { type: String },
    address: { type: String }, // Consider making this more complex for detailed addresses
    role: { type: String, default: 'user' }, // Consider using an enum for predefined roles
    isActive: { type: Boolean, default: true },
    isEmailVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    socialMedia: {
        facebook: { type: String },
        twitter: { type: String },
        instagram: { type: String },
        // Add more as needed
    },
    // Add more fields as needed
});

const User = mongoose.model('User', userSchema);

module.exports = User;
