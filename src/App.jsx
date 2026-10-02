import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';

const AuthedApp = lazy(() => import('./AuthedApp'));

function PageLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas">
      <p className="text-sm text-ink-500">Cargando...</p>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/*"
        element={
          <Suspense fallback={<PageLoading />}>
            <AuthedApp />
          </Suspense>
        }
      />
    </Routes>
  );
}