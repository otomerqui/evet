import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Home from './pages/Home';
import Settings from './pages/Settings';
import PetsLayout from './pages/PetsLayout';
import PatientsListPage from './pages/PatientsListPage';
import PatientProfilePage from './pages/PatientProfilePage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="pets" element={<PetsLayout />}>
            <Route index element={<PatientsListPage />} />
            <Route path=":patientId" element={<PatientProfilePage />} />
          </Route>
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}