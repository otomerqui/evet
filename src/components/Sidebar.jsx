import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/app', label: 'Home', end: true },
  { to: '/app/pets', label: 'Pets' },
  { to: '/app/settings', label: 'Settings' },
];

export default function Sidebar() {
  const { signOut } = useAuth();

  return (
    <aside className="flex flex-col w-56 shrink-0 border-r border-ink-500/10 bg-surface p-4">
      <h1 className="mb-6 text-lg font-semibold text-ink-900">eVet</h1>
      <nav className="space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `block rounded-md px-3 py-2 text-sm font-semibold ${
                isActive
                  ? 'bg-brand-50 text-brand-600'
                  : 'text-ink-500 hover:bg-brand-50 hover:text-ink-900'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <button
        onClick={signOut}
        className="mt-auto rounded-md px-3 py-2 text-left text-sm font-semibold text-ink-500 hover:bg-brand-50 hover:text-ink-900"
      >
       Sign out
     </button>
    </aside>
  );
}