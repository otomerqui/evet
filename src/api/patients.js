import { supabase } from './supabaseClient';
import { mapPatientFromDb, mapPatientToDb } from './mappers';

export async function getPatients() {
  const { data, error } = await supabase.from('patients').select('*').order('name');
  if (error) throw error;
  return data.map(mapPatientFromDb);
}

export async function createPatient(patientData) {
  const { data, error } = await supabase
    .from('patients')
    .insert(mapPatientToDb(patientData))
    .select()
    .single();
  if (error) throw error;
  return mapPatientFromDb(data);
}

export async function updatePatient(id, patientData) {
  const { data, error } = await supabase
    .from('patients')
    .update(mapPatientToDb(patientData))
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return mapPatientFromDb(data);
}