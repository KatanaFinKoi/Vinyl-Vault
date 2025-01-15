import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { AlbumFactory } from './albums.js';

// Use the Neon connection string
const dbUrl = process.env.DB_URL;
if (!dbUrl) {
  throw new Error('DB_URL is not defined in the environment variables');
}

const sequelize = new Sequelize(
  dbUrl,
  {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true, // Ensure SSL is used
        rejectUnauthorized: false, // Allow self-signed certificates
      },
    },
  }
);

// Define models
const User = UserFactory(sequelize);
const Album = AlbumFactory(sequelize);

// Set up model associations
User.hasMany(Album, { foreignKey: 'userId' });
Album.belongsTo(User, { foreignKey: 'userId' });

export { sequelize, User, Album };
