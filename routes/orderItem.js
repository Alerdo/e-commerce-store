    
import express from 'express';
const router = express.Router();
import db from '../db/database.js';

const { Order, OrderItem, Product } = db;

export default (app, passport) => {
    app.use('/cart', router);

    
    
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