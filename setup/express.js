import bodyParser from "body-parser";
import cors from 'cors';
import session from "express-session";
import morgan from 'morgan';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
// import { Sequelize } from 'sequelize';
import SequelizeStoreInit from 'connect-session-sequelize'; //session memory 

// Initialize Sequelize
// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//     dialect: 'postgres',
//     protocol: 'postgres',
//     dialectOptions: {
//         ssl: {
//             require: true,
//             rejectUnauthorized: false
//         }
//     }
// });

const SequelizeStore = SequelizeStoreInit(session.Store);

export default (app) => {
    // Dynamic CORS configuration based on environment
    const CORS_ORIGIN = process.env.NODE_ENV === "production" ? process.env.PROD_FRONTEND_URL : 'http://localhost:3000';

    app.use(cors({
        origin: CORS_ORIGIN,
        credentials: true
    }));
    
    // Transform request's raw strings into JSON 
    app.use(bodyParser.json());

    // Parses urlencoded request bodies
    app.use(bodyParser.urlencoded({ extended: true }));

    // Logging middleware
    app.use(morgan('dev'));

    // Trust the first proxy when app is sitting behind a proxy
    app.set('trust proxy', 1);
    app.use(cookieParser());

    // Session configuration with Sequelize as the session store
    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            store: new SequelizeStore({
                db: sequelize,
            }),
            cookie: {
                secure: process.env.NODE_ENV === "production",  // Set to true if in production and using HTTPS
                maxAge: 24 * 60 * 60 * 1000 // Session will last for 24 hours
            }
        })
    );

    // Use connect-flash for flash messages
    app.use(flash());

    return app;
}


// export { sequelize };

