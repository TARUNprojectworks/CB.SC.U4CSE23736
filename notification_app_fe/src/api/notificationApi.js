/**
 * Notification API
 * 
 * Reusable API layer for all notification-related endpoints.
 * All functions return Promise<AxiosResponse>.
 */

import axiosInstance from './axiosInstance';

/**
 * Fetch paginated notifications.
 * @param {Object} params - { page, limit }
 */
export function fetchNotifications({ page = 1, limit = 10 } = {}) {
  return axiosInstance.get('/notifications', {
    params: { page, limit },
  });
}

/**
 * Fetch top-N priority notifications.
 * @param {number} limit - Number of priority items (default: 10)
 */
export function fetchPriorityNotifications(limit = 10) {
  return axiosInstance.get('/notifications/priority', {
    params: { limit },
  });
}

/**
 * Fetch notifications filtered by type.
 * @param {Object} params - { notification_type, page, limit }
 */
export function fetchFilteredNotifications({ notification_type, page = 1, limit = 10 } = {}) {
  return axiosInstance.get('/notifications/filter', {
    params: { notification_type, page, limit },
  });
}

/**
 * Convenience: fetch all notifications (larger batch for dashboard stats).
 */
export function fetchAllForStats() {
  return axiosInstance.get('/notifications', {
    params: { page: 1, limit: 10 },
  });
}
