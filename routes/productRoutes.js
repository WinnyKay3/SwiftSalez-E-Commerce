const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Define routes for product-related operations
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
// Add more routes as needed

module.exports = router;
