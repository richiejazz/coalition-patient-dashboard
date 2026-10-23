import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './BloodPressureChart.css';

// Chart.js is modular: register only the pieces a line chart needs.
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

// Chart.js draws on a canvas, so it needs real color values rather than CSS
// variables. Read them from the design tokens so variables.css stays the
// single source of truth.
function readToken(name, fallback) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

// The XD palette uses a darker shade for each line and a lighter one for its points.
function buildDataset(label, values, lineColor, pointColor) {
  return {
    label,
    data: values,
    borderColor: lineColor,
    backgroundColor: pointColor,
    borderWidth: 2,
    tension: 0.4,               // smooth curved lines
    pointRadius: 6,
    pointHoverRadius: 7,
    pointBorderColor: '#ffffff',
    pointBorderWidth: 1,
  };
}

export default function BloodPressureChart({ labels, systolic, diastolic }) {
  const textColor = readToken('--color-text', '#072635');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const data = {
    labels,
    datasets: [
      buildDataset(
        'Systolic',
        systolic,
        readToken('--color-systolic-line', '#c26eb4'),
        readToken('--color-systolic', '#e66fd2')
      ),
      buildDataset(
        'Diastolic',
        diastolic,
        readToken('--color-diastolic-line', '#7e6cab'),
        readToken('--color-diastolic', '#8c6fe6')
      ),
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    // Skip the draw-in animation for users who ask the OS to reduce motion.
    animation: prefersReducedMotion ? false : undefined,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { display: false }, // the legend is drawn in HTML beside the chart
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.parsed.y} mmHg`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        // Always show all six month labels. They stay horizontal when there is
        // room (as in the design) and tilt only on narrow screens.
        ticks: {
          color: textColor,
          font: { family: 'Manrope', size: 12 },
          autoSkip: false,
          maxRotation: 45,
        },
      },
      y: {
        // "suggested" bounds keep the design's 60–180 axis but still expand
        // automatically if a reading ever falls outside that range.
        suggestedMin: 60,
        suggestedMax: 180,
        ticks: { stepSize: 20, color: textColor, font: { family: 'Manrope', size: 12 } },
        grid: { color: 'rgba(7, 38, 53, 0.12)' },
        border: { display: false },
      },
    },
  };

  return (
    <div className="bp-chart">
      <Line
        data={data}
        options={options}
        role="img"
        aria-label={`Line chart of systolic and diastolic blood pressure, ${labels[0]} to ${labels[labels.length - 1]}`}
      />
    </div>
  );
}
