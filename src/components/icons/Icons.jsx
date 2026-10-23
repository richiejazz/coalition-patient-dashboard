// Placeholder line icons.
// These stand in for the Adobe XD asset exports. To use the real assets,
// drop the SVG files into src/assets/icons/ and swap the matching component
// below for an <img> (or an imported SVG) — no other component needs to change.

function Svg({ size = 20, children, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const HomeIcon = (p) => (
  <Svg {...p}><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /></Svg>
);

export const PatientsIcon = (p) => (
  <Svg {...p}>
    <circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0113 0" />
    <circle cx="17" cy="9" r="2.5" /><path d="M16 14.2a5 5 0 016 4.8" />
  </Svg>
);

export const CalendarIcon = (p) => (
  <Svg {...p}>
    <rect x="3.5" y="5" width="17" height="15" rx="2" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </Svg>
);

export const MessageIcon = (p) => (
  <Svg {...p}><path d="M4 5h16v11H9l-5 4z" /></Svg>
);

export const CardIcon = (p) => (
  <Svg {...p}><rect x="3" y="5.5" width="18" height="13" rx="2" /><path d="M3 10h18M7 15h4" /></Svg>
);

export const SettingsIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z" />
  </Svg>
);

export const MoreVerticalIcon = (p) => (
  <Svg {...p} fill="currentColor" stroke="none">
    <circle cx="12" cy="5" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="12" cy="19" r="1.8" />
  </Svg>
);

export const MoreHorizontalIcon = (p) => (
  <Svg {...p} fill="currentColor" stroke="none">
    <circle cx="5" cy="12" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="19" cy="12" r="1.8" />
  </Svg>
);

export const SearchIcon = (p) => (
  <Svg {...p}><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /></Svg>
);

export const ChevronDownIcon = (p) => (
  <Svg {...p}><path d="M6 9l6 6 6-6" /></Svg>
);

export const ArrowUpIcon = (p) => (
  <Svg {...p} fill="currentColor" stroke="none"><path d="M12 6l6 8H6z" /></Svg>
);

export const ArrowDownIcon = (p) => (
  <Svg {...p} fill="currentColor" stroke="none"><path d="M12 18l-6-8h12z" /></Svg>
);

export const FemaleIcon = (p) => (
  <Svg {...p}><circle cx="12" cy="9" r="5" /><path d="M12 14v7M9 18h6" /></Svg>
);

export const MaleIcon = (p) => (
  <Svg {...p}><circle cx="10" cy="14" r="5" /><path d="M14 10l6-6M15 4h5v5" /></Svg>
);

export const PhoneIcon = (p) => (
  <Svg {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z" />
  </Svg>
);

export const ShieldIcon = (p) => (
  <Svg {...p}><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" /><path d="M9 12l2 2 4-4" /></Svg>
);

export const DownloadIcon = (p) => (
  <Svg {...p}><path d="M12 4v11M7 10l5 5 5-5M5 20h14" /></Svg>
);

// Colored vital-sign illustrations, drawn to resemble the XD assets
// (navy outline, colored fill). Substitutes until the XD exports are supplied.
export const LungsIcon = ({ size = 48, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" focusable="false" {...props}>
    <g stroke="#072635" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 14c-5 0-11 9-11 20 0 4 2 6 5 6 4 0 6-2 6-6z" fill="#7fcdf0" />
      <path d="M27 14c5 0 11 9 11 20 0 4-2 6-5 6-4 0-6-2-6-6z" fill="#7fcdf0" />
      <path d="M24 6v16M24 22l-3 4M24 22l3 4" fill="none" />
    </g>
  </svg>
);

export const ThermometerIcon = ({ size = 48, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" focusable="false" {...props}>
    <g stroke="#072635" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 29V10a4 4 0 018 0v19a7.5 7.5 0 11-8 0z" fill="#ffffff" />
      <circle cx="24" cy="35" r="4.5" fill="#e5484d" />
      <path d="M24 30V16" stroke="#e5484d" strokeWidth="3" />
      <path d="M31 12h3M31 16h2M31 20h3M31 24h2" fill="none" />
    </g>
  </svg>
);

export const HeartIcon = ({ size = 48, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" focusable="false" {...props}>
    <g stroke="#072635" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 40S7 30 7 18.5C7 13 11 9 16 9c3.5 0 6.3 2 8 5 1.7-3 4.5-5 8-5 5 0 9 4 9 9.5C41 30 24 40 24 40z" fill="#e5484d" />
      <path d="M9 23h9l2.5-4 3.5 8 2.5-4H39" fill="none" />
    </g>
  </svg>
);

// Tech.Care logo mark: a plus built from offset bars, as in the XD logo.
// Colors are from the XD CSS variables (#0BD984 green, #007BC7/#055A92/#0C3D5D blues).
export const LogoMark = ({ size = 36, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" aria-hidden="true" focusable="false" {...props}>
    <path d="M15 2l6 2v12h-6z" fill="#0bd984" />
    <path d="M21 16h13l-2 6H21z" fill="#0bd984" />
    <path d="M15 20h6v14l-6-2z" fill="#055a92" />
    <path d="M2 14h13v6H4z" fill="#007bc7" />
    <path d="M15 16h6v4h-6z" fill="#0c3d5d" />
  </svg>
);
