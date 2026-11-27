import { Routes, Route } from 'react-router-dom';
import LandingPage from '../../features/landing/views/pages/LandingPage';
import LoginPage from '../../features/authentication/views/pages/LoginPage';
import RegisterPage from '../../features/authentication/views/pages/RegisterPage';
import AnimalsPage from '../../features/authentication/views/pages/AnimalsPage';
import AnimalRegistryPage from '../../features/authentication/views/pages/AnimalRegistryPage';
import PlaceholderPage from '../../shared/components/PlaceholderPage';

export default function AppRouter() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/animals" element={<AnimalsPage />} />
      <Route path="/animal-registry" element={<AnimalRegistryPage />} />

      {/* Authentication */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<PlaceholderPage title="Forgot password" description="Password recovery flow (placeholder)." />} />
      <Route path="/reset-password" element={<PlaceholderPage title="Reset password" description="Set a new password (placeholder)." />} />
      <Route path="/verify-email" element={<PlaceholderPage title="Verify email" description="Email verification (placeholder)." />} />

      {/* Onboarding & authenticated (placeholders for now) */}
      <Route path="/onboarding" element={<PlaceholderPage title="Onboarding" description="First-time account setup flow (placeholder)." />} />
      <Route path="/home" element={<PlaceholderPage title="My Farms" description="Farm list / home screen (placeholder)." />} />
      <Route path="/farms/new" element={<PlaceholderPage title="Add Farm" />} />
      <Route path="/farms/:farmId/dashboard" element={<PlaceholderPage title="Farm Dashboard" />} />
      <Route path="/farms/:farmId/livestock" element={<PlaceholderPage title="Livestock Management" />} />
      <Route path="/farms/:farmId/health-records" element={<PlaceholderPage title="Health Records" />} />
      <Route path="/farms/:farmId/feed-inventory" element={<PlaceholderPage title="Feed & Inventory" />} />
      <Route path="/farms/:farmId/sales-expenses" element={<PlaceholderPage title="Sales & Expenses" />} />
      <Route path="/farms/:farmId/reports" element={<PlaceholderPage title="Reports" />} />
      <Route path="/farms/:farmId/announcements" element={<PlaceholderPage title="Announcements" />} />
      <Route path="/farms/:farmId/settings" element={<PlaceholderPage title="Farm Settings" />} />
      <Route path="/profile" element={<PlaceholderPage title="Profile" />} />

      {/* Fallback */}
      <Route path="*" element={<PlaceholderPage title="Page not found" description="The page you requested does not exist." />} />
    </Routes>
  );
}
