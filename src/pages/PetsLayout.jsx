import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Modal from '../components/Modal';
import PatientForm from '../components/PatientForm';
import VisitForm from '../components/VisitForm';
import { getPatients, createPatient, updatePatient, deletePatient } from '../api/patients';
import { getVisits, createVisit, updateVisit, deleteVisit } from '../api/visits';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';

export default function PetsLayout() {
  const [patients, setPatients] = useState([]);
  const [visits, setVisits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [editingVisit, setEditingVisit] = useState(null);
  const [activePatientId, setActivePatientId] = useState(null);

  const navigate = useNavigate();
  const [confirmTarget, setConfirmTarget] = useState(null); // { type: 'patient' | 'visit', id, label }
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [patientsData, visitsData] = await Promise.all([getPatients(), getVisits()]);
        setPatients(patientsData);
        setVisits(visitsData);
      } catch (err) {
        setLoadError('Could not load data. Is json-server running?');
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  async function handleSavePatient(patientData) {
    if (editingPatient) {
      const updated = await updatePatient(editingPatient.id, patientData);
      setPatients((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    } else {
      
      const created = await createPatient(patientData);
      setPatients((prev) => [...prev, created]);
    }
    setIsPatientModalOpen(false);
    setEditingPatient(null);
  }

  async function handleSaveVisit(visitData) {
    if (editingVisit) {
      const updated = await updateVisit(editingVisit.id, visitData);
      setVisits((prev) => prev.map((v) => (v.id === updated.id ? updated : v)));
    } else {
      const created = await createVisit({ ...visitData, patientId: activePatientId });
      setVisits((prev) => [...prev, created]);
    }
    setIsVisitModalOpen(false);
    setEditingVisit(null);
  }

  function openAddPatientModal() {
    setEditingPatient(null);
    setIsPatientModalOpen(true);
  }

  function openEditPatientModal(patient) {
    setEditingPatient(patient);
    setIsPatientModalOpen(true);
  }

  function openAddVisitModal(patientId) {
    setActivePatientId(patientId);
    setEditingVisit(null);
    setIsVisitModalOpen(true);
  }

  function openEditVisitModal(visit) {
    setEditingVisit(visit);
    setIsVisitModalOpen(true);
  }

  function requestDeletePatient(patient) {
    setConfirmTarget({ type: 'patient', id: patient.id, label: patient.name });
  }

  function requestDeleteVisit(visit) {
    setConfirmTarget({ type: 'visit', id: visit.id, label: `${visit.reason} — ${visit.date}` });
  }

  async function handleConfirmDelete() {
  if (!confirmTarget) return;
  setIsDeleting(true);
  try {
    if (confirmTarget.type === 'patient') {
      await deletePatient(confirmTarget.id);
      setPatients((prev) => prev.filter((p) => p.id !== confirmTarget.id));
      navigate('/app/pets');
    } else {
      await deleteVisit(confirmTarget.id);
      setVisits((prev) => prev.filter((v) => v.id !== confirmTarget.id));
    }
  } catch (err) {
    alert(err.message || 'No se pudo eliminar. Intenta de nuevo.');
  } finally {
    setIsDeleting(false);
    setConfirmTarget(null);
  }
}

  if (isLoading) return <p className="text-sm text-ink-500">Cargando...</p>;
  if (loadError) return <p className="text-sm text-alert-500">{loadError}</p>;

  return (
    <>
      <Outlet
        context={{
          patients,
          visits,
          openAddPatientModal,
          openEditPatientModal,
          openAddVisitModal,
          openEditVisitModal,
          requestDeletePatient,
          requestDeleteVisit,
        }}
      />

      <Modal
        isOpen={isPatientModalOpen}
        onClose={() => {
          setIsPatientModalOpen(false);
          setEditingPatient(null);
        }}
        title={editingPatient ? 'Editar paciente' : 'Agregar paciente'}
      >
        <PatientForm
          initialData={editingPatient || undefined}
          onSubmit={handleSavePatient}
          onCancel={() => {
            setIsPatientModalOpen(false);
            setEditingPatient(null);
          }}
        />
      </Modal>

      <Modal
        isOpen={isVisitModalOpen}
        onClose={() => {
          setIsVisitModalOpen(false);
          setEditingVisit(null);
        }}
        title={editingVisit ? 'Editar consulta' : 'Nueva consulta'}
      >
        <VisitForm
          initialData={editingVisit || undefined}
          onSubmit={handleSaveVisit}
          onCancel={() => {
            setIsVisitModalOpen(false);
            setEditingVisit(null);
          }}
        />        
      </Modal>
      <ConfirmDialog
        isOpen={!!confirmTarget}
        title={confirmTarget?.type === 'patient' ? 'Eliminar paciente' : 'Eliminar consulta'}
        message={
          confirmTarget?.type === 'patient'
            ? `¿Eliminar a ${confirmTarget.label}? Se eliminará también todo su historial de consultas. Esta acción no se puede deshacer.`
            : `¿Eliminar la consulta "${confirmTarget?.label}"? Esta acción no se puede deshacer.`
        }
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmTarget(null)}
        isDeleting={isDeleting}
      />
    </>
  );
}