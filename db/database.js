

import { Sequelize } from 'sequelize';
import {sequelize} from '../setup/express.js'

// const env = process.env.NODE_ENV || 'development';

// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//     dialect: 'postgres',
//     protocol: 'postgres',
//     dialectOptions: {
//         ssl: {
//             require: true,
//             rejectUnauthorized: false
//         }
//     }
// });

// Models
import User from '../models/user.js';
import Product from '../models/product.js';
import Order from '../models/order.js';
import Cart from '../models/cart.js';
import CartItem from '../models/cart_item.js';
import OrderItem from '../models/order_item.js';

// Initialize models
User.initialize(sequelize, Sequelize.DataTypes);
Product.initialize(sequelize, Sequelize.DataTypes);
Order.initialize(sequelize, Sequelize.DataTypes);
Cart.initialize(sequelize, Sequelize.DataTypes);
CartItem.initialize(sequelize, Sequelize.DataTypes);
OrderItem.initialize(sequelize, Sequelize.DataTypes);


// // User relationships
// User.hasMany(Order, { foreignKey: 'user_id', as: 'orders' });
// User.hasOne(Cart, { foreignKey: 'user_id', as: 'cart' });

// // Cart relationships
// Cart.belongsTo(User, { foreignKey: 'user_id' });
// Cart.hasMany(CartItem, { foreignKey: 'cart_id', as: 'items' });

// // Order relationships
// Order.belongsTo(User, { foreignKey: 'user_id' });
// Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'items' });

// // Product relationships
// Product.belongsToMany(Cart, { through: CartItem, foreignKey: 'product_id' });
// Product.belongsToMany(Order, { through: OrderItem, foreignKey: 'product_id' });

// // CartItem relationships
// CartItem.belongsTo(Cart, { foreignKey: 'cart_id' });
// CartItem.belongsTo(Product, { foreignKey: 'product_id' });

// // OrderItem relationships
// OrderItem.belongsTo(Order, { foreignKey: 'order_id' });
// OrderItem.belongsTo(Product, { foreignKey: 'product_id' });

// // Check database connection
// sequelize.authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(error => {
//     console. error('Unable to connect to the database:', error);
//   });

export default{
//   Sequelize,
  User,
  Product,
  Order,
  Cart,
  CartItem,
  OrderItem
};
