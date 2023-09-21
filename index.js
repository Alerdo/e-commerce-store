import express from 'express';
import loaders from './setup/index.js';

import dotenv from 'dotenv';


const PORT = 3000;

const app = express();

//For env sensitive info
dotenv.config();

const startServer = async () => {
  // Init application loaders
  loaders(app);

  // Start server
  app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
  });
};

startServer();
