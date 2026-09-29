export function mapPatientFromDb(row) {
  return {
    id: row.id,
    name: row.name,
    species: row.species,
    breed: row.breed || '',
    sex: row.sex || '',
    birthdate: row.birthdate || '',
    weight: row.weight,
    ownerName: row.owner_name,
    ownerPhone: row.owner_phone || '',
    ownerEmail: row.owner_email || '',
    createdAt: row.created_at,
  };
}

export function mapPatientToDb(patient) {
  return {
    name: patient.name,
    species: patient.species,
    breed: patient.breed || null,
    sex: patient.sex || null,
    birthdate: patient.birthdate || null,
    weight: Number(patient.weight),
    owner_name: patient.ownerName,
    owner_phone: patient.ownerPhone || null,
    owner_email: patient.ownerEmail || null,
  };
}

export function mapVisitFromDb(row) {
  return {
    id: row.id,
    patientId: row.patient_id,
    date: row.date,
    reason: row.reason,
    diagnosis: row.diagnosis || '',
    treatment: row.treatment || '',
    vetNotes: row.vet_notes || '',
    weight: row.weight,
  };
}

export function mapVisitToDb(visit) {
  return {
    patient_id: visit.patientId,
    date: visit.date,
    reason: visit.reason,
    diagnosis: visit.diagnosis || null,
    treatment: visit.treatment || null,
    vet_notes: visit.vetNotes || null,
    weight: Number(visit.weight),
  };
}

export function mapSettingsFromDb(row) {
  return {
    id: row.id,
    clinicName: row.name,
    address: row.address || '',
    phone: row.phone || '',
    email: row.email || '',
    logoUrl: row.logo_url || '',
  };
}

export function mapSettingsToDb(settings) {
  return {
    name: settings.clinicName,
    address: settings.address || null,
    phone: settings.phone || null,
    email: settings.email || null,
    logo_url: settings.logoUrl || null,
  };
}