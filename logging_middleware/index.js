/**
 * Logging Middleware - Public API
 * 
 * Re-exports the Log function and initialization utilities
 * for use in both backend and frontend applications.
 */

const { Log, initLogger, VALID_STACKS, VALID_LEVELS, VALID_PACKAGES } = require('./logger');

module.exports = {
  Log,
  initLogger,
  VALID_STACKS,
  VALID_LEVELS,
  VALID_PACKAGES,
};
