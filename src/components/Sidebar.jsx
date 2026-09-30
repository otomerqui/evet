import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, PawPrint, Settings, LogOut, Building2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getSettings } from '../api/settings';

const navItems = [
  { to: '/app', label: 'Inicio', icon: Home, end: true },
  { to: '/app/pets', label: 'Pacientes', icon: PawPrint },
  { to: '/app/settings', label: 'Ajustes', icon: Settings },
];

export default function Sidebar() {
  const { signOut } = useAuth();
  const [clinic, setClinic] = useState(null);

  useEffect(() => {
    getSettings()
      .then(setClinic)
      .catch(() => setClinic(null));
  }, []);

  return (
    <aside className="group flex h-screen w-16 shrink-0 flex-col overflow-hidden border-r border-ink-500/10 bg-surface transition-all duration-200 hover:w-56">
      {/* Clinic branding */}
      <div className="flex items-center gap-3 border-b border-ink-500/10 p-4">
        {clinic?.logoUrl ? (
          <img
            src={clinic.logoUrl}
            alt={clinic.clinicName}
            className="h-9 w-9 shrink-0 rounded-md object-cover"
          />
        ) : (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand-600">
            <Building2 size={18} />
          </div>
        )}
        <span className="min-w-0 truncate whitespace-nowrap text-sm font-semibold text-ink-900 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          {clinic?.clinicName || 'Tu clínica'}
        </span>
      </div>

      {/* Nav links */}
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-2.5 py-2 text-sm font-semibold ${
                  isActive
                    ? 'bg-brand-50 text-brand-600'
                    : 'text-ink-500 hover:bg-brand-50 hover:text-ink-900'
                }`
              }
            >
              <Icon size={20} className="shrink-0" />
              <span className="whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* Sign out + app branding */}
      <div className="border-t border-ink-500/10 p-3">
        <button
          onClick={signOut}
          className="flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-left text-sm font-semibold text-ink-500 hover:bg-brand-50 hover:text-ink-900"
        >
          <LogOut size={20} className="shrink-0" />
          <span className="whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            Cerrar sesión
          </span>
        </button>

        <p className="mt-3 px-2.5 text-xs font-semibold text-ink-500">eVet</p>
      </div>
    </aside>
  );
}