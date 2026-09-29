import { useState, useEffect } from 'react';
import { getPatients } from '../api/patients';
import { getVisits } from '../api/visits';
import { getTrendData } from '../utils/trends';
import StatCard from '../components/StatCard';

export default function Home() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const [patients, visits] = await Promise.all([getPatients(), getVisits()]);
        setData({
          totalPatients: patients.length,
          totalVisits: visits.length,
          patientsTrend: getTrendData(patients, 'createdAt', 7),
          visitsTrend: getTrendData(visits, 'date', 7),
        });
      } catch (err) {
        setLoadError('Could not load dashboard data. Is json-server running?');
      } finally {
        setIsLoading(false);
      }
    }
    loadStats();
  }, []);

  if (isLoading) return <p className="text-sm text-ink-500">Loading...</p>;
  if (loadError) return <p className="text-sm text-alert-500">{loadError}</p>;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-ink-900">Home</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatCard
          label="Total pets"
          total={data.totalPatients}
          sparkline={data.patientsTrend.sparkline}
          percentChange={data.patientsTrend.percentChange}
        />
        <StatCard
          label="Total medical records"
          total={data.totalVisits}
          sparkline={data.visitsTrend.sparkline}
          percentChange={data.visitsTrend.percentChange}
        />
      </div>
    </div>
  );
}