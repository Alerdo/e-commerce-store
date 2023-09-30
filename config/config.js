// import dotenv from 'dotenv';
const dotenv = require('dotenv');

dotenv.config();

let databaseConfig;
if (process.env.PLATFORM_RELATIONSHIPS) {
    const relationships = JSON.parse(Buffer.from(process.env.PLATFORM_RELATIONSHIPS, 'base64').toString());
    databaseConfig = relationships.database[0];
}

const config = {
  development: {
    username: process.env.DEVELOPMENT_DB_USERNAME,
    password: process.env.DEVELOPMENT_DB_PASSWORD,
    database: process.env.DEVELOPMENT_DB_NAME,
    host: process.env.DEVELOPMENT_DB_HOST,
    dialect: process.env.DEVELOPMENT_DB_DIALECT
  },
  test: {
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
    host: process.env.TEST_DB_HOST,
    dialect: process.env.TEST_DB_DIALECT
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
}
};

module.exports = config;
