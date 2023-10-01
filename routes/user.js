import express from 'express';
const router = express.Router();
// import db from '../db/database.js';

// const { User, Cart, CartItem } = db;

import User from '../models/user.js';
import Cart from '../models/cart.js';
import CartItem from '../models/cart_item.js';

export default (app, passport) => {
    app.use('/user', router);

    // Middleware to check if user is authenticated
    const isAuthenticated = (req, res, next) => {
        if (req.isAuthenticated()) return next();
        res.status(401).send({ message: `Unathorized, Please Login to access profile.`, status: 401 });
    };
    
    // Read user profile
    router.get('/profile', isAuthenticated, async (req, res) => {
        try {
            const user = await User.findByPk(req.user.id);
            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            }
            res.status(200).send(user);
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).send({ message: error.message });
        }
    });

    // Update user profile
    router.put('/profile', isAuthenticated, async (req, res) => {
        try {
            const { email, name, address } = req.body;
            const user = await User.findByPk(req.user.id);

            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            }

            user.email = email || user.email;
            user.name = name || user.name;
            user.address = address || user.address;

            await user.save();
            
            res.status(200).send({
                message: 'Profile updated successfully',
                user
            });
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).send({ message: error.message });
        }
    });

    router.delete('/profile', async (req, res) => {
        try {
            const user = await User.findByPk(req.user.id);
    
            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            }
    
            const userCart = await Cart.findOne({ where: { user_id: user.id } });
            if (userCart) {
                await CartItem.destroy({ where: { cart_id: userCart.id } });
                //  delete the cart itself
                await userCart.destroy();
            }
    
            //  safely delete the user
            await user.destroy();

            req.logout((err) => {
                if (err) { return next(err); }
                // res.redirect('/');  // redirecting after logout
            });

            res.status(200).send({ message: 'User deleted successfully' });

        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).send({ message: error.message });
        }
    });
    
};
