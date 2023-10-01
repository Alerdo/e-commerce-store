import express from 'express';
const router = express.Router();
import db from '../db/database.js';
const {Product} = db;

// import Product from '../models/product.js';



export default (app, passport) => {

    app.use('/products', router);

  //   const isAuthenticated = (req, res, next) => {
  //     if (req.isAuthenticated()) return next();
  //     res.status(401).send({ message: 'Unauthorized' });
  // };


  router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll();
        if (products) {
            res.status(200).json(products);
        } else {
            res.status(404).json({ message: 'No products found.' }); // Adjusted message for clarity
        }

    } catch (error) {
        res.status(500).json({ 
            errorName: error.name, 
            errorMessage: error.message, 
            errorStack: process.env.NODE_ENV === 'development' ? error.stack : undefined // include stack trace only in development environment
        });
    }
});
}