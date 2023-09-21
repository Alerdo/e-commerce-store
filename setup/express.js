import bodyParser from "body-parser";
import cors from 'cors';
import session from "express-session";
import morgan from 'morgan';
import flash from 'connect-flash';




export default (app) => {
    // Allow all origins by default, enabling all cross-origin resources
    app.use(cors());

    // Transform request's raw strings into JSON 
    app.use(bodyParser.json());

    // Parses urlencoded request bodies
    app.use(bodyParser.urlencoded({ extended: true }));

    // Logging middleware
    app.use(morgan('dev'));

    


    // Use this when your app is sitting behind a proxy and you want to trust the first proxy
    app.set('trust proxy', 1);

    // Session configuration
    app.use(
        session({
            secret: process.env.SESSION_SECRET,  // TODO: Change this to a stronger secret in production!
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: false,  // Should be set to true in production if using HTTPS
                maxAge: 24 * 60 * 60 * 1000 // Session will last for 24 hours
            }
        })
    );

    app.use(flash());
    console.log('Session secret:', process.env.SESSION_SECRET);

    return app;
}
