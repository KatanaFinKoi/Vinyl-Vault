import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { AlbumFactory } from './albums.js';

// Use the Neon connection string
const sequelize = new Sequelize(
  process.env.DB_URL || 'postgresql://vinyl-vault-db_owner:xDtXH3oTNhv8@ep-weathered-bush-a5wr0ab6.us-east-2.aws.neon.tech/vinyl-vault-db?sslmode=require',
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
