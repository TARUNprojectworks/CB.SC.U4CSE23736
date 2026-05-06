/**
 * useNotifications Hook
 * 
 * Manages notification fetching, pagination, filtering, and loading states.
 * Provides a single interface for all notification data operations.
 */

import { useState, useCallback, useEffect } from 'react';
import {
  fetchNotifications,
  fetchPriorityNotifications,
  fetchFilteredNotifications,
} from '../api/notificationApi';
import { logInfo, logError } from '../services/logService';

/**
 * Extract notifications array from various response shapes.
 */
function extractData(responseData) {
  if (!responseData) return [];
  const data = responseData.data || responseData;
  if (Array.isArray(data)) return data;
  if (data.notifications && Array.isArray(data.notifications)) return data.notifications;
  if (data.data && Array.isArray(data.data)) return data.data;
  return [];
}

export default function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState('');

  /**
   * Fetch paginated notifications.
   */
  const loadNotifications = useCallback(async (pageNum = 1, pageLimit = 10) => {
    setLoading(true);
    setError(null);

    try {
      logInfo('hook', `Loading notifications: page=${pageNum}, limit=${pageLimit}`);
      const response = await fetchNotifications({ page: pageNum, limit: pageLimit });
      const data = extractData(response.data);

      setNotifications(data);
      setTotal(response.data?.total || data.length);
      setPage(pageNum);
      setLimit(pageLimit);

      logInfo('hook', `Loaded ${data.length} notifications`);
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to load notifications';
      setError(message);
      logError('hook', `Failed to load notifications: ${message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch priority notifications.
   */
  const loadPriorityNotifications = useCallback(async (count = 10) => {
    setLoading(true);
    setError(null);

    try {
      logInfo('hook', `Loading priority notifications: top=${count}`);
      const response = await fetchPriorityNotifications(count);
      const data = extractData(response.data);

      setNotifications(data);
      setTotal(data.length);

      logInfo('hook', `Loaded ${data.length} priority notifications`);
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to load priority notifications';
      setError(message);
      logError('hook', `Failed to load priority notifications: ${message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch filtered notifications.
   */
  const loadFilteredNotifications = useCallback(async (notificationType, pageNum = 1, pageLimit = 10) => {
    setLoading(true);
    setError(null);

    try {
      logInfo('hook', `Loading filtered notifications: type=${notificationType}`);
      const response = await fetchFilteredNotifications({
        notification_type: notificationType,
        page: pageNum,
        limit: pageLimit,
      });
      const data = extractData(response.data);

      setNotifications(data);
      setTotal(response.data?.total || data.length);
      setPage(pageNum);
      setLimit(pageLimit);
      setFilter(notificationType);

      logInfo('hook', `Loaded ${data.length} filtered notifications (${notificationType})`);
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to load filtered notifications';
      setError(message);
      logError('hook', `Failed to load filtered notifications: ${message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Change page.
   */
  const handlePageChange = useCallback((newPage) => {
    logInfo('hook', `Page changed to ${newPage}`);
    if (filter) {
      loadFilteredNotifications(filter, newPage, limit);
    } else {
      loadNotifications(newPage, limit);
    }
  }, [filter, limit, loadFilteredNotifications, loadNotifications]);

  /**
   * Change filter.
   */
  const handleFilterChange = useCallback((newFilter) => {
    logInfo('hook', `Filter changed to ${newFilter || 'all'}`);
    setFilter(newFilter);
    if (newFilter) {
      loadFilteredNotifications(newFilter, 1, limit);
    } else {
      loadNotifications(1, limit);
    }
  }, [limit, loadFilteredNotifications, loadNotifications]);

  /**
   * Retry last operation.
   */
  const retry = useCallback(() => {
    logInfo('hook', 'Retrying notification fetch');
    if (filter) {
      loadFilteredNotifications(filter, page, limit);
    } else {
      loadNotifications(page, limit);
    }
  }, [filter, page, limit, loadFilteredNotifications, loadNotifications]);

  return {
    notifications,
    loading,
    error,
    page,
    limit,
    total,
    filter,
    loadNotifications,
    loadPriorityNotifications,
    loadFilteredNotifications,
    handlePageChange,
    handleFilterChange,
    retry,
  };
}
