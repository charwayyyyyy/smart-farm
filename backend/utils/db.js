const { Sequelize } = require('sequelize');
require('dotenv').config();

// Check if database configuration exists
const hasDbConfig = process.env.DB_NAME && process.env.DB_USER && process.env.DB_HOST;

let sequelize;
if (!hasDbConfig) {
  console.log('Warning: Database configuration missing. Using SQLite in-memory database for development.');
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 5432,
      dialect: 'postgres',
      logging: process.env.NODE_ENV === 'development' ? console.log : false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  );
}

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    // Sync models with database (in development only)
    if (process.env.NODE_ENV === 'development' || !hasDbConfig) {
      await sequelize.sync({ alter: true });
      console.log('Database models synchronized.');
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
    console.log('Continuing without database connection...');
  }
};

module.exports = { sequelize, connectDB };