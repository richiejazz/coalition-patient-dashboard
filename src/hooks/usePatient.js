import { useEffect, useState } from 'react';
import { fetchDashboardData } from '../services/patientApi';

// Loads the dashboard data once and exposes
// { status, patient, sidebarPatients, error }.
// status is one of: 'loading' | 'success' | 'error'.
export function usePatient() {
  const [state, setState] = useState({
    status: 'loading',
    patient: null,
    sidebarPatients: [],
    error: null,
  });

  useEffect(() => {
    // Cancel the request if the component unmounts before it finishes.
    const controller = new AbortController();

    fetchDashboardData({ signal: controller.signal })
      .then(({ patient, sidebarPatients }) =>
        setState({ status: 'success', patient, sidebarPatients, error: null })
      )
      .catch((error) => {
        if (error.name === 'AbortError') return;
        setState({ status: 'error', patient: null, sidebarPatients: [], error });
      });

    return () => controller.abort();
  }, []);

  return state;
}
