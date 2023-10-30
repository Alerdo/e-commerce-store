import express from 'express';
import loaders from './setup/index.js';
import dotenv from 'dotenv';

dotenv.config(); // It's good to initialize dotenv at the top

const PORT = process.env.PORT || 3001;

const app = express();

const startServer = async () => {
  try {
    loaders(app);

    app.listen(PORT, () => {
      console.log(`Server listening on PORT ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1); // Exit with a failure mode
  }
};

startServer();
