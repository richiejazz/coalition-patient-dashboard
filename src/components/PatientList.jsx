import Avatar from './Avatar';
import { MoreHorizontalIcon, SearchIcon } from './icons/Icons';
import './PatientList.css';

// Sidebar list from the XD design. Each entry carries only name, gender, age,
// and photo (see patientApi.js); Jessica Taylor's row is shown as selected.
// Rows are display-only: search and the row menus are visual only.
function formatDemographics(patient) {
  return [patient.gender, patient.age].filter((v) => v != null && v !== '').join(', ');
}

export default function PatientList({ patients = [], selectedName }) {
  return (
    <section className="panel patient-list" aria-labelledby="patient-list-title">
      <div className="patient-list__header">
        <h2 id="patient-list-title" className="panel-title">Patients</h2>
        <SearchIcon size={18} />
      </div>

      <ul className="patient-list__items scroll-list">
        {patients.map((patient, index) => {
          const isSelected = patient.name === selectedName;
          return (
            <li
              key={`${patient.name}-${index}`}
              className={`patient-list__item${isSelected ? ' patient-list__item--active' : ''}`}
              aria-current={isSelected ? 'true' : undefined}
            >
              <Avatar src={patient.profile_picture} name={patient.name} className="patient-list__avatar" />
              <div className="patient-list__details">
                <p className="patient-list__name">{patient.name}</p>
                <p className="patient-list__meta">{formatDemographics(patient)}</p>
              </div>
              <MoreHorizontalIcon size={18} className="patient-list__menu" />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
