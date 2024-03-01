const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Adjust the path as necessary
const jwt = require('jsonwebtoken');

// Define controller functions for user-related operations
exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Validate request body
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please provide username, email, and password' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email is already in use' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const user = new User({
            username,
            email,
            password: hashedPassword,
        });

        await user.save();

        // You can also generate a token and send it back here if you're implementing authentication

        // Send response
        res.status(201).json({
            message: 'User registered successfully',
            // Optionally, include user details except the password
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                // other fields as needed
            },
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate request body
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
        );

        // Send response with token
        res.status(200).json({
            message: 'Logged in successfully',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                // other fields as needed
            },
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

