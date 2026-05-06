import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
  alpha,
} from '@mui/material';
import {
  GridView as DashboardIcon,
  NotificationsNone as NotifIcon,
  EmojiEvents as PriorityIcon,
  AutoAwesome as StarIcon,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { NAV_ITEMS } from '../constants';
import { logInfo } from '../services/logService';

const DRAWER_WIDTH = 260;

const ICON_MAP = {
  Dashboard: DashboardIcon,
  Notifications: NotifIcon,
  PriorityHigh: PriorityIcon,
};

function DrawerContent({ totalCount = 64 }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (path, label) => {
    logInfo('component', `Navigated to ${label}`);
    navigate(path);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'background.paper' }}>
      {/* Branding */}
      <Box
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'primary.main',
          }}
        >
          <StarIcon sx={{ color: '#fff', fontSize: 20 }} />
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem', color: 'text.primary', lineHeight: 1.2 }}>
            NotifyHub
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
            Campus alerts
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Typography variant="caption" sx={{ color: 'text.secondary', px: 3, mb: 1, fontWeight: 600, textTransform: 'uppercase', fontSize: '0.65rem', letterSpacing: '0.05em' }}>
        Navigation
      </Typography>

      {/* Navigation */}
      <List sx={{ px: 2, flexGrow: 1 }}>
        {NAV_ITEMS.map(({ label, path, icon }) => {
          const isActive = location.pathname === path;
          const IconComp = ICON_MAP[icon] || DashboardIcon;

          return (
            <ListItem key={path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavClick(path, label)}
                sx={{
                  borderRadius: 2,
                  py: 1,
                  px: 1.5,
                  backgroundColor: isActive ? alpha('#3b82f6', 0.1) : 'transparent',
                  color: isActive ? 'primary.main' : 'text.secondary',
                  '&:hover': {
                    backgroundColor: alpha('#3b82f6', 0.05),
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 36,
                    color: isActive ? 'primary.main' : 'text.secondary',
                  }}
                >
                  <IconComp sx={{ fontSize: 20 }} />
                </ListItemIcon>
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.875rem',
                  }}
                />
                {label === 'All Notifications' && (
                  <Box
                    sx={{
                      backgroundColor: alpha('#3b82f6', 0.1),
                      color: 'primary.main',
                      px: 1,
                      py: 0.25,
                      borderRadius: 1,
                      fontSize: '0.7rem',
                      fontWeight: 700,
                    }}
                  >
                    {totalCount}
                  </Box>
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Footer */}
      <Box sx={{ p: 3 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
          v1.0 - Demo data
        </Typography>
      </Box>
    </Box>
  );
}

export default function Sidebar({ mobileOpen, onClose, totalCount }) {
  return (
    <Box
      component="nav"
      sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: DRAWER_WIDTH, borderRight: '1px solid', borderColor: 'divider' },
        }}
      >
        <DrawerContent totalCount={totalCount} />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { width: DRAWER_WIDTH, borderRight: '1px solid', borderColor: 'divider' },
        }}
        open
      >
        <DrawerContent totalCount={totalCount} />
      </Drawer>
    </Box>
  );
}
