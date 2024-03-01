// Import any required modules or models
const Product = require('../models/Product');

exports.getAllProducts = async (req, res, next) => {
    try {
        let query = {};

        // Example filters
        const { search, category, inStock, minPrice, maxPrice, tags } = req.query;

        // Search in title and description
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // Filter by category
        if (category) {
            query.category = category;
        }

        // Filter by stock availability
        if (inStock) {
            query.isInStock = inStock === 'true';
        }

        // Filter by price range
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) {
                query.price.$gte = minPrice;
            }
            if (maxPrice) {
                query.price.$lte = maxPrice;
            }
        }

        // Filter by tags
        if (tags) {
            // Assuming tags is a comma-separated string of tags
            query.tags = { $in: tags.split(',') };
        }

        const products = await Product.find(query);

        res.status(200).json({
            status: 'success',
            results: products.length,
            data: {
                products
            }
        });
    } catch (error) {
        console.error('Error retrieving products:', error);
        next(error);
    }
};


exports.getProductById = async (req, res, next) => {
    try {
        const productId = req.params.id; // Assuming the route parameter is named 'id'

        // Find the product by ID
        const product = await Product.findById(productId);

        // If no product found, send a 404 response
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // If product found, send back the product data
        res.status(200).json({
            status: 'success',
            data: {
                product
            }
        });
    } catch (error) {
        // If error is due to an invalid ObjectId format
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid product ID' });
        }
        
        console.error('Error retrieving product by ID:', error);
        next(error); // Pass the error to the next middleware (e.g., an error handler)
    }
};

exports.createProduct = async (req, res, next) => {
    try {
        // Extract product details from request body
        const { title, description, sku, image, price, stockQuantity, category, tags, weight, dimensions } = req.body;

        // Create a new product document using the Product model
        const newProduct = new Product({
            title,
            description,
            sku,
            image, // This can be a URL or a path to the image file
            price,
            stockQuantity,
            category, // This can be a single category string or an array of strings for multiple categories
            tags, // An array of strings
            weight,
            dimensions, // An object with properties like length, width, height
            // Add any additional fields you included in your product schema
        });

        // Save the new product to the database
        await newProduct.save();

        // Send a response back to the client
        res.status(201).json({
            status: 'success',
            message: 'Product created successfully',
            data: {
                product: newProduct
            }
        });
    } catch (error) {
        console.error('Error creating product:', error);
        next(error); // Pass the error to the next middleware (typically an error handler)
    }
};

// Add more controller functions as needed
