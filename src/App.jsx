import Header from './components/Header';
import PatientList from './components/PatientList';
import DiagnosisHistory from './components/DiagnosisHistory';
import DiagnosticList from './components/DiagnosticList';
import PatientProfile from './components/PatientProfile';
import LabResults from './components/LabResults';
import StatusMessage from './components/StatusMessage';
import { usePatient } from './hooks/usePatient';
import './styles/global.css';

function Dashboard({ patient, sidebarPatients }) {
  return (
    <main className="dashboard">
      <aside className="dashboard__column dashboard__column--left">
        <PatientList patients={sidebarPatients} selectedName={patient.name} />
      </aside>

      <div className="dashboard__column dashboard__column--center">
        <DiagnosisHistory history={patient.diagnosis_history} />
        <DiagnosticList diagnostics={patient.diagnostic_list} />
      </div>

      <div className="dashboard__column dashboard__column--right">
        <PatientProfile patient={patient} />
        <LabResults results={patient.lab_results} />
      </div>
    </main>
  );
}

export default function App() {
  const { status, patient, sidebarPatients, error } = usePatient();

  return (
    <div className="app">
      <Header />

      {status === 'loading' && <StatusMessage title="Loading patient data…" />}

      {status === 'error' && (
        <StatusMessage title="Could not load patient data" isError>
          {error.message}
        </StatusMessage>
      )}

      {status === 'success' && <Dashboard patient={patient} sidebarPatients={sidebarPatients} />}
    </div>
  );
}
