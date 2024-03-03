// Define controller functions for order-related operations
exports.home = async (req, res, next) => {
  try {
    list = [{id: 1, tile: "Test"}]


    res.json(list)
      // Retrieve all orders logic here
  } catch (error) {
      next(error);
  }
};
