import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Chip,
  Box,
  alpha,
} from '@mui/material';
import {
  CalendarToday as EventIcon,
  School as ResultIcon,
  BusinessCenter as PlacementIcon,
  WorkspacePremium as HighPriorityIcon,
} from '@mui/icons-material';
import { TYPE_COLORS, PRIORITY_WEIGHTS } from '../constants';
import {
  formatRelativeTime,
  getNotificationType,
  getNotificationMessage,
  getNotificationTimestamp,
  getNotificationTitle,
  getNotificationId,
  truncateText,
} from '../utils/formatters';

const TYPE_ICONS = {
  Event: EventIcon,
  Result: ResultIcon,
  Placement: PlacementIcon,
};

export default function NotificationCard({
  notification,
  isViewed = false,
  onView,
  showPriority = false,
  index,
}) {
  const type = getNotificationType(notification);
  const message = getNotificationMessage(notification);
  const timestamp = getNotificationTimestamp(notification);
  const title = getNotificationTitle(notification);
  const id = getNotificationId(notification);
  const colors = TYPE_COLORS[type] || TYPE_COLORS.Event;
  const IconComponent = TYPE_ICONS[type] || EventIcon;

  // Emulate Priority scores for demo/UI mapping
  const displayScore = type === 'Placement' ? (index !== undefined ? 10 : 7) : type === 'Result' ? 5 : 2;

  const handleClick = () => {
    if (onView && id) {
      onView(id);
    }
  };

  return (
    <Card
      sx={{
        position: 'relative',
        overflow: 'visible',
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        transition: 'all 0.2s',
        '&:hover': {
          borderColor: alpha(colors.text, 0.4),
          backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.8),
        },
        display: 'flex',
        alignItems: 'stretch',
      }}
    >
      {/* Colored Left Border */}
      <Box
        sx={{
          width: 4,
          backgroundColor: colors.text,
          borderTopLeftRadius: 12,
          borderBottomLeftRadius: 12,
        }}
      />
      
      <CardActionArea onClick={handleClick} sx={{ display: 'flex', alignItems: 'stretch', flex: 1, p: 0 }}>
        <CardContent sx={{ p: '16px 20px', width: '100%', display: 'flex', gap: 2, position: 'relative' }}>
          
          {/* Left Side Icon Box */}
          <Box
            sx={{
              width: 44,
              height: 44,
              minWidth: 44,
              borderRadius: 2,
              border: `1px solid ${alpha(colors.text, 0.2)}`,
              backgroundColor: alpha(colors.text, 0.05),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mt: 0.5,
            }}
          >
            <IconComponent sx={{ fontSize: 20, color: colors.text }} />
          </Box>

          {/* Right Side Content */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pr: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: 'text.primary',
                }}
              >
                {title}
              </Typography>
              
              <Chip
                label={type}
                size="small"
                sx={{
                  backgroundColor: alpha(colors.text, 0.1),
                  color: colors.text,
                  fontWeight: 500,
                  fontSize: '0.7rem',
                  height: 20,
                }}
              />
              
              {showPriority && type === 'Placement' && (
                <Chip
                  icon={<HighPriorityIcon sx={{ fontSize: 12 }} />}
                  label="High Priority"
                  size="small"
                  sx={{
                    backgroundColor: alpha('#fbbf24', 0.1),
                    color: '#fbbf24',
                    fontWeight: 600,
                    fontSize: '0.7rem',
                    height: 20,
                    '& .MuiChip-icon': { color: '#fbbf24' },
                  }}
                />
              )}
            </Box>

            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                lineHeight: 1.5,
                fontSize: '0.875rem',
                mb: 1,
              }}
            >
              {truncateText(message, 180)}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {formatRelativeTime(timestamp)}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                Priority {displayScore}/10
              </Typography>
            </Box>
          </Box>

          {/* Unread Dot */}
          {!isViewed && (
            <Box
              sx={{
                position: 'absolute',
                top: 20,
                right: 20,
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: 'primary.main',
              }}
            />
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
