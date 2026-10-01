import { PawPrint, Cake, Scale, User } from 'lucide-react';
import { calculateAge } from '../utils/age';

export default function PatientCard({ patient, onClick }) {
  const age = calculateAge(patient.birthdate);

  return (
    <button
      onClick={onClick}
      className="w-full rounded-xl bg-surface p-5 text-left shadow-sm hover:bg-brand-50/50"
    >
      <div className="min-w-0">
        <h3 className="truncate font-semibold text-ink-900">{patient.name}</h3>
        <p className="truncate text-sm text-ink-500">{patient.breed || patient.species}</p>
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
        <span className="flex items-center gap-1.5 text-sm text-ink-500">
          <PawPrint size={15} />
          {patient.species}
        </span>
        {age && (
          <span className="flex items-center gap-1.5 text-sm text-ink-500">
            <Cake size={15} />
            {age}
          </span>
        )}
        <span className="flex items-center gap-1.5 text-sm text-ink-500">
          <Scale size={15} />
          {patient.weight} kg
        </span>
      </div>

      <div className="mt-3 flex items-center gap-1.5 border-t border-ink-500/10 pt-3 text-sm text-ink-500">
        <User size={15} />
        <span className="truncate">{patient.ownerName}</span>
      </div>
    </button>
  );
}