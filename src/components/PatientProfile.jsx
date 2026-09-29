import VisitList from "./VisitList";

export default function PatientProfile({ patient, visits, onBack, onAddVisitClick, onEditPatientClick,
  onEditVisitClick, }) {
  return (
    <div className="mx-auto max-w-3xl">
      <button
        onClick={onBack}
        className="mb-4 text-sm font-semibold text-ink-500 hover:text-ink-900"
      >
        ← Back to patients
      </button>

      <div className="rounded-lg bg-surface p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-ink-900">{patient.name}</h2>
          <span className="text-sm text-ink-500">{patient.species}</span>
          <button
              onClick={onEditPatientClick}
              className="text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              Edit
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          <div>
            <span className="text-ink-500">Breed</span>
            <p className="text-ink-900">{patient.breed || '—'}</p>
          </div>
          <div>
            <span className="text-ink-500">Sex</span>
            <p className="text-ink-900">{patient.sex === 'M' ? 'Male' : patient.sex === 'F' ? 'Female' : '—'}</p>
          </div>
          <div>
            <span className="text-ink-500">Birthdate</span>
            <p className="text-ink-900">{patient.birthdate || '—'}</p>
          </div>
          <div>
            <span className="text-ink-500">Weight</span>
            <p className="text-ink-900">{patient.weight} kg</p>
          </div>
        </div>

        <hr className="my-4 border-ink-500/10" />

        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          <div>
            <span className="text-ink-500">Owner</span>
            <p className="text-ink-900">{patient.ownerName}</p>
          </div>
          <div>
            <span className="text-ink-500">Phone</span>
            <p className="text-ink-900">{patient.ownerPhone || '—'}</p>
          </div>
          <div className="col-span-2">
            <span className="text-ink-500">Email</span>
            <p className="text-ink-900">{patient.ownerEmail || '—'}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold text-ink-900">Visit history</h3>
          <button className="rounded-md bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-700" onClick={onAddVisitClick}>
            New visit
          </button>
        </div>
        <VisitList visits={visits} onEditVisitClick={onEditVisitClick}/>
        
      </div>
    </div>
  );
}