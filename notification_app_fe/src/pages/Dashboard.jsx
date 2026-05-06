import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Snackbar,
  Alert,
  Button,
  LinearProgress,
  alpha,
} from '@mui/material';
import {
  MarkEmailRead as MarkReadIcon,
  ArrowForward as ArrowIcon,
  Visibility as EyeIcon,
} from '@mui/icons-material';
import DashboardCards from '../components/DashboardCards';
import NotificationCard from '../components/NotificationCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import { useNotificationContext } from '../context/NotificationContext';
import { getNotificationType, getNotificationId } from '../utils/formatters';
import { logInfo } from '../services/logService';

export default function Dashboard() {
  const navigate = useNavigate();
  const {
    notifications,
    loading,
    error,
    loadNotifications,
    markAsViewed,
    isViewed,
    getUnviewedCount,
    retry,
  } = useNotificationContext();

  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  useEffect(() => {
    logInfo('page', 'Dashboard mounted - loading notifications');
    loadNotifications(1, 10);
  }, [loadNotifications]);

  const stats = useMemo(() => {
    const eventCount = notifications.filter(
      (n) => getNotificationType(n) === 'Event'
    ).length;
    const resultCount = notifications.filter(
      (n) => getNotificationType(n) === 'Result'
    ).length;
    const placementCount = notifications.filter(
      (n) => getNotificationType(n) === 'Placement'
    ).length;
    const unviewed = getUnviewedCount(notifications);

    return {
      total: notifications.length,
      event: eventCount,
      result: resultCount,
      placement: placementCount,
      unviewed,
      viewed: notifications.length - unviewed,
    };
  }, [notifications, getUnviewedCount]);

  const handleView = (id) => {
    markAsViewed(id);
    setSnackbar({ open: true, message: 'Notification marked as read' });
  };

  const handleMarkAllViewed = () => {
    notifications.forEach((n) => markAsViewed(getNotificationId(n)));
    setSnackbar({ open: true, message: 'All notifications marked as read' });
  };

  if (error) {
    return <ErrorState message={error} onRetry={retry} />;
  }

  const latestNotification = notifications.length > 0 ? notifications[0] : null;
  const recentNotifications = notifications.slice(1, 5); // 4 recent ones

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h1" sx={{ color: 'text.primary', fontWeight: 800, mb: 0.5 }}>
            Dashboard
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Overview of all your campus notifications.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<MarkReadIcon />}
            onClick={handleMarkAllViewed}
            sx={{
              color: 'text.primary',
              borderColor: 'divider',
              '&:hover': {
                borderColor: 'text.secondary',
                backgroundColor: alpha('#64748b', 0.05),
              },
            }}
          >
            Mark all viewed
          </Button>
          <Button
            variant="contained"
            endIcon={<ArrowIcon />}
            onClick={() => navigate('/notifications')}
          >
            View all
          </Button>
        </Box>
      </Box>

      {/* Stats row */}
      {loading ? (
        <LoadingSkeleton variant="dashboard" count={4} />
      ) : (
        <DashboardCards stats={stats} />
      )}

      {/* Middle Section: Unread + Latest */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', backgroundColor: 'background.paper' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <EyeIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                <Typography variant="subtitle1" sx={{ color: 'text.primary', fontWeight: 600 }}>
                  Unread
                </Typography>
              </Box>
              <Typography variant="h2" sx={{ color: 'text.primary', fontWeight: 800, mb: 0.5 }}>
                {stats.unviewed}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                of {stats.total} notifications
              </Typography>
              
              <LinearProgress 
                variant="determinate" 
                value={stats.total > 0 ? (stats.viewed / stats.total) * 100 : 0} 
                sx={{ 
                  height: 6, 
                  borderRadius: 3, 
                  backgroundColor: alpha('#64748b', 0.1),
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: 'primary.main'
                  }
                }} 
              />
              <Typography variant="caption" sx={{ display: 'block', mt: 1.5, color: 'text.secondary' }}>
                {stats.viewed} viewed
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1" sx={{ color: 'text.primary', fontWeight: 600 }}>
              Latest notification
            </Typography>
            <Button
              variant="text"
              endIcon={<ArrowIcon sx={{ fontSize: 16 }} />}
              onClick={() => navigate('/notifications')}
              sx={{ color: 'primary.main', fontSize: '0.8rem', p: 0, '&:hover': { background: 'transparent', textDecoration: 'underline' } }}
            >
              View all
            </Button>
          </Box>
          {loading ? (
            <LoadingSkeleton count={1} />
          ) : latestNotification ? (
            <NotificationCard
              notification={latestNotification}
              isViewed={isViewed(getNotificationId(latestNotification))}
              onView={handleView}
            />
          ) : (
            <EmptyState title="No notifications" message="You're all caught up!" />
          )}
        </Grid>
      </Grid>

      {/* Recent Activity */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="subtitle1" sx={{ color: 'text.primary', fontWeight: 600, mb: 2 }}>
          Recent activity
        </Typography>

        {loading ? (
          <LoadingSkeleton count={4} />
        ) : recentNotifications.length === 0 ? (
          <EmptyState
            title="No Recent Activity"
            message="No more notifications to display."
            onRefresh={() => loadNotifications(1, 10)}
          />
        ) : (
          <Grid container spacing={2}>
            {recentNotifications.map((notification) => (
              <Grid item xs={12} md={6} key={getNotificationId(notification)}>
                <NotificationCard
                  notification={notification}
                  isViewed={isViewed(getNotificationId(notification))}
                  onView={handleView}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() => setSnackbar({ open: false, message: '' })}
      >
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
