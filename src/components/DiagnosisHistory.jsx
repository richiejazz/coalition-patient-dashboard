import BloodPressureChart from './BloodPressureChart';
import LevelIndicator from './LevelIndicator';
import VitalCard from './VitalCard';
import { ChevronDownIcon, HeartIcon, LungsIcon, ThermometerIcon } from './icons/Icons';
import { getBloodPressureSeries, getLatestReading } from '../utils/formatters';
import './DiagnosisHistory.css';

const CHART_MONTHS = 6;

function BloodPressureSummary({ label, reading, modifier }) {
  return (
    <div className="bp-summary">
      <p className="bp-summary__label">
        <span className={`bp-summary__dot bp-summary__dot--${modifier}`} aria-hidden="true" />
        {label}
      </p>
      <p className="bp-summary__value">{reading?.value ?? '—'}</p>
      <LevelIndicator level={reading?.levels} />
    </div>
  );
}

export default function DiagnosisHistory({ history = [] }) {
  const latest = getLatestReading(history);
  const series = getBloodPressureSeries(history, CHART_MONTHS);

  return (
    <section className="panel diagnosis-history" aria-labelledby="diagnosis-history-title">
      <h2 id="diagnosis-history-title" className="panel-title">Diagnosis History</h2>

      {!latest ? (
        <p className="diagnosis-history__empty">No diagnosis history available.</p>
      ) : (
        <>
          <div className="bp-panel">
            <div className="bp-panel__chart">
              <div className="bp-panel__header">
                <h3 className="bp-panel__title">Blood Pressure</h3>
                {/* Static label — range switching is not required by the assessment. */}
                <span className="bp-panel__range">
                  Last {CHART_MONTHS} months
                  <ChevronDownIcon size={14} />
                </span>
              </div>
              <BloodPressureChart {...series} />
            </div>

            <div className="bp-panel__legend">
              <BloodPressureSummary
                label="Systolic"
                reading={latest.blood_pressure?.systolic}
                modifier="systolic"
              />
              <hr className="bp-panel__divider" />
              <BloodPressureSummary
                label="Diastolic"
                reading={latest.blood_pressure?.diastolic}
                modifier="diastolic"
              />
            </div>
          </div>

          <div className="diagnosis-history__vitals">
            <VitalCard
              title="Respiratory Rate"
              value={latest.respiratory_rate?.value}
              unit=" bpm"
              level={latest.respiratory_rate?.levels}
              Icon={LungsIcon}
              variant="respiratory"
            />
            <VitalCard
              title="Temperature"
              value={latest.temperature?.value}
              unit="°F"
              level={latest.temperature?.levels}
              Icon={ThermometerIcon}
              variant="temperature"
            />
            <VitalCard
              title="Heart Rate"
              value={latest.heart_rate?.value}
              unit=" bpm"
              level={latest.heart_rate?.levels}
              Icon={HeartIcon}
              variant="heart"
            />
          </div>
        </>
      )}
    </section>
  );
}
