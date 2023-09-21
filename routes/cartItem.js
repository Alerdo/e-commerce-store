
import express from 'express';
const router = express.Router();
import db from '../db/database.js';

const { Cart, Product, CartItem } = db;

export default (app, passport) => {
    app.use('/cart_items', router);


// Add Item to Cart
router.post('/add-item', isAuthenticated, async (req, res) => {
    try {
    
        const { product_id , quantity} = req.body; //this is to be changed as the product_id we will have it internally
                                                //the product itself will have the id , and that id will be set as product_id 
        // Check if the product exists
        const product = await Product.findOne({ where: { id: product_id } });
        
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }


        const user_id = req.user.id; 
        const cart = await Cart.findOne({ where: { user_id } });
        
        if (!cart) {
            return res.status(404).send({ message: 'Cart not found' });
        }

        await CartItem.create({
            cart_id: cart.id,
            product_id: product.id,  // Using product.id to be explicit
            quantity: quantity
        });

        res.status(201).send({ message: 'Item added to cart' });

    } catch (error) {
        console.error('Error adding item:', error);
        res.status(500).send({ message: error.message });
    }
});


// Fetch Items in Cart
router.get('/items', isAuthenticated, async (req, res) => {
    try {
        const user_id = req.user.id;

        const cart = await Cart.findOne({ where: { user_id } });

        if(!cart) {
            return res.status(404).send({ message: 'Cart not found' });
        }

        const items = await CartItem.findAll({
            where: { cart_id: cart.id }
        });

        res.status(200).send(items);

    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).send({ message: error.message });
    }
});

// Delete Item from Cart
router.delete('/remove-item/:id', isAuthenticated, async (req, res) => {
    try {
        const user_id = req.user.id;
        const { id } = req.params;

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