import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { AlbumFactory } from './albums.js'

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

const User = UserFactory(sequelize);
const Album = AlbumFactory(sequelize)

User.hasMany(Album, { foreignKey: 'userId' });
Album.belongsTo(User, { foreignKey: 'userId' });


export { sequelize, User, Album };
