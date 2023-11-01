import express from "express";
const router = express.Router();
import hashPassword from "./helperFunctions.js";
import db from '../db/database.js';
const { User, Cart } = db;

// import User from '../models/user.js';
// import Cart from '../models/cart.js';

export default (app, passport) => {
    app.use('/authentication', router);

    // Registration Endpoint
    // Registration Endpoint

    router.post('/register', async (req, res) => {
        try {
            const { email, name, address } = req.body;
            let { password } = req.body;
    
            const existingUser = await User.findOne({ where: { email: email } });
            if (existingUser) {
                return res.status(400).json({ success: false, message: 'Email already in use' });
            }
    
            password =  await hashPassword(password); 
    
            const user = await User.create({
                email,
                password,
                name,
                address
            });
        
            await Cart.create({ user_id: user.id });
    
            res.status(200).json({ success: true, message: 'User registered successfully!' });
    
        } catch (error) {
            console.error('Error during registration:', error);
            
            // During development, you can send back a detailed error message.
            // In production, you might want to revert to a more generic error message.
            res.status(500).json({ success: false, message: `Server error during registration: ${error.message}` });
        }
    });
    
    
   
    // Login
    router.post('/login', (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            // Server error during authentication
            if (err) {
                console.error('Server error:', err);
                return res.status(500).json({ success: false, message: 'Server error' });
            }
    
            // User not found or invalid credentials
            if (!user) {
                let message = info?.message || 'Authentication failed';
                console.error('Authentication error:', message);
                return res.status(401).json({ success: false, message: message });
            }
    
            // Attempt to log the user in
            req.logIn(user, (err) => {
                if (err) {
                    console.error('Login process error:', err);
                    return res.status(500).json({ success: false, message: 'Error during the login process' });
                }
                
                console.log('Successfully logged in user:', user.id); // log user ID for debugging
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
