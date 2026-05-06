/**
 * App Routes
 * 
 * Defines all application routes using React Router.
 */

import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/Dashboard';
import AllNotifications from '../pages/AllNotifications';
import PriorityNotifications from '../pages/PriorityNotifications';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/notifications" element={<AllNotifications />} />
        <Route path="/priority" element={<PriorityNotifications />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
