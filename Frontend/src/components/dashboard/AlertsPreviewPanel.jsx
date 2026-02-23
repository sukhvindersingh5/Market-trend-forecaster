import React from "react";

const AlertsPreviewPanel = ({ alerts }) => {
  return (
    <div className="panel">
      <div className="panel-header">
        <h3>Alerts</h3>
      </div>
      <ul className="alerts-list">
        {alerts.map((a, idx) => (
          <li key={idx}>
          <span className={`alert-level alert-${a.level.toLowerCase()}`}>
            {a.level.toUpperCase()}
          </span>
            <span className="alert-message">{a.message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertsPreviewPanel;
