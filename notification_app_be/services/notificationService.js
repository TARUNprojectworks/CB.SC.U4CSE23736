/**
 * Notification Service
 * 
 * Business logic layer for notification operations.
 * Handles fetching from external API, priority sorting, and filtering.
 */

const apiClient = require('../utils/apiClient');
const { getSortedByPriority, getTopN } = require('../utils/prioritySort');
const { Log } = require('../../logging_middleware');
const { config } = require('../config');

/**
 * Extract notifications array from various API response structures.
 * Handles different possible response shapes gracefully.
 */
function extractNotifications(data) {
  if (Array.isArray(data)) return data;
  if (data?.notifications && Array.isArray(data.notifications)) return data.notifications;
  if (data?.data && Array.isArray(data.data)) return data.data;
  return [];
}

/**
 * Fetch all notifications with pagination.
 * 
 * @param {number} page  - Page number (1-indexed)
 * @param {number} limit - Items per page
 * @returns {Promise<Object>} { notifications, page, limit, total }
 */
async function fetchAllNotifications(page = 1, limit = 10) {
  try {
    Log('backend', 'info', 'middleware', `Fetching notifications: page=${page}, limit=${limit}`);

    const response = await apiClient.get('/notifications', {
      params: { page, limit },
    });

    const notifications = extractNotifications(response.data);
    Log('backend', 'info', 'middleware', `Fetched ${notifications.length} notifications`);

    return {
      notifications,
      page,
      limit,
      total: response.data?.total || notifications.length,
    };
  } catch (error) {
    Log('backend', 'error', 'middleware', `Failed to fetch notifications: ${error.message}`);
    throw error;
  }
}

/**
 * Fetch and return top-N priority notifications.
 * Fetches ALL notifications first, then applies priority sorting.
 * 
 * @param {number} topN - Number of top priority items (default: 10)
 * @returns {Promise<Object>} { notifications, count }
 */
async function fetchPriorityNotifications(topN = 10) {
  try {
    Log('backend', 'info', 'middleware', `Fetching priority notifications: top=${topN}`);

    /* Fetch a large batch to ensure we have enough for priority ranking */
    const response = await apiClient.get('/notifications', {
      params: { limit: 10 },
    });

    const allNotifications = extractNotifications(response.data);
    const prioritized = getTopN(allNotifications, topN);

    Log('backend', 'info', 'middleware', `Returned ${prioritized.length} priority notifications`);

    return {
      notifications: prioritized,
      count: prioritized.length,
      totalAvailable: allNotifications.length,
    };
  } catch (error) {
    Log('backend', 'error', 'middleware', `Failed to fetch priority notifications: ${error.message}`);
    throw error;
  }
}

/**
 * Fetch notifications filtered by type.
 * 
 * @param {string} notificationType - 'Event' | 'Result' | 'Placement'
 * @param {number} page
 * @param {number} limit
 * @returns {Promise<Object>}
 */
async function fetchFilteredNotifications(notificationType, page = 1, limit = 10) {
  try {
    Log('backend', 'info', 'middleware', `Fetching filtered notifications: type=${notificationType}`);

    const params = { page, limit };
    if (notificationType) {
      params.notification_type = notificationType;
    }

    const response = await apiClient.get('/notifications', { params });
    const notifications = extractNotifications(response.data);

    Log('backend', 'info', 'middleware', `Fetched ${notifications.length} filtered notifications`);

    return {
      notifications,
      page,
      limit,
      total: response.data?.total || notifications.length,
      filter: notificationType || 'all',
    };
  } catch (error) {
    Log('backend', 'error', 'middleware', `Failed to fetch filtered notifications: ${error.message}`);
    throw error;
  }
}

module.exports = {
  fetchAllNotifications,
  fetchPriorityNotifications,
  fetchFilteredNotifications,
};
