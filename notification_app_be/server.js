/**
 * Express Server - Campus Notifications Microservice
 * 
 * Entry point for the backend application.
 * Configures middleware, routes, and error handling.
 */

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { config, validateConfig } = require('./config');
const { initLogger, Log } = require('../logging_middleware');
const notificationRoutes = require('./routes/notificationRoutes');
const requestLogger = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');

/* ─── Validate environment ─── */
validateConfig();

/* ─── Initialize logging middleware ─── */
initLogger({
  baseUrl: config.BASE_URL,
  accessToken: config.ACCESS_TOKEN,
});

/* ─── Create Express app ─── */
const app = express();

/* ─── Global Middleware ─── */
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(requestLogger);

/* ─── Health Check ─── */
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Campus Notifications API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

/* ─── API Routes ─── */
app.use('/api/notifications', notificationRoutes);

/* ─── 404 Handler ─── */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`,
  });
});

/* ─── Centralized Error Handler ─── */
app.use(errorHandler);

/* ─── Start Server ─── */
app.listen(config.PORT, () => {
  Log('backend', 'info', 'config', `Server started on port ${config.PORT}`);
  console.log(`\n🚀 Campus Notifications API`);
  console.log(`   Environment: ${config.NODE_ENV}`);
  console.log(`   Port:        ${config.PORT}`);
  console.log(`   Base URL:    ${config.BASE_URL}`);
  console.log(`   Health:      http://localhost:${config.PORT}/api/health\n`);
});

module.exports = app;
