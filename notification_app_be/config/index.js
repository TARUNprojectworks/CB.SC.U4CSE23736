/**
 * Application Configuration
 * 
 * Centralizes all environment variables and application constants.
 * Validates required environment variables on startup.
 */

require('dotenv').config();

const config = {
  /* Server */
  PORT: parseInt(process.env.PORT, 10) || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',

  /* API Credentials */
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,

  /* External API */
  BASE_URL: process.env.BASE_URL,

  /* Pagination Defaults */
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 10,

  /* Priority Defaults */
  DEFAULT_PRIORITY_COUNT: 10,
};

/**
 * Validate that all required environment variables are set.
 * Throws an error if any are missing.
 */
function validateConfig() {
  const required = ['CLIENT_ID', 'CLIENT_SECRET', 'ACCESS_TOKEN', 'BASE_URL'];
  const missing = required.filter((key) => !config[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

module.exports = { config, validateConfig };
