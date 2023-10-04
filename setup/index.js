import loadExpress from './express.js';
import loadPassport from './passport.js';
import loadRoutes from '../routes/index.js';
import loadSwagger from './swagger.js';



export default async (app) => {

  // Load Express middlewares cors/bodyparser/session
  const expressApp = await loadExpress(app);

  // Load Passport functionality so its ready to use it
  const passport = await loadPassport(expressApp);
  
  
  // Load API route handlers pass tha app(imagine we had the app.use here, and passport as parameter that the rotues will use it on their file)
  await loadRoutes(app, passport);

  // Load Swagger
  await loadSwagger(app);
  

  // Error Handler
  app.use((err, req, res, next) => {
    if (res.headersSent) {
        // If headers are already sent, delegate the error to the default Express error handler
        return next(err);
    }
    const { message, status = 500 } = err;
    return res.status(status).send({ message });
});


 
  
}