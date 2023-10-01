import express from 'express';
const router = express.Router();
import db from '../db/database.js';

const { Cart } = db;

export default (app, passport) => {
    app.use('/cart', router);

    // Middleware to check if user is authenticated
    const isAuthenticated = (req, res, next) => {
        if (req.isAuthenticated()) return next();
        res.status(401).send({ message: 'Unauthorized' });
    };

    // Create a new cart
    router.post('/', isAuthenticated, async (req, res) => {
        try {
            const cart = await Cart.create({
                user_id: req.user.id,
                creation_date: new Date()
            });
            res.status(201).send({ message: 'Cart created successfully', cart });
        } catch (error) {
            console.error('Error creating cart:', error);
            res.status(500).send({ message: error.message });
        }
    });

    // Read cart information
    router.get('/', isAuthenticated, async (req, res) => {
        try {
            const cart = await Cart.findOne({ where: { user_id: req.user.id } });
            if (!cart) {
                return res.status(404).send({ message: 'Cart not found' });
            }
            res.status(200).send(cart);
        } catch (error) {
            console.error('Error fetching cart:', error);
            res.status(500).send({ message: error.message });
        }
    });

    // Update cart's creation_date
    router.put('/', isAuthenticated, async (req, res) => {
        try {
            const cart = await Cart.findOne({ where: { user_id: req.user.id } });
            if (!cart) {
                return res.status(404).send({ message: 'Cart not found' });
            }
            cart.creation_date = new Date();
            await cart.save();
            res.status(200).send({ message: 'Cart updated successfully', cart });
        } catch (error) {
            console.error('Error updating cart:', error);
            res.status(500).send({ message: error.message });
        }
    });

    // Delete cart
    router.delete('/', isAuthenticated, async (req, res) => {
        try {
            const cart = await Cart.findOne({ where: { user_id: req.user.id } });
            if (!cart) {
                return res.status(404).send({ message: 'Cart not found' });
            }
            await cart.destroy();
            res.status(200).send({ message: 'Cart deleted successfully' });
        } catch (error) {
            console.error('Error deleting cart:', error);
            res.status(500).send({ message: error.message });
        }
    });
};
