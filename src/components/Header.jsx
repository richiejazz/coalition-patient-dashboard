import {
  CalendarIcon,
  CardIcon,
  HomeIcon,
  LogoMark,
  MessageIcon,
  MoreVerticalIcon,
  PatientsIcon,
  SettingsIcon,
} from './icons/Icons';
// Doctor portrait exported from the XD Assets panel (88×88, 2× the header size).
import doctorPortraitUrl from '../assets/doctor-portrait.png';
import './Header.css';

// Only "Patients" is a real page in this single-page build, so the other
// items are rendered for visual accuracy but are not wired to any route.
const NAV_ITEMS = [
  { label: 'Overview', Icon: HomeIcon },
  { label: 'Patients', Icon: PatientsIcon, active: true },
  { label: 'Schedule', Icon: CalendarIcon },
  { label: 'Message', Icon: MessageIcon },
  { label: 'Transactions', Icon: CardIcon },
];

// Doctor details are static design content from the mockup, not API data.
const DOCTOR = {
  name: 'Dr. Jose Simmons',
  role: 'General Practitioner',
};

export default function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <LogoMark className="header__logo-mark" />
        <span className="header__logo-text">
          Tech<span className="header__logo-dot">.</span>Care
        </span>
      </div>

      <nav className="header__nav" aria-label="Main">
        <ul>
          {NAV_ITEMS.map(({ label, Icon, active }) => (
            <li key={label}>
              <a
                href="#"
                className={`header__nav-link${active ? ' header__nav-link--active' : ''}`}
                aria-current={active ? 'page' : undefined}
                onClick={(event) => event.preventDefault()}
              >
                <Icon size={16} />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="header__doctor">
        <img
          className="header__doctor-avatar"
          src={doctorPortraitUrl}
          alt={DOCTOR.name}
          width={44}
          height={44}
        />
        <div className="header__doctor-info">
          <p className="header__doctor-name">{DOCTOR.name}</p>
          <p className="header__doctor-role">{DOCTOR.role}</p>
        </div>
        <span className="header__divider" aria-hidden="true" />
        <span className="header__icon" aria-hidden="true"><SettingsIcon size={19} /></span>
        <span className="header__icon" aria-hidden="true"><MoreVerticalIcon size={19} /></span>
      </div>
    </header>
  );
}
