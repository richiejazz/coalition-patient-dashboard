// Vercel serverless function: GET /api/patients
//
// Server-side proxy for the Coalition Technologies Patient Data API. The API
// credentials stay on the server (COALITION_API_USERNAME / _PASSWORD, never
// bundled into browser code), and the upstream response is filtered here so
// the browser only receives what the dashboard displays:
// - patient: Jessica Taylor's full record
// - sidebarPatients: name, gender, age, and photo for the 12 sidebar rows
//
// Written against plain Node request/response objects so the same handler
// also runs inside the Vite dev server (see vite.config.js).

const DEFAULT_API_URL = 'https://fedskillstest.coalitiontechnologies.workers.dev';
const TARGET_PATIENT_NAME = 'Jessica Taylor';

// The XD design's sidebar shows the first 12 patients in API order.
const SIDEBAR_PATIENT_COUNT = 12;

function sendJson(res, status, body, headers = {}) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  for (const [name, value] of Object.entries(headers)) res.setHeader(name, value);
  res.end(JSON.stringify(body));
}

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

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return sendJson(res, 405, { error: 'Method not allowed.' }, { Allow: 'GET' });
  }

  const username = process.env.COALITION_API_USERNAME;
  const password = process.env.COALITION_API_PASSWORD;
  const apiUrl = process.env.COALITION_API_URL || DEFAULT_API_URL;

  if (!username || !password) {
    return sendJson(res, 500, { error: 'The server is missing its API configuration.' });
  }

  let upstream;
  try {
    upstream = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
      },
    });
  } catch {
    return sendJson(res, 502, { error: 'Could not reach the patient data service.' });
  }

  // Upstream error bodies are not forwarded, so nothing about the
  // server's credentials or configuration leaks to the browser.
  if (!upstream.ok) {
    return sendJson(res, 502, { error: `The patient data service responded with ${upstream.status}.` });
  }

  let patients;
  try {
    patients = await upstream.json();
  } catch {
    return sendJson(res, 502, { error: 'The patient data service returned an invalid response.' });
  }

  if (!Array.isArray(patients)) {
    return sendJson(res, 502, { error: 'The patient data service returned an unexpected format.' });
  }

  const patient = patients.find((p) => p.name === TARGET_PATIENT_NAME);
  if (!patient) {
    return sendJson(res, 404, { error: `${TARGET_PATIENT_NAME} was not found in the patient data.` });
  }

  // The API serves static demo data, so a short CDN cache avoids repeat upstream calls.
  return sendJson(
    res,
    200,
    { patient, sidebarPatients: buildSidebarList(patients, patient) },
    { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' }
  );
}
