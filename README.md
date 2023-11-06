# E-Commerce Store Backend

Welcome to the E-Commerce Store Backend repository! This backend API is the core of this e-commerce application, providing a wide range of functionalities including user authentication, user profiles, shopping carts, and order processing.

## Project Overview

E-commerce store backend is built with the following key features and components:

- **Express Server**: We use Node.js and Express.js to create a robust and scalable server that handles various API routes and functionalities.

- **User Authentication**: Passport.js is employed for user authentication, allowing users to register and log in securely using their email or username and password.

- **Swagger API Documentation**: We've integrated Swagger UI Express to create comprehensive API documentation. This makes it easy for developers to understand and interact with the API endpoints.

- **Database Management**: Sequelize is my choice for interacting with a PostgreSQL database. Database schema includes tables like Users, Carts, CartItems, Orders, and OrderItems, which manage user data, shopping carts, and orders.

- **Security Measures**: We take security seriously. User passwords are securely hashed and salted using bcrypt to protect sensitive information. Additionally, environment variables are used to store sensitive data securely.

## Database Structure

The project uses a PostgreSQL database to store and manage data. Below is an overview of the database tables and their relationships:

- **Users**: This table stores user information, including authentication details. It includes fields like `id`, `email`, and securely hashed and salted `password`.

- **Carts**: The `Carts` table manages user shopping carts and their contents. It includes a foreign key `user_id` to associate carts with specific users.

- **CartItems**: The `CartItems` table connects products to user shopping carts. It includes fields like `cart_id` (foreign key to `Carts`), `product_id` (foreign key to `Products`), and `quantity` to represent the number of items in the cart.

- **Orders**: The `Orders` table records user orders. It includes a foreign key `user_id` to associate orders with specific users.

- **OrderItems**: The `OrderItems` table connects products to user orders. It includes fields like `order_id` (foreign key to `Orders`), `product_id` (foreign key to `Products`), and `quantity` to represent the number of items in each order.

These tables and their relationships are defined in the project's database schema. The schema and migrations are managed using Sequelize.



## Front-End Repository

For the corresponding front-end application that interacts with this backend, please visit our [Front-End Repository]([https://github.com/yourusername/e-commerce-frontend](https://github.com/Alerdo/e-store-front-end)https://github.com/Alerdo/e-store-front-end).

