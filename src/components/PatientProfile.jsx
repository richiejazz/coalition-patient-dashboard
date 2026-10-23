import {
  CalendarIcon,
  FemaleIcon,
  MaleIcon,
  PhoneIcon,
  ShieldIcon,
} from './icons/Icons';
import Avatar from './Avatar';
import { formatDateOfBirth } from '../utils/formatters';
import './PatientProfile.css';

export default function PatientProfile({ patient }) {
  const GenderIcon = patient.gender === 'Male' ? MaleIcon : FemaleIcon;

  // Each row is a label, a value, and an icon — all values come from the API.
  const fields = [
    {
      label: 'Date Of Birth',
      value: patient.date_of_birth ? formatDateOfBirth(patient.date_of_birth) : null,
      Icon: CalendarIcon,
    },
    { label: 'Gender', value: patient.gender, Icon: GenderIcon },
    { label: 'Contact Info.', value: patient.phone_number, Icon: PhoneIcon },
    { label: 'Emergency Contacts', value: patient.emergency_contact, Icon: PhoneIcon },
    { label: 'Insurance Provider', value: patient.insurance_type, Icon: ShieldIcon },
  ];

  return (
    <section className="panel patient-profile" aria-labelledby="patient-profile-name">
      <Avatar
        className="patient-profile__photo"
        src={patient.profile_picture}
        name={patient.name}
        alt={`Portrait of ${patient.name}`}
      />
      <h2 id="patient-profile-name" className="patient-profile__name">{patient.name}</h2>

      <dl className="patient-profile__fields">
        {fields.map(({ label, value, Icon }) => (
          <div className="patient-profile__field" key={label}>
            <span className="patient-profile__icon" aria-hidden="true">
              <Icon size={20} />
            </span>
            <div>
              <dt className="patient-profile__label">{label}</dt>
              <dd className="patient-profile__value">{value || '—'}</dd>
            </div>
          </div>
        ))}
      </dl>

      {/* Visual only — the assessment does not require this to open anything. */}
      <button type="button" className="patient-profile__button">
        Show All Information
      </button>
    </section>
  );
}
