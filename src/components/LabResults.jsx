import { DownloadIcon } from './icons/Icons';
import './LabResults.css';

// Lab result names come straight from the API. The download icons are visual
// only, as the API provides no files to download.
export default function LabResults({ results = [] }) {
  return (
    <section className="panel lab-results" aria-labelledby="lab-results-title">
      <h2 id="lab-results-title" className="panel-title">Lab Results</h2>

      {results.length === 0 ? (
        <p className="lab-results__empty">No lab results available.</p>
      ) : (
        <ul className="lab-results__list scroll-list">
          {results.map((result) => (
            <li className="lab-results__item" key={result}>
              <span>{result}</span>
              <DownloadIcon size={20} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
