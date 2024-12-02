const forceDatabaseRefresh = false;

import dotenv from 'dotenv';
dotenv.config(); // Load environment variables

import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';

const app = express();

// Define PORT with a fallback to 3000
const PORT = parseInt(process.env.PORT || '3000', 10);

// Serve static files from the client's dist folder
app.use(express.static('../client/dist'));

// Middleware
app.use(express.json());
app.use(routes);

// Synchronize database and start server
sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to sync database:', err);
});
