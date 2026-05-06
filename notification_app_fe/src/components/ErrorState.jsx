/**
 * ErrorState Component
 * 
 * Displays error messages with retry option.
 * Handles various error scenarios gracefully.
 */

import { Box, Typography, Button, alpha } from '@mui/material';
import {
  ErrorOutline as ErrorIcon,
  Refresh as RetryIcon,
  WifiOff as NetworkIcon,
} from '@mui/icons-material';

export default function ErrorState({
  message = 'Something went wrong',
  onRetry,
  isNetworkError = false,
}) {
  const Icon = isNetworkError ? NetworkIcon : ErrorIcon;

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
          backgroundColor: alpha('#ef4444', 0.1),
          mb: 3,
        }}
      >
        <Icon sx={{ fontSize: 40, color: '#f87171' }} />
      </Box>

      <Typography
        variant="h5"
        sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}
      >
        {isNetworkError ? 'Connection Lost' : 'Oops! Something Went Wrong'}
      </Typography>

      <Typography
        variant="body2"
        sx={{ color: 'text.secondary', mb: 3, maxWidth: 400 }}
      >
        {message}
      </Typography>

      {onRetry && (
        <Button
          variant="contained"
          startIcon={<RetryIcon />}
          onClick={onRetry}
          sx={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            '&:hover': {
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            },
          }}
        >
          Try Again
        </Button>
      )}
    </Box>
  );
}
