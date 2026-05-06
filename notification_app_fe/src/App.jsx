/**
 * App Component
 * 
 * Root component that sets up Material UI theme,
 * React Router, and global context providers.
 */

import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { NotificationProvider } from './context/NotificationContext';
import { AppThemeProvider } from './context/ThemeContext';
import AppRoutes from './routes/AppRoutes';
import { logInfo } from './services/logService';

/* Log app initialization */
logInfo('config', 'Campus Notifications App initialized');

export default function App() {
  return (
    <AppThemeProvider>
      <CssBaseline />
      <BrowserRouter>
        <NotificationProvider>
          <AppRoutes />
        </NotificationProvider>
      </BrowserRouter>
    </AppThemeProvider>
  );
}
