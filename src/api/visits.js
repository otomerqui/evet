import { supabase } from './supabaseClient';
import { mapVisitFromDb, mapVisitToDb } from './mappers';

export async function getVisits() {
  const { data, error } = await supabase.from('visits').select('*').order('date', { ascending: false });
  if (error) throw error;
  return data.map(mapVisitFromDb);
}

export async function createVisit(visitData) {
  const { data, error } = await supabase
    .from('visits')
    .insert(mapVisitToDb(visitData))
    .select()
    .single();
  if (error) throw error;
  return mapVisitFromDb(data);
}

export async function updateVisit(id, visitData) {
  const { data, error } = await supabase
    .from('visits')
    .update(mapVisitToDb(visitData))
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return mapVisitFromDb(data);
}