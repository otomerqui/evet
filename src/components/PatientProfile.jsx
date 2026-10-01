import { useRef } from 'react';
import { ArrowLeft, Pencil, Trash2, PawPrint, Cake, Scale, Mars, Venus, User, Phone, Mail, Stethoscope, ChevronRight, Plus } from 'lucide-react';
import VisitList from './VisitList';
import { calculateAge } from '../utils/age';

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 py-2.5">
      <Icon size={18} className="shrink-0 text-ink-500" />
      <span className="text-sm text-ink-500">{label}:</span>
      <span className="text-sm font-semibold text-ink-900">{value}</span>
    </div>
  );
}

export default function PatientProfile({
  patient,
  visits,
  onBack,
  onAddVisitClick,
  onEditPatientClick,
  onEditVisitClick,
  onDeletePatientClick,
  onDeleteVisitClick,
}) {
  const visitsRef = useRef(null);
  const age = calculateAge(patient.birthdate);
  const lastVisit = visits[0]; // VisitList already sorts newest-first before rendering

  function scrollToVisits() {
    visitsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="mx-auto max-w-xl">
      <button
        onClick={onBack}
        className="mb-4 flex items-center gap-1 text-sm font-semibold text-ink-500 hover:text-ink-900"
      >
        <ArrowLeft size={16} />
        Volver a pacientes
      </button>

      {/* Main patient card */}
      <div className="rounded-xl bg-surface p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-semibold text-ink-900">{patient.name}</h1>
            <p className="text-sm text-ink-500">{patient.breed || patient.species}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={onEditPatientClick}
              className="flex items-center gap-1.5 rounded-full border border-ink-500/15 px-3 py-1.5 text-sm font-semibold text-ink-900 hover:bg-brand-50"
            >
              <Pencil size={14} />
              Editar perfil
            </button>
            <button
              onClick={onDeletePatientClick}
              aria-label="Eliminar paciente"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink-500/15 text-alert-500 hover:bg-alert-500/10"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <div className="mt-4 divide-y divide-ink-500/10">
          <InfoRow icon={PawPrint} label="Especie" value={patient.species} />
          {age && <InfoRow icon={Cake} label="Edad" value={age} />}
          <InfoRow icon={Scale} label="Peso" value={`${patient.weight} kg`} />
          {patient.sex && (
            <InfoRow
              icon={patient.sex === 'M' ? Mars : Venus}
              label="Sexo"
              value={patient.sex === 'M' ? 'Macho' : 'Hembra'}
            />
          )}
        </div>

        {/* Highlighted last-visit card, styled like the reference image */}
        <button
          onClick={lastVisit ? scrollToVisits : onAddVisitClick}
          className="mt-4 flex w-full items-center gap-3 rounded-lg bg-brand-50 p-4 text-left hover:bg-brand-50/70"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface text-brand-600">
            {lastVisit ? <Stethoscope size={18} /> : <Plus size={18} />}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-ink-500">
              {lastVisit ? 'Última consulta' : 'Sin consultas registradas'}
            </p>
            <p className="truncate text-sm font-semibold text-ink-900">
              {lastVisit ? `${lastVisit.reason} — ${lastVisit.date}` : 'Registrar la primera consulta'}
            </p>
          </div>
          <ChevronRight size={18} className="shrink-0 text-ink-500" />
        </button>
      </div>

      {/* Owner info, secondary card */}
      <div className="mt-4 rounded-xl bg-surface p-6 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-ink-500">Dueño</h2>
        <div className="divide-y divide-ink-500/10">
          <InfoRow icon={User} label="Nombre" value={patient.ownerName} />
          {patient.ownerPhone && <InfoRow icon={Phone} label="Teléfono" value={patient.ownerPhone} />}
          {patient.ownerEmail && <InfoRow icon={Mail} label="Correo" value={patient.ownerEmail} />}
        </div>
      </div>

      {/* Visit history */}
      <div ref={visitsRef} className="mt-6 scroll-mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold text-ink-900">Historial de consultas</h3>
          <button
            onClick={onAddVisitClick}
            className="rounded-md bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Nueva consulta
          </button>
        </div>
        <VisitList visits={visits} onEditVisitClick={onEditVisitClick} onDeleteVisitClick={onDeleteVisitClick} />
      </div>
    </div>
  );
}