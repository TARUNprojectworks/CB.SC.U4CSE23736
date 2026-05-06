/**
 * Centralized Error Handler Middleware
 * 
 * Catches all unhandled errors and returns a consistent
 * JSON error response. Logs errors via the logging middleware.
 */

const { Log } = require('../../logging_middleware');

function errorHandler(err, req, res, _next) {
  /* Determine status code */
  const statusCode = err.statusCode || err.response?.status || 500;
  const message = err.message || 'Internal Server Error';

  /* Log the error */
  Log('backend', 'error', 'middleware', `[${statusCode}] ${req.method} ${req.path} - ${message}`);

  /* Handle Axios errors specifically */
  if (err.response) {
    return res.status(statusCode).json({
      success: false,
      error: 'External API Error',
      message: err.response.data?.message || message,
      statusCode,
    });
  }

  /* Handle network errors */
  if (err.code === 'ECONNREFUSED' || err.code === 'ETIMEDOUT') {
    return res.status(503).json({
      success: false,
      error: 'Service Unavailable',
      message: 'Unable to reach the notification service. Please try again later.',
      statusCode: 503,
    });
  }

  /* Generic error response */
  res.status(statusCode).json({
    success: false,
    error: statusCode === 500 ? 'Internal Server Error' : 'Request Failed',
    message,
    statusCode,
  });
}

module.exports = errorHandler;
