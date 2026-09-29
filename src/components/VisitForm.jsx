import { useState } from 'react';

const emptyVisit = {
  date: '',
  reason: '',
  diagnosis: '',
  treatment: '',
  vetNotes: '',
  weight: '',
};

function validate(visit) {
  const errors = {};

  if (!visit.date) {
    errors.date = 'Date is required';
  } else if (new Date(visit.date) > new Date()) {
    errors.date = 'Date cannot be in the future';
  }

  if (!visit.reason.trim()) errors.reason = 'Reason is required';

  if (!visit.weight) {
    errors.weight = 'Weight is required';
  } else if (isNaN(visit.weight) || Number(visit.weight) <= 0) {
    errors.weight = 'Weight must be a positive number';
  }

  return errors;
}

export default function VisitForm({ initialData, onSubmit, onCancel }) {
  const [visit, setVisit] = useState(initialData || emptyVisit);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(field, value) {
    setVisit((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(visit);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    await onSubmit({ ...visit, weight: Number(visit.weight) });
    setIsSubmitting(false);
  }

  const inputClass = (field) =>
    `w-full rounded-md border px-3 py-2 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600 ${
      errors[field] ? 'border-alert-500' : 'border-ink-500/20'
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-ink-900">Date</label>
          <input
            type="date"
            value={visit.date}
            onChange={(e) => handleChange('date', e.target.value)}
            className={inputClass('date')}
          />
          {errors.date && <p className="mt-1 text-sm text-alert-500">{errors.date}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-ink-900">Weight (kg)</label>
          <input
            type="text"
            value={visit.weight}
            onChange={(e) => handleChange('weight', e.target.value)}
            className={inputClass('weight')}
          />
          {errors.weight && <p className="mt-1 text-sm text-alert-500">{errors.weight}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-ink-900">Reason</label>
        <input
          type="text"
          value={visit.reason}
          onChange={(e) => handleChange('reason', e.target.value)}
          className={inputClass('reason')}
          placeholder="Annual checkup, injury, ..."
        />
        {errors.reason && <p className="mt-1 text-sm text-alert-500">{errors.reason}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-ink-900">Diagnosis</label>
        <textarea
          value={visit.diagnosis}
          onChange={(e) => handleChange('diagnosis', e.target.value)}
          rows={2}
          className={inputClass('diagnosis')}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-ink-900">Treatment</label>
        <textarea
          value={visit.treatment}
          onChange={(e) => handleChange('treatment', e.target.value)}
          rows={2}
          className={inputClass('treatment')}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-ink-900">Vet notes</label>
        <textarea
          value={visit.vetNotes}
          onChange={(e) => handleChange('vetNotes', e.target.value)}
          rows={2}
          className={inputClass('vetNotes')}
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md px-4 py-2 text-sm font-semibold text-ink-500 hover:text-ink-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          {isSubmitting ? 'Saving...' : 'Save visit'}
        </button>
      </div>
    </form>
  );
}