import { useEffect, useState } from 'react';
import { Box, Typography, Snackbar, Alert, alpha } from '@mui/material';
import { WorkspacePremium as CrownIcon } from '@mui/icons-material';
import NotificationCard from '../components/NotificationCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import { useNotificationContext } from '../context/NotificationContext';
import { getNotificationId } from '../utils/formatters';
import { logInfo } from '../services/logService';

export default function PriorityNotifications() {
  const {
    notifications: priorityNotifications,
    loading: loadingPriority,
    error,
    loadPriorityNotifications,
    markAsViewed,
    isViewed,
    retry,
  } = useNotificationContext();

  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  useEffect(() => {
    logInfo('page', 'PriorityNotifications page mounted');
    loadPriorityNotifications();
  }, [loadPriorityNotifications]);

  const handleView = (id) => {
    markAsViewed(id);
    setSnackbar({ open: true, message: 'Notification marked as read' });
  };

  if (error) {
    return <ErrorState message={error} onRetry={retry} />;
  }

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            backgroundColor: '#3f2c16',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CrownIcon sx={{ fontSize: 24, color: '#fbbf24' }} />
        </Box>
        <Box>
          <Typography variant="h1" sx={{ fontSize: '2rem', color: '#f8fafc', fontWeight: 700, mb: 0.5 }}>
            Priority Notifications
          </Typography>
          <Typography variant="body1" sx={{ color: '#94a3b8' }}>
            Top 10 highest-priority alerts. Placements highlighted.
          </Typography>
        </Box>
      </Box>

      {/* Content */}
      {loadingPriority ? (
        <LoadingSkeleton count={5} />
      ) : priorityNotifications.length === 0 ? (
        <EmptyState
          title="No Priority Notifications"
          message="There are no high priority notifications at this time."
          onRefresh={() => loadPriorityNotifications()}
        />
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {priorityNotifications.map((notification, index) => (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} key={getNotificationId(notification) || index}>
              {/* Rank Circle */}
              <Box
                sx={{
                  minWidth: 32,
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  backgroundColor: '#3b82f6',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                }}
              >
                {index + 1}
              </Box>
              
              <Box sx={{ flex: 1 }}>
                <NotificationCard
                  notification={notification}
                  isViewed={isViewed(getNotificationId(notification))}
                  onView={handleView}
                  showPriority={true}
                  index={index}
                />
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() => setSnackbar({ open: false, message: '' })}
      >
        <Alert
          onClose={() => setSnackbar({ open: false, message: '' })}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
