import  express  from 'express';
import authenticateRouter from './authenticate.js';
const router = express.Router();
// import User from '../models/user.js'
// import { authenticateRouter,User, Product, Cart, CartItem, Order, OrderItem }  from '../models/index.js';


export default (app, passport) => {
  authenticateRouter(app, passport);
  // cartRouter(app);
  // orderRouter(app);
  // productRouter(app);
  // userRouter(app);
}