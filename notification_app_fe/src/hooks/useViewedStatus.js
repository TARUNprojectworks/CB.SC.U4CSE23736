/**
 * useViewedStatus Hook
 * 
 * Manages viewed/unviewed notification tracking using localStorage.
 * Provides persistent state across browser sessions.
 */

import { useState, useCallback, useEffect } from 'react';
import { STORAGE_KEYS } from '../constants';
import { logInfo } from '../services/logService';

const STORAGE_KEY = STORAGE_KEYS.VIEWED_NOTIFICATIONS;

/**
 * Load viewed IDs from localStorage.
 */
function loadViewedIds() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

/**
 * Save viewed IDs to localStorage.
 */
function saveViewedIds(ids) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    /* Graceful failure if localStorage is full */
  }
}

export default function useViewedStatus() {
  const [viewedIds, setViewedIds] = useState(loadViewedIds);

  /* Sync to localStorage whenever viewedIds changes */
  useEffect(() => {
    saveViewedIds(viewedIds);
  }, [viewedIds]);

  /**
   * Mark a notification as viewed.
   */
  const markAsViewed = useCallback((notificationId) => {
    if (!notificationId) return;

    setViewedIds((prev) => {
      if (prev.includes(String(notificationId))) return prev;
      logInfo('state', `Notification ${notificationId} marked as viewed`);
      return [...prev, String(notificationId)];
    });
  }, []);

  /**
   * Mark multiple notifications as viewed.
   */
  const markMultipleAsViewed = useCallback((ids) => {
    if (!ids || ids.length === 0) return;

    setViewedIds((prev) => {
      const newIds = ids.map(String).filter((id) => !prev.includes(id));
      if (newIds.length === 0) return prev;
      logInfo('state', `Marked ${newIds.length} notifications as viewed`);
      return [...prev, ...newIds];
    });
  }, []);

  /**
   * Check if a notification has been viewed.
   */
  const isViewed = useCallback(
    (notificationId) => viewedIds.includes(String(notificationId)),
    [viewedIds]
  );

  /**
   * Get count of unviewed notifications from a list.
   */
  const getUnviewedCount = useCallback(
    (notifications) => {
      if (!notifications) return 0;
      return notifications.filter(
        (n) => !viewedIds.includes(String(n.id || n.ID || n._id || n.notification_id))
      ).length;
    },
    [viewedIds]
  );

  /**
   * Clear all viewed status (reset).
   */
  const clearViewed = useCallback(() => {
    setViewedIds([]);
    logInfo('state', 'Cleared all viewed notifications');
  }, []);

  return {
    viewedIds,
    markAsViewed,
    markMultipleAsViewed,
    isViewed,
    getUnviewedCount,
    clearViewed,
  };
}
