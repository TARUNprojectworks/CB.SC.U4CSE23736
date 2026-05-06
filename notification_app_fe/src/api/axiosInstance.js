/**
 * Axios Instance - Centralized HTTP Client
 * 
 * Pre-configured Axios instance with auth interceptors,
 * error handling, and request/response logging.
 */

import axios from 'axios';
import { logMessage } from '../services/logService';

/* Use Vite proxy for API calls (proxied to backend) */
const API_BASE_URL = '/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* ─── Request Interceptor ─── */
axiosInstance.interceptors.request.use(
  (config) => {
    logMessage('info', 'api', `Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    logMessage('error', 'api', `Request error: ${error.message}`);
    return Promise.reject(error);
  }
);

/* ─── Response Interceptor ─── */
axiosInstance.interceptors.response.use(
  (response) => {
    logMessage('info', 'api', `Response: ${response.status} from ${response.config.url}`);
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    if (status === 401) {
      logMessage('error', 'auth', 'Authentication failed - invalid or expired token');
    } else if (status === 403) {
      logMessage('error', 'auth', 'Access forbidden');
    } else if (status >= 500) {
      logMessage('error', 'api', `Server error [${status}]: ${message}`);
    } else if (!error.response) {
      logMessage('error', 'api', `Network error: ${message}`);
    } else {
      logMessage('warn', 'api', `API error [${status}]: ${message}`);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
