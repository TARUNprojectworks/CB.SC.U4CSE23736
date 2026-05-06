/**
 * Notification Routes
 * 
 * Defines all notification-related API endpoints.
 * Maps HTTP methods and paths to controller functions.
 */

const express = require('express');
const router = express.Router();
const {
  getAllNotifications,
  getPriorityNotifications,
  getFilteredNotifications,
} = require('../controllers/notificationController');

/* GET /api/notifications - Paginated notification list */
router.get('/', getAllNotifications);

/* GET /api/notifications/priority - Top-N priority notifications */
router.get('/priority', getPriorityNotifications);

/* GET /api/notifications/filter - Filtered notifications by type */
router.get('/filter', getFilteredNotifications);

module.exports = router;
