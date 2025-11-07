// src/routes.tsx
import { Routes, Route } from 'react-router-dom';
import Validator from './pages/Validator';
import SentimentPage from './pages/SentimentPage';
import SentimentDetail from './pages/SentimentDetail';
import HistoryPage from './pages/HistoryPage';
import SettingsPage from './pages/SettingsPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import Layout from './components/layout/Layout';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Validator />} />
        <Route path="/sentiment" element={<SentimentPage />} />
        <Route path="/sentiment/:type" element={<SentimentDetail />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
}