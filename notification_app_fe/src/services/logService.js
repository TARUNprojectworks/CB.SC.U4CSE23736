/**
 * Frontend Log Service
 * 
 * Async logger that sends structured log entries to the
 * evaluation service's /logs endpoint. Designed for graceful
 * failure — logging errors never crash the application.
 */

import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

/* ─── Valid values ─── */
const VALID_LEVELS = ['debug', 'info', 'warn', 'error', 'fatal'];
const VALID_PACKAGES = ['api', 'component', 'hook', 'page', 'state', 'style', 'auth', 'config', 'middleware', 'utils'];

/* ─── Dedicated axios instance for logging (avoids circular deps) ─── */
const logClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

/**
 * Send a log entry to the evaluation service.
 * 
 * @param {string} level   - Log level
 * @param {string} pkg     - Package/module identifier
 * @param {string} message - Human-readable log message
 */
export async function logMessage(level, pkg, message) {
  /* Validate inputs */
  if (!VALID_LEVELS.includes(level) || !VALID_PACKAGES.includes(pkg)) {
    return;
  }

  try {
    await logClient.post('/logs', {
      stack: 'frontend',
      level,
      package: pkg,
      message: String(message).substring(0, 48),
      timestamp: new Date().toISOString(),
    });
  } catch {
    /* Graceful failure — never crash the app because of logging */
  }
}

/* ─── Convenience shortcuts ─── */
export const logDebug = (pkg, msg) => logMessage('debug', pkg, msg);
export const logInfo = (pkg, msg) => logMessage('info', pkg, msg);
export const logWarn = (pkg, msg) => logMessage('warn', pkg, msg);
export const logError = (pkg, msg) => logMessage('error', pkg, msg);
export const logFatal = (pkg, msg) => logMessage('fatal', pkg, msg);
