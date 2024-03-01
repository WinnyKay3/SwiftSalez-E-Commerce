const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Define routes for payment-related operations
router.post('/process', paymentController.processPayment);
// Add more routes as needed

module.exports = router;
