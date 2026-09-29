import PatientCard from './PatientCard';

export default function PatientList({ patients, onSelectPatient, searchQuery }) {
  if (patients.length === 0) {
    if (searchQuery) {
      return (
        <p className="text-sm text-ink-500">
          No patients match "{searchQuery}". Try a different search.
        </p>
      );
    }
    return <p className="text-sm text-ink-500">No patients yet. Add your first one above.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {patients.map((patient) => (
        <PatientCard
          key={patient.id}
          patient={patient}
          onClick={() => onSelectPatient(patient)}
        />
      ))}
    </div>
  );
}