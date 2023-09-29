import dotenv from 'dotenv';

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
    username: databaseConfig ? databaseConfig.username : process.env.PRODUCTION_DB_USERNAME,
    password: databaseConfig ? databaseConfig.password : process.env.PRODUCTION_DB_PASSWORD,
    database: databaseConfig ? databaseConfig.path : process.env.PRODUCTION_DB_NAME,
    host: databaseConfig ? databaseConfig.host : process.env.PRODUCTION_DB_HOST,
    dialect: 'postgres', // Assuming it's always PostgreSQL for production on Platform.sh
    port: databaseConfig ? databaseConfig.port : undefined
  }
};

export default config;
