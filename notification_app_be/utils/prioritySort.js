/**
 * Priority Sort Utility
 * 
 * Implements the priority inbox algorithm for campus notifications.
 * 
 * Priority Rules:
 *   Placement > Result > Event
 * 
 * Weights:
 *   Placement = 3
 *   Result    = 2
 *   Event     = 1
 * 
 * Sorting Order:
 *   1. Weight (descending)
 *   2. Timestamp (descending / most recent first)
 * 
 * ─── Complexity Analysis ─── 
 * 
 * getSortedByPriority():
 *   Time:  O(N log N) — uses JavaScript's built-in Timsort via Array.sort()
 *   Space: O(N)       — creates a shallow copy of the array before sorting
 * 
 * getTopN():
 *   Approach: Sort-then-slice
 *   Time:  O(N log N) for sorting + O(n) for slicing = O(N log N)
 *   Space: O(N) for the sorted copy
 * 
 *   Alternative (selection-based, implemented as getTopNSelection):
 *   Time:  O(n × N) where n = desired count, N = total notifications
 *   Space: O(n) for the result array
 *   Better when n << N (e.g., top 10 out of 10,000)
 * 
 * For typical campus notification volumes (< 1000), both approaches
 * perform well. The sort-then-slice method is used by default for
 * simplicity and readability.
 */

/* ─── Weight Map ─── */
const PRIORITY_WEIGHTS = Object.freeze({
  Placement: 3,
  Result: 2,
  Event: 1,
});

/**
 * Get the priority weight for a notification based on its type.
 * Returns 0 for unknown types.
 * 
 * @param {Object} notification
 * @returns {number}
 */
function getWeight(notification) {
  const type = notification.type || notification.Type || notification.notification_type || '';
  return PRIORITY_WEIGHTS[type] || 0;
}

/**
 * Comparator function for sorting notifications by priority.
 * Higher weight first, then more recent timestamp first.
 * 
 * @param {Object} a - First notification
 * @param {Object} b - Second notification
 * @returns {number}  - Negative if a should come first, positive if b should
 */
function priorityComparator(a, b) {
  const weightDiff = getWeight(b) - getWeight(a);
  if (weightDiff !== 0) return weightDiff;

  /* Secondary sort: timestamp descending (most recent first) */
  const timeA = new Date(a.timestamp || a.Timestamp || a.created_at || a.date || 0).getTime();
  const timeB = new Date(b.timestamp || b.Timestamp || b.created_at || b.date || 0).getTime();
  return timeB - timeA;
}

/**
 * Sort all notifications by priority.
 * Creates a new array (does not mutate the original).
 * 
 * @param {Array} notifications
 * @returns {Array} Sorted copy
 */
function getSortedByPriority(notifications) {
  if (!Array.isArray(notifications)) return [];
  return [...notifications].sort(priorityComparator);
}

/**
 * Get the top N notifications by priority using sort-then-slice.
 * Default N = 10.
 * 
 * @param {Array}  notifications
 * @param {number} n - Number of top notifications to return
 * @returns {Array}
 */
function getTopN(notifications, n = 10) {
  const sorted = getSortedByPriority(notifications);
  return sorted.slice(0, n);
}

/**
 * Alternative: Get top N using selection approach.
 * More efficient when n << N.
 * 
 * Time:  O(n × N)
 * Space: O(n)
 * 
 * @param {Array}  notifications
 * @param {number} n
 * @returns {Array}
 */
function getTopNSelection(notifications, n = 10) {
  if (!Array.isArray(notifications) || notifications.length === 0) return [];

  const count = Math.min(n, notifications.length);
  const result = [];
  const used = new Set();

  for (let i = 0; i < count; i++) {
    let bestIdx = -1;

    for (let j = 0; j < notifications.length; j++) {
      if (used.has(j)) continue;
      if (bestIdx === -1 || priorityComparator(notifications[j], notifications[bestIdx]) < 0) {
        bestIdx = j;
      }
    }

    if (bestIdx !== -1) {
      result.push(notifications[bestIdx]);
      used.add(bestIdx);
    }
  }

  return result;
}

module.exports = {
  PRIORITY_WEIGHTS,
  getWeight,
  priorityComparator,
  getSortedByPriority,
  getTopN,
  getTopNSelection,
};
