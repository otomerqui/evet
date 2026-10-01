import { useState, useEffect } from 'react';

function validate(settings) {
  const errors = {};
  if (!settings.clinicName.trim()) errors.clinicName = 'Clinic name is required';
  if (settings.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.email)) {
    errors.email = 'Enter a valid email address';
  }
  return errors;
}

export default function SettingsForm({ 
  initialData, 
  onSubmit, 
  onLogoUpload, 
  onLogoRemove }) {
  const [settings, setSettings] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [logoError, setLogoError] = useState('');

  useEffect(() => {
    if (!saved) return;
    const timer = setTimeout(() => setSaved(false), 3500);
    return () => clearTimeout(timer);
  }, [saved]);

  function handleChange(field, value) {
    setSettings((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    setSaved(false);
  }

  async function handleLogoChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setLogoError('');
    setIsUploadingLogo(true);
    try {
      const newUrl = await onLogoUpload(file);
      setSettings((prev) => ({ ...prev, logoUrl: newUrl }));
    } catch (err) {
      setLogoError('Could not upload logo. Try a smaller image or a different format.');
    } finally {
      setIsUploadingLogo(false);
    }
  }

  async function handleLogoRemoveClick() {
    setLogoError('');
    setIsUploadingLogo(true);
    try {
      await onLogoRemove();
      setSettings((prev) => ({ ...prev, logoUrl: '' }));
    } catch (err) {
      setLogoError('Could not remove logo.');
    } finally {
      setIsUploadingLogo(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(settings);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSaving(true);
    await onSubmit(settings);
    setIsSaving(false);
    setSaved(true);
  }

  const inputClass = (field) =>
    `w-full rounded-md border px-3 py-2 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600 ${
      errors[field] ? 'border-alert-500' : 'border-ink-500/20'
    }`;

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
      <div>
        <label className="block text-sm font-semibold text-ink-900">Nombre de la clínica</label>
        <input
          type="text"
          value={settings.clinicName}
          onChange={(e) => handleChange('clinicName', e.target.value)}
          className={inputClass('clinicName')}
        />
        {errors.clinicName && <p className="mt-1 text-sm text-alert-500">{errors.clinicName}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-ink-900">Dirección</label>
        <input
          type="text"
          value={settings.address}
          onChange={(e) => handleChange('address', e.target.value)}
          className={inputClass('address')}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-ink-900">Teléfono</label>
          <input
            type="text"
            value={settings.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className={inputClass('phone')}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-ink-900">Email</label>
          <input
            type="text"
            value={settings.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={inputClass('email')}
          />
          {errors.email && <p className="mt-1 text-sm text-alert-500">{errors.email}</p>}
        </div>
      </div>
      

      
      {/* Logo input */}
      <div>
        <label className="block text-sm font-semibold text-ink-900">Logo</label>
        <div className="mt-1 flex items-center gap-4 rounded-md border border-dashed border-ink-500/30 bg-canvas p-4">
          {settings.logoUrl ? (
            <>
              <img
                src={settings.logoUrl}
                alt="Clinic logo"
                className="h-16 w-16 rounded-md border border-ink-500/10 object-cover"
              />
              <div className="flex flex-col gap-2">
                <label className="cursor-pointer text-sm font-semibold text-brand-600 hover:text-brand-700">
                  {isUploadingLogo ? 'Cargando...' : 'Cambiar logo'}
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleLogoChange}
                    disabled={isUploadingLogo}
                    className="hidden"
                  />
                </label>
                <button
                  type="button"
                  onClick={handleLogoRemoveClick}
                  disabled={isUploadingLogo}
                  className="text-sm font-semibold text-alert-500 hover:text-alert-500/80 disabled:opacity-50"
                >
                  Eliminar logo
                </button>
              </div>
            </>
          ) : (
            <label className="flex w-full cursor-pointer flex-col items-center gap-1 py-2 text-center">
              <span className="text-sm font-semibold text-brand-600">
                {isUploadingLogo ? 'Uploading...' : 'Upload a logo'}
              </span>
              <span className="text-xs text-ink-500">PNG, JPG, or WebP — max 2 MB</span>
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleLogoChange}
                disabled={isUploadingLogo}
                className="hidden"
              />
            </label>
          )}
        </div>
        {logoError && <p className="mt-2 text-sm text-alert-500">{logoError}</p>}
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isSaving}
          className="rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
        >
          {isSaving ? 'Guardando...' : 'Guardar ajustes'}
        </button>
        {saved && <span className="text-sm text-brand-600">Guardado</span>}
      </div>
    </form>
  );
}