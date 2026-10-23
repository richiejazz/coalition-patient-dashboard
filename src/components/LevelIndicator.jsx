import { ArrowDownIcon, ArrowUpIcon } from './icons/Icons';
import './LevelIndicator.css';

// Shows the API's "levels" text, e.g. "Higher than Average",
// with an up/down arrow when the reading is outside the normal range.
export default function LevelIndicator({ level }) {
  if (!level) return null;

  const text = level.toLowerCase();
  let Arrow = null;
  if (text.startsWith('higher')) Arrow = ArrowUpIcon;
  if (text.startsWith('lower')) Arrow = ArrowDownIcon;

  return (
    <p className="level-indicator">
      {Arrow && <Arrow size={12} />}
      <span>{level}</span>
    </p>
  );
}
