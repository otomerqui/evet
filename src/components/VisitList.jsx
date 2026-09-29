import VisitCard from './VisitCard';

export default function VisitList({ visits, onEditVisitClick }) {
  if (visits.length === 0) {
    return <p className="text-sm text-ink-500">No visits recorded yet.</p>;
  }

  const sorted = [...visits].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="space-y-3">
      {sorted.map((visit) => (
        <VisitCard key={visit.id} visit={visit} onEditClick={onEditVisitClick}/>
      ))}
    </div>
  );
}