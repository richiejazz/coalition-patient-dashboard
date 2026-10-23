import './DiagnosticList.css';

export default function DiagnosticList({ diagnostics = [] }) {
  return (
    <section className="panel diagnostic-list" aria-labelledby="diagnostic-list-title">
      <h2 id="diagnostic-list-title" className="panel-title">Diagnostic List</h2>

      {diagnostics.length === 0 ? (
        <p className="diagnostic-list__empty">No diagnoses recorded.</p>
      ) : (
        <div className="diagnostic-list__scroll scroll-list">
          <table className="diagnostic-list__table">
            <thead>
              <tr>
                <th scope="col">Problem/Diagnosis</th>
                <th scope="col">Description</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {diagnostics.map((item) => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
