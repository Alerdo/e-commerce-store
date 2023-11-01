
import express from 'express';
const router = express.Router();
import db from '../db/database.js';

const { Cart, Product, CartItem, User} = db;

// import Product from '../models/product.js';
// import Cart from '../models/cart.js';
// import CartItem from '../models/cart_item.js';

const isAuthenticated = (req, res, next) => {
  console.log('Entering isAuthenticated middleware...');
  console.log('Cookies:', req.headers.cookie);

  // Check the authentication status
  if (req.isAuthenticated()) {
    console.log('User is authenticated!');
    return next();
  }

  // Log session details for debugging
  if (req.session) {
    console.log('Session details:', JSON.stringify(req.session, null, 2));
  } else {
    console.log('No session found.');
  }

  // Log user details if present
  if (req.user) {
    console.log('User details:', JSON.stringify(req.user, null, 2));
  } else {
    console.log('No user found in the request.');
  }

  console.log('User is not authenticated. Sending 401 response.');
  res.status(401).send({ message: 'Unauthorized, Please Login to access cart' });
};


export default (app, passport) => {
    app.use('/cart_items', router);

      // Middleware to check if user is authenticated
 
    router.use((req, res, next) => { //checking if the req.user is being populated 
        console.log(`Res.user object check: ${req.user}`);
        next();
    });
    
// Add Item to Cart it will probarly be a button in the front end
router.post('/add-item', isAuthenticated, async (req, res) => {
  try {
      const { product_id, quantity } = req.body;

      // Check if the product exists
      const product = await Product.findOne({ where: { id: product_id } });
      if (!product) {
          return res.status(404).send({ message: 'Product not found' });
      }

      // Ensure user is set by isAuthenticated
      if (!req.user || !req.user.id) {
          return res.status(401).send({ message: 'Unauthorized' });
      }

      const user_id = req.user.id;
      const cart = await Cart.findOne({ where: { user_id } });
      if (!cart) {
          return res.status(404).send({ message: 'Cart not found' });
      }

      await CartItem.create({
          cart_id: cart.id,
          product_id: product.id,
          quantity: quantity
      });

      res.status(201).send({ message: 'Item added to cart' });

  } catch (error) {
      console.error(`Error adding item: ${error}`);
      res.status(500).send({ message: `Error adding item: ${error.message}` });
  }
});


// Fetch Items in Cart
router.get('/items',isAuthenticated, async (req, res) => {
    try {
      const user_id = req.user.id; // req.user.id is set upon authentication
  
      const cart = await Cart.findOne({ where: { user_id } });
  
      if (!cart) {
        return res.status(404).send({ message: 'Cart not found' });
      }
  
      // Join CartItem with Product to get detailed product information
      const items = await CartItem.findAll({
        where: { cart_id: cart.id },
        include: [
          {
            model: Product,
            attributes: ['name', 'price', 'image_url'] // joining these records from the product table, base on prodcut_id
          }
        ]
      });
        
  
      // Now, 'items' should contain the cart items along with the associated product information
      res.status(200).send(items);
  
    } catch (error) {
      console.error('Error fetching cart items:', error);
      res.status(500).send({ message: error.message });
    }
  });
  

// Delete Item from Cart
router.delete('/remove-item',  async (req, res) => {
    try {
        const user_id = req.user.id;
        const { id } = req.body

        const cart = await Cart.findOne({ where: { user_id } });

        if(!cart) {
            return res.status(404).send({ message: 'Cart not found' });
        }

        const item = await CartItem.findOne({ where: { id, cart_id: cart.id } });

        if(!item) {
            return res.status(404).send({ message: 'Item not found in cart' });
        }

        await item.destroy();

        res.status(200).send({ message: 'Item removed from cart' });

    } catch (error) {
        console.error('Error removing item:', error);
        res.status(500).send({ message: error.message });
    }
});

}