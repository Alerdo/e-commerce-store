
//Index.js serves as a constructor for all of the routes, in order for them to be later exported into the /setup/index.js file , where they get the passport argument.

import authenticateRouter from './authenticate.js';
import userRouter from './user.js';
import cartRouter from './cart.js';
import cartItemRouter from './cartItem.js';
import productRoutes from './product.js';
import orderRoutes from './order.js';
import orderItemRoutes from './orderItem.js';

export default (app, passport) => {
  // Initialize the different routes
  authenticateRouter(app, passport);
  cartItemRouter(app, passport);
  userRouter(app, passport);
  cartRouter(app, passport);
  productRoutes(app, passport);
  orderRoutes(app, passport);
  orderItemRoutes(app, passport);
};
