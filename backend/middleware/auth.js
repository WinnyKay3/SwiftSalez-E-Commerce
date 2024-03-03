const jwt = require('jsonwebtoken');
const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');

exports.authenticateUser = async (req, res, next) => {
    try {
        // Your authentication logic here
    } catch (error) {
        next(error);
    }
};
