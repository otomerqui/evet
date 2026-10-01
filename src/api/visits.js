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

export async function deleteVisit(id) {
  const { error, count } = await supabase
    .from('visits')
    .delete({ count: 'exact' })
    .eq('id', id);
  if (error) throw error;
  if (count === 0) throw new Error('No se eliminó ningún registro (posible bloqueo de permisos).');
}