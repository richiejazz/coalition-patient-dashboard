// The only module that talks to the Coalition Technologies Patient Data API.
//
// The API has a single endpoint that returns every patient in one array.
// Jessica Taylor's full record is passed to the UI. For the sidebar list shown
// in the XD design, other records are reduced to name, gender, age, and photo;
// no medical or contact information for any other patient leaves this module.

const API_URL = import.meta.env.VITE_API_URL;
const API_USERNAME = import.meta.env.VITE_API_USERNAME;
const API_PASSWORD = import.meta.env.VITE_API_PASSWORD;

export const TARGET_PATIENT_NAME = 'Jessica Taylor';

// The XD design's sidebar shows the first 12 patients in API order.
const SIDEBAR_PATIENT_COUNT = 12;

// Keep only the fields the sidebar displays.
function toSidebarEntry(patient) {
  return {
    name: patient.name,
    gender: patient.gender,
    age: patient.age,
    profile_picture: patient.profile_picture,
  };
}

function buildSidebarList(patients, target) {
  const list = patients.slice(0, SIDEBAR_PATIENT_COUNT);
  // Make sure the selected patient is always listed, even if the API order changes.
  if (!list.includes(target)) list[list.length - 1] = target;
  return list.map(toSidebarEntry);
}

// Basic Auth expects "username:password" encoded as Base64.
// The header is built at request time; no encoded value is stored in source.
function buildAuthHeader() {
  return `Basic ${btoa(`${API_USERNAME}:${API_PASSWORD}`)}`;
}

async function readErrorMessage(response) {
  try {
    const body = await response.json();
    return body.error_message || response.statusText;
  } catch {
    return response.statusText;
  }
}

// Resolves to { patient, sidebarPatients }:
// - patient: Jessica Taylor's full record
// - sidebarPatients: [{ name, gender, age, profile_picture }] for the sidebar
export async function fetchDashboardData({ signal } = {}) {
  if (!API_URL || !API_USERNAME || !API_PASSWORD) {
    throw new Error(
      'API configuration is missing. Copy .env.example to .env.local and fill in the values.'
    );
  }

  const response = await fetch(API_URL, {
    method: 'GET',
    headers: { Authorization: buildAuthHeader() },
    signal,
  });

  if (!response.ok) {
    const message = await readErrorMessage(response);
    throw new Error(`Request failed (${response.status}): ${message}`);
  }

  const patients = await response.json();

  if (!Array.isArray(patients)) {
    throw new Error('Unexpected response format: expected a list of patients.');
  }

  const patient = patients.find((p) => p.name === TARGET_PATIENT_NAME);

  if (!patient) {
    throw new Error(`${TARGET_PATIENT_NAME} was not found in the API response.`);
  }

  return { patient, sidebarPatients: buildSidebarList(patients, patient) };
}
