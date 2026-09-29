export default function VisitCard({ visit, onEditClick }) {
  return (
    <div className="rounded-lg bg-surface p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-ink-900">{visit.date}</span>
        <span className="text-sm text-ink-500">{visit.weight} kg</span>
        <button
            onClick={() => onEditClick(visit)}
            className="text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            Edit
        </button>
      </div>
      <p className="mt-1 text-sm text-ink-900">{visit.reason}</p>
      {visit.diagnosis && <p className="mt-1 text-sm text-ink-500">Diagnosis: {visit.diagnosis}</p>}
      {visit.treatment && <p className="mt-1 text-sm text-ink-500">Treatment: {visit.treatment}</p>}
      {visit.vetNotes && <p className="mt-1 text-sm text-ink-500">Notes: {visit.vetNotes}</p>}
    </div>
  );
}