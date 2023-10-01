import { Sequelize } from 'sequelize';
import { sequelize } from '../setup/express.js';

// Models
import UserModel from '../models/user.js';
import ProductModel from '../models/product.js';
import OrderModel from '../models/order.js';
import CartModel from '../models/cart.js';
import CartItemModel from '../models/cart_item.js';
import OrderItemModel from '../models/order_item.js';

// Initialize models
const User = UserModel.initialize(sequelize, Sequelize.DataTypes);
const Product = ProductModel.initialize(sequelize, Sequelize.DataTypes);
const Order = OrderModel.initialize(sequelize, Sequelize.DataTypes);
const Cart = CartModel.initialize(sequelize, Sequelize.DataTypes);
const CartItem = CartItemModel.initialize(sequelize, Sequelize.DataTypes);
const OrderItem = OrderItemModel.initialize(sequelize, Sequelize.DataTypes);

// User relationships
User.hasMany(Order, { foreignKey: 'user_id', as: 'orders' });
User.hasOne(Cart, { foreignKey: 'user_id', as: 'cart' });

// Cart relationships
Cart.belongsTo(User, { foreignKey: 'user_id' });
Cart.hasMany(CartItem, { foreignKey: 'cart_id', as: 'items' });

// Order relationships
Order.belongsTo(User, { foreignKey: 'user_id' });
Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'items' });

// Product relationships
Product.belongsToMany(Cart, { through: CartItem, foreignKey: 'product_id' });
Product.belongsToMany(Order, { through: OrderItem, foreignKey: 'product_id' });

// CartItem relationships
CartItem.belongsTo(Cart, { foreignKey: 'cart_id' });
CartItem.belongsTo(Product, { foreignKey: 'product_id' });

// OrderItem relationships
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });

// Check database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });


  const db = {
    User,
    Product,
    Order,
    Cart,
    CartItem,
    OrderItem
  };
  
  export default db;
  

