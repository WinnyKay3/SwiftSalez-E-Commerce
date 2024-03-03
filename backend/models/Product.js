const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true, unique: true },
    sku: { type: String, required: true },
    image: { type: String, required: false}
    // Add more fields as needed
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
