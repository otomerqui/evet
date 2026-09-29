import { useState, useEffect } from 'react';
import { getSettings, updateSettings, uploadLogo, removeLogo, getLogoPathFromUrl } from '../api/settings';
import SettingsForm from '../components/SettingsForm';

export default function Settings() {
  const [settings, setSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    async function loadSettings() {
      try {
        const data = await getSettings();
        setSettings(data);
      } catch (err) {
        setLoadError('Could not load settings.');
      } finally {
        setIsLoading(false);
      }
    }
    loadSettings();
  }, []);

  async function handleSave(settingsData) {
    const updated = await updateSettings(settingsData);
    setSettings(updated);
  }

  async function handleLogoUpload(file) {
    const previousPath = getLogoPathFromUrl(settings.logoUrl);
    const newUrl = await uploadLogo(file, settings.id, previousPath);
    const updated = await updateSettings({ ...settings, logoUrl: newUrl });
    setSettings(updated);
    return updated.logoUrl;
  }

  async function handleLogoRemove() {
    const path = getLogoPathFromUrl(settings.logoUrl);
    await removeLogo(path);
    const updated = await updateSettings({ ...settings, logoUrl: '' });
    setSettings(updated);
  }

  if (isLoading) return <p className="text-sm text-ink-500">Loading...</p>;
  if (loadError) return <p className="text-sm text-alert-500">{loadError}</p>;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-ink-900">Settings</h1>
      <SettingsForm
        initialData={settings}
        onSubmit={handleSave}
        onLogoUpload={handleLogoUpload}
        onLogoRemove={handleLogoRemove}
      />
    </div>
  );
}