export function calculateAge(birthdate) {
  if (!birthdate) return null;

  const birth = new Date(birthdate);
  const now = new Date();
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();

  if (now.getDate() < birth.getDate()) months -= 1;
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  if (years < 1) return `${months} ${months === 1 ? 'mes' : 'meses'}`;
  return `${years} ${years === 1 ? 'año' : 'años'}`;
}