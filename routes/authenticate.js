import express from "express";
const router = express.Router();
import hashPassword from "./helperFunctions.js";
import db from '../db/database.js';
const { User } = db;

export default (app, passport) => {
    app.use('/authentication', router);

    // Registration Endpoint
    router.post('/register', async (req, res) => {
        try {
            const { email, name, address } = req.body;

            const checkEmail = await User.findOne({ where: { email: email } }); //we use User.findOne to check if a user with this email exist
            if (checkEmail) {
                return res.status(409).send({
                    message: 'User with this email exists, please try to log in or choose another email'
                });
            }

            let { password } = req.body; //using let to destruct the password from the req, avoid type error: assign to constant 
            password = await hashPassword(password); //hashing the password, imported function 

            const user = await User.create({
                email,
                password,
                name,
                address
            });

            res.status(201).send({
                message: "User created successfully",
                user: {
                    id: user.id,
                    email,
                    name,
                    address
                }
            });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).send({ message: error.message });
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
};
