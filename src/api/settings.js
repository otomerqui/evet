import { supabase } from './supabaseClient';
import { mapSettingsFromDb, mapSettingsToDb } from './mappers';

export async function getSettings() {
  const { data, error } = await supabase.from('clinics').select('*').single();
  if (error) throw error;
  return mapSettingsFromDb(data);
}

export async function updateSettings(settingsData) {
  const { data, error } = await supabase
    .from('clinics')
    .update(mapSettingsToDb(settingsData))
    .eq('id', settingsData.id)
    .select()
    .single();
  if (error) throw error;
  return mapSettingsFromDb(data);
}

export function getLogoPathFromUrl(url) {
  if (!url) return null;
  const marker = '/object/public/logos/';
  const idx = url.indexOf(marker);
  return idx === -1 ? null : url.slice(idx + marker.length);
}

export async function uploadLogo(file, clinicId, previousPath) {
  const ext = file.name.split('.').pop();
  const path = `${clinicId}/logo-${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage.from('logos').upload(path, file);
  if (uploadError) throw uploadError;

  if (previousPath) {
    await supabase.storage.from('logos').remove([previousPath]);
  }

  const { data } = supabase.storage.from('logos').getPublicUrl(path);
  return data.publicUrl;
}

export async function removeLogo(path) {
  if (path) {
    await supabase.storage.from('logos').remove([path]);
  }
}