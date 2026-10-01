import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import PatientList from '../components/PatientList';
import SearchBar from '../components/SearchBar';

export default function PatientsListPage() {
  const { patients, openAddPatientModal } = useOutletContext();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredPatients = patients.filter((p) => {
    const query = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(query) ||
      p.ownerName.toLowerCase().includes(query)
    );
  });

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-ink-900">Pacientes</h1>
        <button
          onClick={openAddPatientModal}
          className="rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Agregar paciente
        </button>
      </div>

      <div className="mb-4">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      <PatientList
        patients={filteredPatients}
        onSelectPatient={(patient) => navigate(`/app/pets/${patient.id}`)}
        searchQuery={searchQuery}
      />
    </div>
  );
}