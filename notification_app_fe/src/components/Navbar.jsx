import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Chip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Wifi as WifiIcon,
  LightMode as SunIcon,
  DarkMode as MoonIcon,
  ViewSidebar as SidebarIcon,
} from '@mui/icons-material';
import { useAppTheme } from '../context/ThemeContext';

const DRAWER_WIDTH = 260;

export default function Navbar({ onToggleDrawer }) {
  const { mode, toggleMode } = useAppTheme();

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
        ml: { md: `${DRAWER_WIDTH}px` },
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'background.default',
        backgroundImage: 'none',
        borderBottom: '1px solid',
        borderColor: 'divider',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ minHeight: '64px', px: { xs: 2, md: 4 } }}>
        {/* Toggle Icon */}
        <IconButton
          color="inherit"
          edge="start"
          onClick={onToggleDrawer}
          sx={{ mr: 2, color: 'text.secondary' }}
          aria-label="toggle navigation"
        >
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <MenuIcon />
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <SidebarIcon fontSize="small" />
          </Box>
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        {/* Right side icons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip
            icon={<WifiIcon sx={{ fontSize: 14 }} />}
            label="Connected"
            size="small"
            sx={{
              backgroundColor: alpha('#10b981', 0.1),
              color: '#10b981',
              fontWeight: 600,
              fontSize: '0.75rem',
              '& .MuiChip-icon': { color: '#10b981' },
            }}
          />
          <IconButton onClick={toggleMode} sx={{ color: 'text.secondary' }}>
            {mode === 'dark' ? <SunIcon fontSize="small" /> : <MoonIcon fontSize="small" />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

// Internal helper for alpha since it was used in code
function alpha(color, opacity) {
  return `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
}
