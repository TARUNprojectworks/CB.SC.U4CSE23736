/**
 * LoadingSkeleton Component
 * 
 * Skeleton loader for notification cards and dashboard elements.
 * Provides visual loading state feedback.
 */

import { Card, CardContent, Skeleton, Box, Grid } from '@mui/material';

function NotificationCardSkeleton() {
  return (
    <Card sx={{ borderLeft: '4px solid rgba(148, 163, 184, 0.15)' }}>
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
          <Skeleton variant="rounded" width={80} height={28} />
          <Skeleton variant="text" width={60} />
        </Box>
        <Skeleton variant="text" width="70%" height={24} sx={{ mb: 0.5 }} />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="85%" />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1.5 }}>
          <Skeleton variant="text" width={50} />
        </Box>
      </CardContent>
    </Card>
  );
}

function DashboardCardSkeleton() {
  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Skeleton variant="circular" width={48} height={48} sx={{ mb: 2 }} />
        <Skeleton variant="text" width="60%" height={20} />
        <Skeleton variant="text" width="40%" height={36} sx={{ mt: 1 }} />
      </CardContent>
    </Card>
  );
}

export default function LoadingSkeleton({ variant = 'notifications', count = 4 }) {
  if (variant === 'dashboard') {
    return (
      <Grid container spacing={3}>
        {Array.from({ length: count }).map((_, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <DashboardCardSkeleton />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {Array.from({ length: count }).map((_, i) => (
        <NotificationCardSkeleton key={i} />
      ))}
    </Box>
  );
}
