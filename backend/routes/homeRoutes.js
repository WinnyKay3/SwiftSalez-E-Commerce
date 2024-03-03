const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// Define routes for order-related operations
router.get('/', homeController.home);
// Add more routes as needed

module.exports = router;
