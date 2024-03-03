const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Define routes for order-related operations
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.post('/', orderController.createOrder);
// Add more routes as needed

module.exports = router;
