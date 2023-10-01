
import express from 'express';
const router = express.Router();
import Order from '../models/order.js';

export default (app, passport) => {
    app.use('/cart', router);

      // Middleware to check if user is authenticated
      const isAuthenticated = (req, res, next) => {
        if (req.isAuthenticated()) return next();
        res.status(401).send({ message: 'Unauthorized' });
    };

    // Place an Order
    router.post('/place-order', isAuthenticated, async (req, res) => {
        try {
            const { shipping_address, status } = req.body;
            const user_id = req.user.id;

            const newOrder = await Order.create({
                user_id,
                order_date: new Date(),
                shipping_address,
                status
            });

            res.status(201).send({ message: 'Order placed successfully', newOrder });
        } catch (error) {
            console.error('Error placing order:', error);
            res.status(500).send({ message: error.message });
        }
    });

};