export function getTrendData(items, dateField, days = 7) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const buckets = [];
  for (let i = days - 1; i >= 0; i--) {
    const day = new Date(today);
    day.setDate(day.getDate() - i);
    buckets.push({ date: day, count: 0 });
  }

  items.forEach((item) => {
    if (!item[dateField]) return;
    const itemDate = new Date(item[dateField]);
    itemDate.setHours(0, 0, 0, 0);
    const bucket = buckets.find((b) => b.date.getTime() === itemDate.getTime());
    if (bucket) bucket.count += 1;
  });

  const currentTotal = buckets.reduce((sum, b) => sum + b.count, 0);

  const prevDays = [];
  for (let i = days * 2 - 1; i >= days; i--) {
    const day = new Date(today);
    day.setDate(day.getDate() - i);
    prevDays.push(day.getTime());
  }
  const prevTotal = items.filter((item) => {
    if (!item[dateField]) return false;
    const itemDate = new Date(item[dateField]);
    itemDate.setHours(0, 0, 0, 0);
    return prevDays.includes(itemDate.getTime());
  }).length;

  let percentChange;
  if (prevTotal === 0 && currentTotal === 0) {
    percentChange = 0;
  } else if (prevTotal === 0) {
    percentChange = 100;
  } else {
    percentChange = Math.round(((currentTotal - prevTotal) / prevTotal) * 100);
  }

  return {
    sparkline: buckets.map((b) => b.count),
    percentChange,
  };
}