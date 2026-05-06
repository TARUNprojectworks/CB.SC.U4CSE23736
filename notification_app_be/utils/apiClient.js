/**
 * API Client - Axios Instance for External API
 * 
 * Pre-configured Axios instance with base URL, auth headers,
 * request/response interceptors, and timeout settings.
 */

const axios = require('axios');
const { config } = require('../config');
const { Log } = require('../../logging_middleware');

const apiClient = axios.create({
  baseURL: config.BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* ─── Request Interceptor ─── */
apiClient.interceptors.request.use(
  (reqConfig) => {
    reqConfig.headers.Authorization = `Bearer ${config.ACCESS_TOKEN}`;
    Log('backend', 'debug', 'utils', `API Request: ${reqConfig.method?.toUpperCase()} ${reqConfig.baseURL}${reqConfig.url}`);
    return reqConfig;
  },
  (error) => {
    Log('backend', 'error', 'utils', `API Request Error: ${error.message}`);
    return Promise.reject(error);
  }
);

/* ─── Response Interceptor ─── */
apiClient.interceptors.response.use(
  (response) => {
    Log('backend', 'debug', 'utils', `API Response: ${response.status} from ${response.config.url}`);
    return response;
  },
  (error) => {
    const status = error.response?.status || 'NETWORK_ERROR';
    const message = error.response?.data?.message || error.message;
    Log('backend', 'error', 'utils', `API Error [${status}]: ${message}`);
    return Promise.reject(error);
  }
);

module.exports = apiClient;
