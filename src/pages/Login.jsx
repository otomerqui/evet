import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { session, isLoading, signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoading && session) return <Navigate to="/app" replace />;

  function validate() {
    const newErrors = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Enter a valid email address';
    if (!password) newErrors.password = 'Password is required';
    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError('');
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    const { error } = await signIn(email.trim(), password);
    setIsSubmitting(false);
    if (error) setFormError('Incorrect email or password.');
  }

  const inputClass = (field) =>
    `w-full rounded-md border px-3 py-2 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600 ${
      errors[field] ? 'border-alert-500' : 'border-ink-500/20'
    }`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas p-6">
      <div className="w-full max-w-sm rounded-lg bg-surface p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-ink-900">Sign in to eVet</h1>
        <p className="mt-1 text-sm text-ink-500">Use the account provided for your clinic.</p>

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-ink-900">Email</label>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass('email')}
            />
            {errors.email && <p className="mt-1 text-sm text-alert-500">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink-900">Password</label>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass('password')}
            />
            {errors.password && <p className="mt-1 text-sm text-alert-500">{errors.password}</p>}
          </div>

          {formError && <p className="text-sm text-alert-500">{formError}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}