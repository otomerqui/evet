import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import PatientProfile from '../components/PatientProfile';

export default function PatientProfilePage() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const { patients, visits, openEditPatientModal, openAddVisitModal, openEditVisitModal } =
    useOutletContext();

  const patient = patients.find((p) => p.id === patientId);

  if (!patient) {
    return <p className="text-sm text-ink-500">No se encontró paciente.</p>;
  }

  const patientVisits = visits.filter((v) => v.patientId === patient.id);

  return (
    <PatientProfile
      patient={patient}
      visits={patientVisits}
      onBack={() => navigate('/app/pets')}
      onAddVisitClick={() => openAddVisitModal(patient.id)}
      onEditPatientClick={() => openEditPatientModal(patient)}
      onEditVisitClick={openEditVisitModal}
    />
  );
}