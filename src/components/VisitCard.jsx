import { Pencil, Trash2 } from "lucide-react";

export default function VisitCard({ visit, onEditClick, onDeleteClick }) {
  return (
    <div className="rounded-lg bg-surface p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-ink-900">{visit.date}</span>
        <div className="flex items-center gap-3">
          <span className="text-sm text-ink-500">{visit.weight} kg</span>
          <button
              onClick={() => onEditClick(visit)}
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-ink-500/15 px-3 py-1.5 text-sm font-semibold text-ink-900 hover:bg-brand-50"
            >
              <Pencil size={14} />
              Editar consulta
          </button>
          <button
              onClick={() => onDeleteClick(visit)}
              aria-label="Eliminar consulta"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink-500/15 text-alert-500 hover:bg-alert-500/10"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
      <p className="mt-1 text-sm text-ink-900">{visit.reason}</p>
      {visit.diagnosis && <p className="mt-1 text-sm text-ink-500">Diagnosis: {visit.diagnosis}</p>}
      {visit.treatment && <p className="mt-1 text-sm text-ink-500">Treatment: {visit.treatment}</p>}
      {visit.vetNotes && <p className="mt-1 text-sm text-ink-500">Notes: {visit.vetNotes}</p>}
    </div>
  );
}