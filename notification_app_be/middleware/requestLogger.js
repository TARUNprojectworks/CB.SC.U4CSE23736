/**
 * Request Logger Middleware
 * 
 * Logs incoming HTTP requests with method, path, and response time.
 * Uses the centralized logging middleware.
 */

const { Log } = require('../../logging_middleware');

function requestLogger(req, res, next) {
  const start = Date.now();

  /* Log the incoming request */
  Log('backend', 'info', 'middleware', `→ ${req.method} ${req.originalUrl}`);

  /* Capture response finish to log duration */
  res.on('finish', () => {
    const duration = Date.now() - start;
    const level = res.statusCode >= 400 ? 'error' : 'info';
    Log('backend', level, 'middleware', `← ${req.method} ${req.originalUrl} [${res.statusCode}] ${duration}ms`);
  });

  next();
}

module.exports = requestLogger;
