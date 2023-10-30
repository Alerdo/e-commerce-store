import bodyParser from "body-parser";
import cors from 'cors';
import session from "express-session";
import morgan from 'morgan';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
import { Sequelize } from 'sequelize';
import SequelizeStoreInit from 'connect-session-sequelize'; //session memory 

const env = process.env.NODE_ENV || 'development';

// Initialize Sequelize directly here
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

// Initialize SequelizeStore with sequelize instance
const SequelizeStore = SequelizeStoreInit(session.Store);
const sessionStore = new SequelizeStore({ db: sequelize });

// Sync the session store with the database
sessionStore.sync();

export default (app) => {
    const CORS_ORIGIN = process.env.NODE_ENV === "production" ? process.env.PROD_FRONTEND_URL : 'https://estorefrontend.vercel.app/';

    app.use(cors({
        origin: 'https://estorefrontend.vercel.app',
        credentials: true
    }));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(morgan('dev'));
    app.set('trust proxy', 1);
    app.use(cookieParser());

    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            store: sessionStore, // Use the sessionStore we initialized earlier
            cookie: {
                secure: process.env.NODE_ENV === "production",  
                maxAge: 24 * 60 * 60 * 1000 
            }
        })
    );

    app.use(flash());

    return app;
}

export {sequelize};
