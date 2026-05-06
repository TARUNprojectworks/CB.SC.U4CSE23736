/**
 * Logging Middleware - Centralized Logger Utility
 * 
 * Provides a reusable Log function that sends structured log entries
 * to the evaluation service's /logs endpoint.
 * 
 * Usage: Log(stack, level, pkg, message)
 */

const axios = require('axios');

/* ─── Valid value enums ─── */
const VALID_STACKS = ['frontend', 'backend'];
const VALID_LEVELS = ['debug', 'info', 'warn', 'error', 'fatal'];
const VALID_FRONTEND_PACKAGES = ['api', 'component', 'hook', 'page', 'state', 'style'];
const VALID_COMMON_PACKAGES = ['auth', 'config', 'middleware', 'utils'];
const VALID_PACKAGES = [...VALID_FRONTEND_PACKAGES, ...VALID_COMMON_PACKAGES];

/* ─── Configuration ─── */
let _baseUrl = '';
let _accessToken = '';
let _initialized = false;

/**
 * Initialize the logger with base URL and access token.
 * Must be called before using Log().
 */
function initLogger({ baseUrl, accessToken }) {
  _baseUrl = baseUrl;
  _accessToken = accessToken;
  _initialized = true;
}

/**
 * Validate log parameters against allowed values.
 */
function validateParams(stack, level, pkg) {
  const errors = [];
  if (!VALID_STACKS.includes(stack)) {
    errors.push(`Invalid stack "${stack}". Must be one of: ${VALID_STACKS.join(', ')}`);
  }
  if (!VALID_LEVELS.includes(level)) {
    errors.push(`Invalid level "${level}". Must be one of: ${VALID_LEVELS.join(', ')}`);
  }
  if (!VALID_PACKAGES.includes(pkg)) {
    errors.push(`Invalid package "${pkg}". Must be one of: ${VALID_PACKAGES.join(', ')}`);
  }
  return errors;
}

/**
 * Send a log entry to the evaluation service.
 * 
 * @param {string} stack    - 'frontend' | 'backend'
 * @param {string} level    - 'debug' | 'info' | 'warn' | 'error' | 'fatal'
 * @param {string} pkg      - Package identifier (e.g., 'api', 'component', 'middleware')
 * @param {string} message  - Human-readable log message
 * @returns {Promise<void>}
 */
async function Log(stack, level, pkg, message) {
  /* Graceful failure if logger is not initialized */
  if (!_initialized) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[Logger] Not initialized. Call initLogger() first.');
    }
    return;
  }

  /* Validate parameters */
  const validationErrors = validateParams(stack, level, pkg);
  if (validationErrors.length > 0) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[Logger] Validation errors:', validationErrors);
    }
    return;
  }

  /* Build the log payload */
  let validPackage = VALID_PACKAGES.includes(pkg) ? pkg : 'utils';
  if (stack === 'backend' && !['auth', 'config', 'middleware', 'utils'].includes(validPackage)) {
    validPackage = 'utils';
  }

  const payload = {
    stack,
    level: VALID_LEVELS.includes(level) ? level : 'info',
    package: validPackage,
    message: String(message).substring(0, 48),
    timestamp: new Date().toISOString(),
  };

  try {
    await axios.post(`${_baseUrl}/logs`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${_accessToken}`,
      },
      timeout: 5000,
    });
  } catch (error) {
    /* Graceful failure - never crash the app because of logging */
    if (process.env.NODE_ENV !== 'production') {
      const errDetail = error.response && error.response.data ? JSON.stringify(error.response.data) : error.message;
      console.warn(`[Logger] Failed to send log: ${errDetail}`);
    }
  }
}

module.exports = {
  Log,
  initLogger,
  VALID_STACKS,
  VALID_LEVELS,
  VALID_PACKAGES,
};
