    
import express from 'express';
const router = express.Router();
import db from '../db/database.js';

const { Order, OrderItem, Product } = db;

// import Product from '../models/product.js';
// import Order from '../models/order.js';
// import OrderItem from '../models/order_item.js';

export default (app, passport) => {
    app.use('/cart', router);

    
      // Middleware to check if user is authenticated
      const isAuthenticated = (req, res, next) => {
        if (req.isAuthenticated()) return next();
        res.status(401).send({ message: 'Unauthorized' });
    };

    // Add Item to Order
    router.post('/add-item-to-order/:orderId', isAuthenticated, async (req, res) => {
        try {
            const order_id = req.params.orderId;
            const { product_id, quantity, price_at_time_of_purchase } = req.body;

            // Check if the product exists
            const product = await Product.findOne({ where: { id: product_id } });

            if (!product) {
                return res.status(404).send({ message: 'Product not found' });
            }

            // Check if the order exists and belongs to the user
            const order = await Order.findOne({ where: { id: order_id, user_id: req.user.id } });

            if (!order) {
                return res.status(404).send({ message: 'Order not found or not owned by user' });
            }

            await OrderItem.create({
                order_id,
                product_id,
                quantity,
                price_at_time_of_purchase
            });

            res.status(201).send({ message: 'Item added to order' });

        } catch (error) {
            console.error('Error adding item to order:', error);
            res.status(500).send({ message: error.message });
        }
    });


};