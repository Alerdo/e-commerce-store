
//Index.js serves as a constructor for all of the routes, in order for them to be later exported into the /setup/index.js file , where they get the passport argument.

import authenticateRouter from './authentication';
import userRouter from './user.js';
import cartRouter from './cart';
import cartItemRouter from './cartItem';
import productRoutes from './product';
import orderRoutes from './order';
import orderItemRoutes from './orderItem';

export default (app, passport) => {
  // Initialize the different routes
  authenticateRouter(app, passport);
  userRouter(app, passport);
  cartRouter(app, passport);
  cartItemRouter(app, passport);
  productRoutes(app, passport);
  orderRoutes(app, passport);
  orderItemRoutes(app, passport);
};
