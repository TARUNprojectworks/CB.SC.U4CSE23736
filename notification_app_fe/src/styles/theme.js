import { alpha } from '@mui/material/styles';

/**
 * Returns the MUI theme configuration object for the given mode.
 * Matches the NotifyHub premium design.
 */
export const getAppTheme = (mode) => ({
  palette: {
    mode,
    primary: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
      contrastText: '#ffffff',
    },
    background: {
      default: mode === 'dark' ? '#0b0f19' : '#f8fafc',
      paper: mode === 'dark' ? '#131b2f' : '#ffffff',
    },
    text: {
      primary: mode === 'dark' ? '#f8fafc' : '#0f172a',
      secondary: mode === 'dark' ? '#94a3b8' : '#64748b',
    },
    divider: mode === 'dark' ? 'rgba(148, 163, 184, 0.1)' : 'rgba(15, 23, 42, 0.1)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2rem', fontWeight: 800 },
    h2: { fontSize: '1.75rem', fontWeight: 700 },
    h3: { fontSize: '1.5rem', fontWeight: 700 },
    h4: { fontSize: '1.25rem', fontWeight: 600 },
    h5: { fontSize: '1.125rem', fontWeight: 600 },
    h6: { fontSize: '1rem', fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          scrollbarColor: mode === 'dark' ? '#1e293b transparent' : '#cbd5e1 transparent',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: 'none',
          border: mode === 'dark' ? '1px solid rgba(148, 163, 184, 0.1)' : '1px solid rgba(15, 23, 42, 0.08)',
          transition: 'all 0.2s',
          '&:hover': {
            borderColor: mode === 'dark' ? 'rgba(148, 163, 184, 0.3)' : 'rgba(15, 23, 42, 0.2)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
        },
      },
    },
  },
});

// Default export for backward compatibility if needed, though getAppTheme is preferred
const theme = getAppTheme('dark');
export default theme;
