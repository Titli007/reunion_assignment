import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const databaseUrl = process.env.DATABASE_URL || 'postgresql://postgres:root@127.0.0.1:5432/reunion_db';

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  logging: false,
});


export default sequelize;
