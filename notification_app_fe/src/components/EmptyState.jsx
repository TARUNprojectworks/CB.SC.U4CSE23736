/**
 * EmptyState Component
 * 
 * Displays when no notifications are available.
 * Supports custom messages and action buttons.
 */

import { Box, Typography, Button, alpha } from '@mui/material';
import {
  NotificationsOff as EmptyIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';

export default function EmptyState({
  title = 'No Notifications',
  message = 'There are no notifications to display at this time.',
  onRefresh,
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        px: 3,
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: alpha('#6366f1', 0.1),
          mb: 3,
        }}
      >
        <EmptyIcon sx={{ fontSize: 40, color: '#818cf8' }} />
      </Box>

      <Typography
        variant="h5"
        sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}
      >
        {title}
      </Typography>

      <Typography
        variant="body2"
        sx={{ color: 'text.secondary', mb: 3, maxWidth: 400 }}
      >
        {message}
      </Typography>

      {onRefresh && (
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={onRefresh}
          sx={{
            borderColor: '#6366f1',
            color: '#818cf8',
            '&:hover': {
              borderColor: '#818cf8',
              backgroundColor: alpha('#6366f1', 0.1),
            },
          }}
        >
          Refresh
        </Button>
      )}
    </Box>
  );
}
