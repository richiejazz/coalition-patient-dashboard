import LevelIndicator from './LevelIndicator';
import './VitalCard.css';

// One reusable card for a single vital sign.
// `variant` picks the pastel background: "respiratory" | "temperature" | "heart".
export default function VitalCard({ title, value, unit, level, Icon, variant }) {
  return (
    <article className={`vital-card vital-card--${variant}`}>
      <span className="vital-card__icon" aria-hidden="true">
        <Icon size={48} />
      </span>
      <h3 className="vital-card__title">{title}</h3>
      <p className="vital-card__value">
        {value ?? '—'}
        {value != null && unit}
      </p>
      <LevelIndicator level={level} />
    </article>
  );
}
