import express from "express";
const router = express.Router();
import hashPassword from "./helperFunctions.js";
// import db from '../db/database.js';
// const { User, Cart } = db;

import User from '../models/user.js';
import Cart from '../models/cart.js';

export default (app, passport) => {
    app.use('/authentication', router);

    // Registration Endpoint
    // Registration Endpoint

    router.post('/register', async (req, res) => {
        try {
            const { email, name, address } = req.body;
            let { password } = req.body;
    
            // Check if user with provided email already exists
            const existingUser = await User.findOne({ where: { email: email } });
            if (existingUser) {
                return res.status(400).json({ success: false, message: 'Email already in use' });
            }
    
            password = await hashPassword(password); 
    
            //  Create a new user
            const user = await User.create({
                email,
                password,
                name,
                address
            });
        
            // Create a new cart for the user upon registration
            await Cart.create({ user_id: user.id });
    
            // Response
            res.status(200).json({ success: true, message: 'User registered successfully!' });
    
        } catch (error) {
            console.error('Error during registration:', error);
            res.status(500).json({ success: false, message: 'Server error during registration' });
        }
    });
    
   
    // Login
    router.post('/login', (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                console.error('Server error:', err);
                return res.status(500).send({ message: 'Server error' });
            }
        
            if (!user) {
                if (info && info.message) {
                    return res.status(401).json({ success: false, message: info.message });
                }
                return res.status(401).json({ success: false, message: 'Authentication failed' });
            }
            
            req.logIn(user, (err) => {
                if (err) {
                    console.error('Login process error:', err);
                    return res.status(500).send({ message: 'Error during the login process' });
                }
                return res.json({ success: true, message: 'Successfully logged in!' });
            });
        })(req, res, next);
    });
    
   
        // Logout Endpoint
        router.post('/logout', (req, res, next) => {
            req.logout((err) => {
                if (err) { return next(err); }
               return  res.json({ success: true, message: 'Successfully logged out!' })
              });
              
        });
        
       
};
