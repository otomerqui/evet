import { LineChart, Line, ResponsiveContainer } from 'recharts';

export default function StatCard({ label, total, sparkline, percentChange }) {
  const data = sparkline.map((count, i) => ({ day: i, count }));
  const isPositive = percentChange >= 0;

  return (
    <div className="rounded-lg bg-surface p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-ink-500">{label}</p>
          <p className="mt-1 text-3xl font-semibold text-ink-900">{total}</p>
        </div>
        <span
          className={`rounded-full px-2 py-1 text-xs font-semibold ${
            isPositive ? 'bg-brand-50 text-brand-600' : 'bg-alert-500/10 text-alert-500'
          }`}
        >
          {isPositive ? '↑' : '↓'} {isPositive ? '+' : ''}
          {percentChange}%
        </span>
      </div>

      <div className="mt-4 h-12">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line type="monotone" dataKey="count" stroke="#0F766E" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}