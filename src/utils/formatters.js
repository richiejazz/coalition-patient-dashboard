// Pure helpers that reshape API data for display. No network calls here.

const MONTH_ORDER = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// The live API returns "08/23/1996" while the docs example shows "1996-08-23".
// Accept both and return a Date, or null if the value can't be parsed.
function parseDate(value) {
  if (typeof value !== 'string') return null;

  const usFormat = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (usFormat) {
    const [, month, day, year] = usFormat;
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  const isoFormat = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoFormat) {
    const [, year, month, day] = isoFormat;
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  return null;
}

// e.g. "August 23, 1996"
export function formatDateOfBirth(value) {
  const date = parseDate(value);
  if (!date) return value ?? '—';
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

// Sorts history oldest → newest so it never depends on the API's ordering.
function sortChronologically(history) {
  return [...history].sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return MONTH_ORDER.indexOf(a.month) - MONTH_ORDER.indexOf(b.month);
  });
}

// The most recent diagnosis_history entry (used by the vital cards and the
// systolic/diastolic summary beside the chart).
export function getLatestReading(history = []) {
  const sorted = sortChronologically(history);
  return sorted[sorted.length - 1] ?? null;
}

// The last `count` months of blood pressure, oldest first, ready for Chart.js.
export function getBloodPressureSeries(history = [], count = 6) {
  const recent = sortChronologically(history).slice(-count);

  return {
    labels: recent.map((entry) => `${entry.month.slice(0, 3)}, ${entry.year}`),
    systolic: recent.map((entry) => entry.blood_pressure.systolic.value),
    diastolic: recent.map((entry) => entry.blood_pressure.diastolic.value),
  };
}
