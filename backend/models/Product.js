const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true, unique: true },
    sku: { type: String, required: true },
    image: { type: String, required: false },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    stockQuantity: { type: Number, required: true },
    isInStock: { type: Boolean, required: true, default: true },
    category: { type: [String], required: false },
    tags: { type: [String], required: false },
    weight: { type: Number },
    dimensions: { 
        length: { type: Number },
        width: { type: Number },
        height: { type: Number }
    },
    rating: { type: Number, default: 0 },
    reviews: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    }],
    seoTitle: { type: String },
    seoDescription: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
