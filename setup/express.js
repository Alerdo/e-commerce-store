import bodyParser from "body-parser";
import cors from 'cors';
import session from "express-session";
import morgan from 'morgan';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
import { Sequelize } from 'sequelize';
import SequelizeStoreInit from 'connect-session-sequelize';

const env = process.env.NODE_ENV || 'development';
console.log(`Environment set to: ${env}`);

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
console.log("Sequelize initialized.");

const SequelizeStore = SequelizeStoreInit(session.Store);
console.log("SequelizeStore initialized.");

const sessionStore = new SequelizeStore({ db: sequelize });
sessionStore.sync().then(() => {
    console.log("Session store synced with database.");
}).catch(err => {
    console.error("Error syncing session store:", err);
});
                                                                                                
export default (app) => {
    const CORS_ORIGIN = process.env.NODE_ENV === "production" ? process.env.PROD_FRONTEND_URL : 'https://estorefrontend.vercel.app/';
    console.log(`CORS origin set to: ${CORS_ORIGIN}`);

    app.use(cors({
        origin: 'https://estorefrontend.vercel.app',
        credentials: true
    }));
    console.log("CORS settings applied.");

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(morgan('dev'));
    app.set('trust proxy', 1);
    app.use(cookieParser());
    console.log("Basic middleware set.");

    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            store: sessionStore,
            cookie: {
                secure: process.env.NODE_ENV === "production",
                maxAge: 24 * 60 * 60 * 1000 
            }
        })
    );
    console.log("Express session initialized.");

    app.use(flash());
    console.log("Flash middleware initialized.");

    return app;
}

export {sequelize};
