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


// ... other imports and code
router.post('/create', async (req, res) => {
    const { name, description, price, stock_quantity, image_url } = req.body;

    // Basic validation: Check if all the required fields are provided
    if (!name || !description || price == null || stock_quantity == null || !image_url) {
        return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    try {
        const newProduct = await Product.create({
            name,
            description,
            price,
            stock_quantity,
            image_url
        });

        // Return the created product
        res.status(201).json(newProduct);

    } catch (error) {
        res.status(500).json({ 
            errorName: error.name, 
            errorMessage: error.message, 
            errorStack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});


router.post('/bulk', async (req, res) => {
    const {products} = req.body;

    // Validation: Check if productsArray is an array and has content
    if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ message: 'Please send a valid array of products.' });
    }

    try {
        const createdProducts = await Product.bulkCreate(products);

        // Return the created products
        res.status(201).json(createdProducts);

    } catch (error) {
        res.status(500).json({ 
            errorName: error.name, 
            errorMessage: error.message, 
            errorStack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});



}