import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas">
        <p className="text-sm text-ink-500">Loading...</p>
      </div>
    );
  }

  if (!session) return <Navigate to="/login" replace />;

  return <Outlet />;
}