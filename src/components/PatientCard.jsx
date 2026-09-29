export default function PatientCard({ patient, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-lg bg-surface p-4 text-left shadow-sm hover:bg-brand-50"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-ink-900">{patient.name}</h3>
        <span className="text-sm text-ink-500">{patient.species}</span>
      </div>
      <p className="mt-1 text-sm text-ink-500">
        {patient.breed} · {patient.weight} kg
      </p>
      <p className="mt-1 text-sm text-ink-500">Owner: {patient.ownerName}</p>
    </button>
  );
}