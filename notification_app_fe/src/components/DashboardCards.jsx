import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import {
  Notifications as AllIcon,
  CalendarToday as EventIcon,
  School as ResultIcon,
  BusinessCenter as PlacementIcon,
} from '@mui/icons-material';

const STAT_CARDS = [
  {
    key: 'total',
    label: 'TOTAL',
    icon: AllIcon,
    bgColor: (theme) => (theme.palette.mode === 'dark' ? '#1e3a8a' : '#dbeafe'),
    iconColor: (theme) => (theme.palette.mode === 'dark' ? '#60a5fa' : '#3b82f6'),
  },
  {
    key: 'placement',
    label: 'PLACEMENTS',
    icon: PlacementIcon,
    bgColor: (theme) => (theme.palette.mode === 'dark' ? '#3f1f23' : '#fee2e2'),
    iconColor: (theme) => (theme.palette.mode === 'dark' ? '#f87171' : '#ef4444'),
  },
  {
    key: 'result',
    label: 'RESULTS',
    icon: ResultIcon,
    bgColor: (theme) => (theme.palette.mode === 'dark' ? '#0f3c4c' : '#e0f2fe'),
    iconColor: (theme) => (theme.palette.mode === 'dark' ? '#38bdf8' : '#0284c7'),
  },
  {
    key: 'event',
    label: 'EVENTS',
    icon: EventIcon,
    bgColor: (theme) => (theme.palette.mode === 'dark' ? '#103820' : '#dcfce7'),
    iconColor: (theme) => (theme.palette.mode === 'dark' ? '#34d399' : '#059669'),
  },
];

export default function DashboardCards({ stats = {} }) {
  return (
    <Grid container spacing={2}>
      {STAT_CARDS.map(({ key, label, icon: IconComp, bgColor, iconColor }) => (
        <Grid item xs={12} sm={6} md={3} key={key}>
          <Card
            sx={{
              backgroundColor: 'background.paper',
              borderRadius: 3,
              boxShadow: 'none',
              height: '100%',
            }}
          >
            <CardContent sx={{ p: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                  }}
                >
                  {label}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: 'text.primary',
                    mt: 1,
                  }}
                >
                  {stats[key] ?? 0}
                </Typography>
              </Box>

              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: bgColor,
                }}
              >
                <IconComp sx={{ color: iconColor }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
