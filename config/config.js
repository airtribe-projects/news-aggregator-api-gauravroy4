const dotenv = require('dotenv');

dotenv.config();

const useMongoDB = process.env.NODE_ENV === 'production'; // Use MongoDB in production, otherwise use in-memory database

['MONGO_URI', 'JWT_SECRET', 'NEWS_API_KEY'].forEach((key) => { // Ensure required environment variables are set
  if (!process.env[key]) {
    throw new Error(`${key} environment variable is required`);
  }
});

module.exports = {
    useMongoDB: useMongoDB,
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    MONGO_URI: process.env.MONGO_URI,
    NEWS_API_KEY: process.env.NEWS_API_KEY
};