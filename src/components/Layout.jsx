import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="flex h-screen overflow-hidden bg-canvas">
      <Sidebar />
      <main className="h-full flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}