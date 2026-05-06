/**
 * Authentication Middleware
 * 
 * Attaches Bearer token to outbound requests and validates
 * incoming request authentication headers.
 */

const { config } = require('../config');
const { Log } = require('../../logging_middleware');

/**
 * Middleware that verifies the presence of an authorization header.
 * In production, this would validate JWT tokens.
 */
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    Log('backend', 'warn', 'auth', `Unauthorized request to ${req.path}`);
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
      message: 'Missing or invalid authorization header',
    });
  }

  req.token = authHeader.split(' ')[1];
  next();
}

/**
 * Returns auth headers object for outbound API requests.
 */
function getAuthHeaders() {
  return {
    Authorization: `Bearer ${config.ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  };
}

module.exports = { authMiddleware, getAuthHeaders };
