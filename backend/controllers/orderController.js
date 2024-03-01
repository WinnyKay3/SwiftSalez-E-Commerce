const Order = require('../models/Order');

exports.getAllOrders = async (req, res, next) => {
    try {
        const filters = {};
        const { orderStatus, paymentStatus } = req.query;

        if (orderStatus) {
            filters.orderStatus = orderStatus;
        }

        if (paymentStatus) {
            filters.paymentStatus = paymentStatus;
        }

        // Retrieve all orders from the database that match the filters
        const orders = await Order.find(filters)
                                  .populate('customer', 'name email') // Example of populating customer info
                                  .populate('items.product', 'title price'); // Example of populating product info within items

        // Send response back
        res.status(200).json({
            status: 'success',
            results: orders.length,
            data: {
                orders
            }
        });
    } catch (error) {
        console.error('Error retrieving all orders:', error);
        next(error);
    }
};


exports.getOrderById = async (req, res, next) => {
    try {
        // Extract the order ID from the request parameters
        const orderId = req.params.id;

        // Find the order by its ID in the database
        const order = await Order.findById(orderId)
            .populate('customer', 'name email') // Populate customer details
            .populate('items.product', 'title price'); // Populate product details in items

        // If no order found, return a 404 Not Found response
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Return the found order with a 200 OK response
        res.status(200).json({
            status: 'success',
            data: {
                order
            }
        });
    } catch (error) {
        // If the error is due to an invalid ObjectId format
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid order ID' });
        }
        console.error('Error retrieving order by ID:', error);
        next(error); // Pass the error to the next middleware (usually an error handler)
    }
};


exports.createOrder = async (req, res, next) => {
    try {
        // Extract order details from request body
        const { customer, items, shippingDetails } = req.body;

        // Optionally, calculate the total amount based on items array
        // Assuming each item object has 'price' and 'quantity' properties
        const totalAmount = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        // Create a new order document
        const newOrder = new Order({
            customer,
            items,
            totalAmount,
            shippingDetails,
            // Set other fields as needed, such as orderStatus, paymentStatus, etc.
        });

        // Save the new order to the database
        await newOrder.save();

        // Respond with the created order
        res.status(201).json({
            status: 'success',
            message: 'Order created successfully',
            data: {
                order: newOrder
            }
        });
    } catch (error) {
        console.error('Error creating order:', error);
        next(error);
    }
};

// Add more controller functions as needed
