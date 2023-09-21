import express from 'express';
const router = express.Router();
import db from '../db/database.js';

const { User } = db;

export default (app, passport) => {
    app.use('/user', router);

    // Middleware to check if user is authenticated
    const isAuthenticated = (req, res, next) => {
        if (req.isAuthenticated()) return next();
        res.status(401).send({ message: 'Unauthorized' });
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

    // Delete user
    router.delete('/profile', isAuthenticated, async (req, res) => {
        try {
            const user = await User.findByPk(req.user.id);

            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            }

            await user.destroy();
            req.logout();

            res.status(200).send({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).send({ message: error.message });
        }
    });
};
