
import express from 'express';
const router = express.Router();
import db from '../db/database.js';

const { Order } = db;

export default (app, passport) => {
    app.use('/cart', router);


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