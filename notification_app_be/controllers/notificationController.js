/**
 * Notification Controller
 * 
 * Handles HTTP request/response for notification endpoints.
 * Delegates business logic to the notification service.
 */

const notificationService = require('../services/notificationService');
const { Log } = require('../../logging_middleware');
const { config } = require('../config');

/**
 * GET /api/notifications
 * Fetch paginated notifications.
 */
async function getAllNotifications(req, res, next) {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || config.DEFAULT_PAGE);
    const limit = Math.min(
      Math.max(1, parseInt(req.query.limit, 10) || config.DEFAULT_LIMIT),
      config.MAX_LIMIT
    );

    Log('backend', 'info', 'middleware', `GET /api/notifications - page=${page}, limit=${limit}`);

    const data = await notificationService.fetchAllNotifications(page, limit);

    res.json({
      success: true,
      ...data,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/notifications/priority
 * Fetch top-N priority notifications.
 */
async function getPriorityNotifications(req, res, next) {
  try {
    const limit = Math.min(
      Math.max(1, parseInt(req.query.limit, 10) || config.DEFAULT_PRIORITY_COUNT),
      config.MAX_LIMIT
    );

    Log('backend', 'info', 'middleware', `GET /api/notifications/priority - top=${limit}`);

    const data = await notificationService.fetchPriorityNotifications(limit);

    res.json({
      success: true,
      ...data,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/notifications/filter
 * Fetch notifications filtered by type.
 */
async function getFilteredNotifications(req, res, next) {
  try {
    const { notification_type } = req.query;
    const page = Math.max(1, parseInt(req.query.page, 10) || config.DEFAULT_PAGE);
    const limit = Math.min(
      Math.max(1, parseInt(req.query.limit, 10) || config.DEFAULT_LIMIT),
      config.MAX_LIMIT
    );

    Log('backend', 'info', 'middleware', `GET /api/notifications/filter - type=${notification_type}`);

    const data = await notificationService.fetchFilteredNotifications(
      notification_type,
      page,
      limit
    );

    res.json({
      success: true,
      ...data,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllNotifications,
  getPriorityNotifications,
  getFilteredNotifications,
};
