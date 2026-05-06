/**
 * Utility Formatters
 * 
 * Reusable formatting functions for dates, text, and notification data.
 */

/**
 * Format an ISO timestamp to a human-readable relative time string.
 * e.g., "2 hours ago", "3 days ago"
 */
export function formatRelativeTime(timestamp) {
  if (!timestamp) return 'Unknown';

  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  if (diffDay < 30) return `${Math.floor(diffDay / 7)}w ago`;

  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Format an ISO timestamp to a readable date string.
 */
export function formatDate(timestamp) {
  if (!timestamp) return 'Unknown';

  return new Date(timestamp).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Truncate text to a maximum length with ellipsis.
 */
export function truncateText(text, maxLength = 120) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trimEnd() + '…';
}

/**
 * Get a notification's unique identifier.
 * Handles various API response shapes.
 */
export function getNotificationId(notification) {
  return notification.id || notification.ID || notification._id || notification.notification_id || '';
}

/**
 * Get notification type with fallback.
 */
export function getNotificationType(notification) {
  return notification.type || notification.Type || notification.notification_type || 'Event';
}

/**
 * Get notification message with fallback.
 */
export function getNotificationMessage(notification) {
  return notification.message || notification.Message || notification.content || notification.body || notification.description || 'No content available';
}

/**
 * Get notification timestamp with fallback.
 */
export function getNotificationTimestamp(notification) {
  return notification.timestamp || notification.Timestamp || notification.created_at || notification.date || notification.createdAt || '';
}

/**
 * Get notification title with fallback.
 */
export function getNotificationTitle(notification) {
  return notification.title || notification.Title || notification.subject || notification.heading || getNotificationType(notification) + ' Notification';
}
