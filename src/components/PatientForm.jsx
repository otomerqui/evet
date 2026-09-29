import { useState } from 'react';

const emptyPatient = {
  name: '',
  species: '',
  breed: '',
  sex: '',
  birthdate: '',
  weight: '',
  ownerName: '',
  ownerPhone: '',
  ownerEmail: '',
};

function validate(patient) {
  const errors = {};

  if (!patient.name.trim()) errors.name = 'Patient name is required';
  if (!patient.species.trim()) errors.species = 'Species is required';

  if (!patient.weight) {
    errors.weight = 'Weight is required';
  } else if (isNaN(patient.weight) || Number(patient.weight) <= 0) {
    errors.weight = 'Weight must be a positive number';
  }

  if (patient.birthdate) {
    const date = new Date(patient.birthdate);
    if (isNaN(date.getTime())) {
      errors.birthdate = 'Enter a valid date';
    } else if (date > new Date()) {
      errors.birthdate = 'Birthdate cannot be in the future';
    }
  }

  if (!patient.ownerName.trim()) errors.ownerName = "Owner's name is required";

  if (patient.ownerPhone && !/^[\d\s()+-]{7,}$/.test(patient.ownerPhone)) {
    errors.ownerPhone = 'Enter a valid phone number';
  }

  if (patient.ownerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patient.ownerEmail)) {
    errors.ownerEmail = 'Enter a valid email address';
  }

  return errors;
}

export default function PatientForm({ initialData, onSubmit, onCancel }) {
  const [patient, setPatient] = useState(initialData || emptyPatient);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(field, value) {
    setPatient((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(patient);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    await onSubmit({ ...patient, weight: Number(patient.weight) });
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
          <label className="block text-sm font-semibold text-ink-900">Name</label>
          <input
            type="text"
            value={patient.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={inputClass('name')}
          />
          {errors.name && <p className="mt-1 text-sm text-alert-500">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-ink-900">Species</label>
          <input
            type="text"
            value={patient.species}
            onChange={(e) => handleChange('species', e.target.value)}
            className={inputClass('species')}
            placeholder="Dog, Cat, ..."
          />
          {errors.species && <p className="mt-1 text-sm text-alert-500">{errors.species}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-ink-900">Breed</label>
          <input
            type="text"
            value={patient.breed}
            onChange={(e) => handleChange('breed', e.target.value)}
            className={inputClass('breed')}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-ink-900">Sex</label>
          <select
            value={patient.sex}
            onChange={(e) => handleChange('sex', e.target.value)}
            className={inputClass('sex')}
          >
            <option value="">Select</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-ink-900">Birthdate</label>
          <input
            type="date"
            value={patient.birthdate}
            onChange={(e) => handleChange('birthdate', e.target.value)}
            className={inputClass('birthdate')}
          />
          {errors.birthdate && <p className="mt-1 text-sm text-alert-500">{errors.birthdate}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-ink-900">Weight (kg)</label>
          <input
            type="text"
            value={patient.weight}
            onChange={(e) => handleChange('weight', e.target.value)}
            className={inputClass('weight')}
          />
          {errors.weight && <p className="mt-1 text-sm text-alert-500">{errors.weight}</p>}
        </div>
      </div>

      <hr className="border-ink-500/10" />

      <div>
        <label className="block text-sm font-semibold text-ink-900">Owner name</label>
        <input
          type="text"
          value={patient.ownerName}
          onChange={(e) => handleChange('ownerName', e.target.value)}
          className={inputClass('ownerName')}
        />
        {errors.ownerName && <p className="mt-1 text-sm text-alert-500">{errors.ownerName}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-ink-900">Owner phone</label>
          <input
            type="text"
            value={patient.ownerPhone}
            onChange={(e) => handleChange('ownerPhone', e.target.value)}
            className={inputClass('ownerPhone')}
          />
          {errors.ownerPhone && <p className="mt-1 text-sm text-alert-500">{errors.ownerPhone}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-ink-900">Owner email</label>
          <input
            type="text"
            value={patient.ownerEmail}
            onChange={(e) => handleChange('ownerEmail', e.target.value)}
            className={inputClass('ownerEmail')}
          />
          {errors.ownerEmail && <p className="mt-1 text-sm text-alert-500">{errors.ownerEmail}</p>}
        </div>
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
          {isSubmitting ? 'Saving...' : 'Save patient'}
        </button>
      </div>
    </form>
  );
}