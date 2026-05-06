/**
 * MainLayout Component
 * 
 * Application shell with responsive Navbar and Sidebar.
 * Content area adapts to sidebar width on desktop.
 */

import { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useNotificationContext } from '../context/NotificationContext';

const DRAWER_WIDTH = 260;

export default function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { notifications, getUnviewedCount, total } = useNotificationContext();

  const unreadCount = getUnviewedCount(notifications);

  const handleToggleDrawer = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Navbar onToggleDrawer={handleToggleDrawer} unreadCount={unreadCount} />
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} totalCount={total || notifications.length} />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          minHeight: '100vh',
          backgroundColor: 'background.default',
        }}
      >
        <Toolbar /> {/* Spacer for fixed AppBar */}
        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
