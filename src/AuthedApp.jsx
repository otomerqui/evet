import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';

const Home = lazy(() => import('./pages/Home'));
const Settings = lazy(() => import('./pages/Settings'));
const PetsLayout = lazy(() => import('./pages/PetsLayout'));
const PatientsListPage = lazy(() => import('./pages/PatientsListPage'));
const PatientProfilePage = lazy(() => import('./pages/PatientProfilePage'));

function PageLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas">
      <p className="text-sm text-ink-500">Cargando...</p>
    </div>
  );
}

export default function AuthedApp() {
  return (
    <AuthProvider>
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="app" element={<Layout />}>
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
      </Suspense>
    </AuthProvider>
  );
}