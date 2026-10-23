import './StatusMessage.css';

// Full-width message shown while loading or when the API request fails.
export default function StatusMessage({ title, children, isError = false }) {
  return (
    <div className="panel status-message" role={isError ? 'alert' : 'status'}>
      <h2 className="panel-title">{title}</h2>
      {children && <p className="status-message__detail">{children}</p>}
    </div>
  );
}
