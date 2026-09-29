export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by patient or owner name..."
        className="w-full rounded-md border border-ink-500/20 px-3 py-2 pl-9 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
      />
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-500">
        🔍
      </span>
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 hover:text-ink-900"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}