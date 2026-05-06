/**
 * Notification Context
 * 
 * Provides global notification state and viewed status
 * to all components via React Context.
 */

import { createContext, useContext, useMemo } from 'react';
import useNotifications from '../hooks/useNotifications';
import useViewedStatus from '../hooks/useViewedStatus';

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const notificationState = useNotifications();
  const viewedState = useViewedStatus();

  const value = useMemo(
    () => ({
      ...notificationState,
      ...viewedState,
    }),
    [notificationState, viewedState]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotificationContext() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
}

export default NotificationContext;
