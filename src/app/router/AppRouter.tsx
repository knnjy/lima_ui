import { Routes, Route } from 'react-router-dom';
import LandingPage from '../../features/landing/views/pages/LandingPage';
import LoginPage from '../../features/authentication/views/pages/LoginPage';
import RegisterPage from '../../features/authentication/views/pages/RegisterPage';
import PlaceholderPage from '../../shared/components/PlaceholderPage';
import { YourFarmsRoute } from '../../features/farm/presentation/view/YourFarmsRoute';
import { DashboardView } from '../../features/dashboard/presentation/views/DashboardView';
import { AppLayout } from '../layout/AppLayout';
import { AnimalView } from '../../features/livestockManagement/animal/presentations/view/AnimalView';
import { AnimalGroupView } from '../../features/livestockManagement/animalGroup/presentations/view/AnimalGroupView';
import { LivestockManagementView } from '../../features/livestockManagement/presentations/views/LivestockManagementView';

export default function AppRouter() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<LandingPage />} />

      {/* Authentication */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<PlaceholderPage title="Forgot password" description="Password recovery flow (placeholder)." />} />
      <Route path="/reset-password" element={<PlaceholderPage title="Reset password" description="Set a new password (placeholder)." />} />
      <Route path="/verify-email" element={<PlaceholderPage title="Verify email" description="Email verification (placeholder)." />} />

      {/* Onboarding & authenticated (placeholders for now) */}
      <Route path="/onboarding" element={<PlaceholderPage title="Onboarding" description="First-time account setup flow (placeholder)." />} />
      <Route path="/home" element={<YourFarmsRoute />} />
      <Route path="/farms/new" element={<PlaceholderPage title="Add Farm" />} />
      
      <Route path="/farms/:farmId" element={<AppLayout />}>
        <Route path="dashboard" element={<DashboardView />} />
        <Route path="livestock" element={<LivestockManagementView />}>
          <Route index element={<AnimalView />} />
          <Route path="animal-groups" element={<AnimalGroupView />} />
        </Route>
        <Route path="health-records" element={<DashboardView />} />
        <Route path="daily-activities" element={<DashboardView/>} />
        <Route path="feed-inventory" element={<DashboardView/>} />
        <Route path="sales-expenses" element={<DashboardView/>} />
        <Route path="ai-insights" element={<DashboardView/>} />
        <Route path="reports" element={<DashboardView/>} />
        <Route path="announcements" element={<DashboardView/>} />
        <Route path="settings" element={<DashboardView/>} />
      </Route>
      <Route path="/profile" element={<PlaceholderPage title="Profile" />} />

      {/* Fallback */}
      <Route path="*" element={<PlaceholderPage title="Page not found" description="The page you requested does not exist." />} />
    </Routes>
  );
}
