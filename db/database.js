import { Sequelize } from 'sequelize';
import configJson from '../config/config.js' ;
const config = configJson.development;

// Import models
import User from '../models/user.js';
import Product from '../models/product.js';
import Order from '../models/order.js';
import Cart from '../models/cart.js';
import CartItem from '../models/cart_item.js';
import OrderItem from '../models/order_item.js';

const sequelize = new Sequelize(config.database, config.username, config.password, config);

// Initialize models
User.initialize(sequelize, Sequelize.DataTypes);
Product.initialize(sequelize, Sequelize.DataTypes);
Order.initialize(sequelize, Sequelize.DataTypes);
Cart.initialize(sequelize, Sequelize.DataTypes);
CartItem.initialize(sequelize, Sequelize.DataTypes);
OrderItem.initialize(sequelize, Sequelize.DataTypes);

// This will create tables if they don't exist yet: 
// sequelize.sync().then(() => {
//   console.log('Tables have been synchronized.');
// }).catch(error => {
//   console.error('Error synchronizing tables:', error);
// });

// Check database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });

const db = {
  sequelize,
  Sequelize,
  User,
  Product,
  Order,
  Cart,
  CartItem,
  OrderItem
};

export default db;
