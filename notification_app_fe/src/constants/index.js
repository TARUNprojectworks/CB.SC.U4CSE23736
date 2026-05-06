/**
 * Application Constants
 * 
 * Centralized constants used across the frontend application.
 */

/* ─── Notification Types ─── */
export const NOTIFICATION_TYPES = {
  EVENT: 'Event',
  RESULT: 'Result',
  PLACEMENT: 'Placement',
};

export const NOTIFICATION_TYPE_LIST = ['Event', 'Result', 'Placement'];

/* ─── Priority Weights ─── */
export const PRIORITY_WEIGHTS = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

/* ─── Type Colors (MUI palette) ─── */
export const TYPE_COLORS = {
  Event: { bg: '#102a1d', text: '#34d399', chip: 'success' },
  Result: { bg: '#102a43', text: '#38bdf8', chip: 'info' },
  Placement: { bg: '#3d1f1f', text: '#f87171', chip: 'error' },
};

/* ─── Pagination ─── */
export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;
export const PAGE_SIZE_OPTIONS = [5, 10];

/* ─── LocalStorage Keys ─── */
export const STORAGE_KEYS = {
  VIEWED_NOTIFICATIONS: 'campus_notifications_viewed',
  THEME_MODE: 'campus_notifications_theme',
};

/* ─── Navigation Items ─── */
export const NAV_ITEMS = [
  { label: 'Dashboard', path: '/', icon: 'Dashboard' },
  { label: 'All Notifications', path: '/notifications', icon: 'Notifications' },
  { label: 'Priority Inbox', path: '/priority', icon: 'PriorityHigh' },
];

/* ─── Logging Constants ─── */
export const LOG_STACK = 'frontend';
export const LOG_LEVELS = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
  FATAL: 'fatal',
};
