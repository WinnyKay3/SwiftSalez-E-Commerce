const axios = require('axios');
const qs = require('qs');

exports.processPayment = async (req, res, next) => {
    try {

        // @todo implement M-Pesa payment
       

        res.status(200).json({
            status: 'success',
            data: response.data
        });
    } catch (error) {
        console.error('Error processing payment:', error);
        next(error);
    }
};
