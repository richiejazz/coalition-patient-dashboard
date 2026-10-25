// The only module that requests patient data.
//
// The browser calls this app's own /api/patients endpoint, a server-side
// proxy (api/patients.js) that holds the API credentials and forwards only
// what the dashboard displays: Jessica Taylor's full record, plus name,
// gender, age, and photo for the sidebar. No credentials exist in browser code.

const API_ENDPOINT = '/api/patients';

async function readErrorMessage(response) {
  try {
    const body = await response.json();
    return body.error || response.statusText;
  } catch {
    return response.statusText;
  }
}

// Resolves to { patient, sidebarPatients }:
// - patient: Jessica Taylor's full record
// - sidebarPatients: [{ name, gender, age, profile_picture }] for the sidebar
export async function fetchDashboardData({ signal } = {}) {
  const response = await fetch(API_ENDPOINT, { method: 'GET', signal });

  if (!response.ok) {
    const message = await readErrorMessage(response);
    throw new Error(`Request failed (${response.status}): ${message}`);
  }

  const data = await response.json();

  if (!data || typeof data.patient !== 'object' || !Array.isArray(data.sidebarPatients)) {
    throw new Error('Unexpected response format from the patient data endpoint.');
  }

  return data;
}
