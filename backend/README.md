Overview

This project is a backend solution for an e-commerce platform. It handles user authentication, product management, order processing, and payment integration. The backend is built using Node.js with Express and MongoDB as the database.

Features

1.User Authentication:
   Users can register, login, and manage their accounts securely.
2.Product Management: 
   Admins can add, update, delete, and retrieve products.
3.Order Processing: 
   Users can create orders, view their order history, and track order status.
4.Payment Integration:
   Seamless integration with payment gateways for secure transactions.
5.Middleware: 
   Custom middleware for authentication and error handling.
6.Database Configuration: 
   MongoDB database setup for data storage.

Getting Started

To get started with the project, follow these steps:Clone the repository: git clone https://github.com/WinnyKay3/Swiftsalez-backend.gitInstall dependencies: npm install

Configure the database:

Update config/database.js with your MongoDB connection string.

Run the server: npm startTest the APIs using tools like Postman or cURL.

API Documentation:

For detailed API documentation, refer to the API.md file in the repository.

Contributing

Contributions are welcome! Feel free to open issues or pull requests for bug fixes, feature enhancements, or suggestions.

License

This project is licensed under the MIT License - see the LICENSE file for details.

Environment variables:
- JWT_SECRET: String containing the JWT secret. To generate one you could run the following command in Node REPL
```
console.log(require('crypto').randomBytes(32).toString('hex'));
```


