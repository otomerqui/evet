import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Modal from '../components/Modal';
import PatientForm from '../components/PatientForm';
import VisitForm from '../components/VisitForm';
import { getPatients, createPatient, updatePatient } from '../api/patients';
import { getVisits, createVisit, updateVisit } from '../api/visits';

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

  if (isLoading) return <p className="text-sm text-ink-500">Loading...</p>;
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
        }}
      />

      <Modal
        isOpen={isPatientModalOpen}
        onClose={() => {
          setIsPatientModalOpen(false);
          setEditingPatient(null);
        }}
        title={editingPatient ? 'Edit patient' : 'Add patient'}
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
        title={editingVisit ? 'Edit visit' : 'New visit'}
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
    </>
  );
}