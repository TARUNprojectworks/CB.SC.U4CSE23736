import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Snackbar,
  Alert,
  Chip,
  alpha,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  Button,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import NotificationCard from '../components/NotificationCard';
import PaginationComponent from '../components/PaginationComponent';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import { useNotificationContext } from '../context/NotificationContext';
import { getNotificationId } from '../utils/formatters';
import { logInfo } from '../services/logService';

export default function AllNotifications() {
  const {
    notifications,
    loading,
    error,
    page,
    total,
    limit,
    filter,
    loadNotifications,
    handlePageChange,
    handleFilterChange,
    markAsViewed,
    isViewed,
    retry,
  } = useNotificationContext();

  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  useEffect(() => {
    logInfo('page', 'AllNotifications page mounted');
    loadNotifications(1, 8); // Assuming limit 8 for screenshot
  }, [loadNotifications]);

  const handleView = (id) => {
    markAsViewed(id);
    setSnackbar({ open: true, message: 'Notification marked as read' });
  };

  const FILTERS = ['All', 'Placement', 'Result', 'Event'];

  const showingStart = Math.min((page - 1) * limit + 1, total);
  const showingEnd = Math.min(page * limit, total);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h1" sx={{ color: 'text.primary', fontWeight: 800, mb: 0.5 }}>
          All Notifications
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Search, filter, and browse every notification.
        </Typography>
      </Box>

      {/* Controls Bar */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        <TextField
          placeholder="Search by company, message, title... (try 'Amazon')"
          variant="outlined"
          fullWidth
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary', fontSize: 18 }} />
              </InputAdornment>
            ),
          }}
          sx={{
            flex: 1,
            minWidth: 200,
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'background.paper',
              '& fieldset': { borderColor: 'divider' },
            },
          }}
        />
        
        <Select
          value="newest"
          size="small"
          sx={{
            backgroundColor: 'background.paper',
            minWidth: 140,
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'divider' },
          }}
        >
          <MenuItem value="newest">Newest first</MenuItem>
        </Select>

        <Select
          value={8}
          size="small"
          sx={{
            backgroundColor: 'background.paper',
            minWidth: 100,
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'divider' },
          }}
        >
          <MenuItem value={8}>8 / page</MenuItem>
        </Select>
      </Box>

      {/* Filter Chips */}
      <Box sx={{ display: 'flex', gap: 1, mb: 4, flexWrap: 'wrap' }}>
        {FILTERS.map((f) => {
          const isActive = filter === (f === 'All' ? '' : f);
          return (
            <Chip
              key={f}
              label={f}
              onClick={() => handleFilterChange(f === 'All' ? '' : f)}
              sx={{
                cursor: 'pointer',
                backgroundColor: isActive ? 'primary.main' : 'transparent',
                color: isActive ? 'primary.contrastText' : 'text.secondary',
                border: '1px solid',
                borderColor: isActive ? 'primary.main' : 'divider',
                '&:hover': {
                  backgroundColor: isActive ? 'primary.dark' : alpha('#64748b', 0.1),
                },
              }}
            />
          );
        })}
      </Box>

      <Typography variant="caption" sx={{ display: 'block', mb: 2, color: 'text.secondary', fontWeight: 500 }}>
        Showing {showingStart}-{showingEnd} of {total}
      </Typography>

      {/* Content Grid */}
      {error ? (
        <ErrorState message={error} onRetry={retry} />
      ) : loading ? (
        <LoadingSkeleton count={4} />
      ) : notifications.length === 0 ? (
        <EmptyState
          title={filter ? `No ${filter} Notifications` : 'No Notifications'}
          message="No notifications found. Try refreshing."
          onRefresh={() => loadNotifications(1, limit)}
        />
      ) : (
        <>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {notifications.map((notification) => (
              <Grid item xs={12} md={6} key={getNotificationId(notification)}>
                <NotificationCard
                  notification={notification}
                  isViewed={isViewed(getNotificationId(notification))}
                  onView={handleView}
                />
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, position: 'relative' }}>
            <PaginationComponent
              page={page}
              total={total}
              limit={limit}
              onPageChange={handlePageChange}
            />
            
            <Button
              variant="text"
              sx={{
                position: { xs: 'static', sm: 'absolute' },
                right: 0,
                bottom: -20,
                color: 'text.primary',
                textTransform: 'none',
                fontSize: '0.875rem',
                mt: { xs: 2, sm: 0 },
                '&:hover': { background: 'transparent', textDecoration: 'underline' }
              }}
              onClick={() => handleFilterChange('')}
            >
              Reset filters
            </Button>
          </Box>
        </>
      )}

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
