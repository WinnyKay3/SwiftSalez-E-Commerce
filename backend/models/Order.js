const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [orderItemSchema],
  subtotal: {
    type: Number,
    required: true
  },
  taxes: {
    type: Number,
    required: true
  },
  shippingFee: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  shippingAddress: {
    type: String,
    required: true
  },
  billingAddress: {
    type: String,
    required: true
  },
  paymentDetails: {
    type: {
      method: {
        type: String,
        required: true,
        enum: ['card', 'paypal', 'bank_transfer', 'cod'], // cod = cash on delivery
      },
      status: {
        type: String,
        required: true,
        enum: ['pending', 'completed', 'failed', 'refunded']
      },
      transactionId: {
        type: String
      }
    },
    required: true
  },
  orderStatus: {
    type: String,
    required: true,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  notes: {
    type: String
  }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
