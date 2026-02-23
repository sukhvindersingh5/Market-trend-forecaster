import React from "react";

const SummaryPanel = ({ text }) => {
  return (
    <div className="panel">
      <div className="panel-header">
        <h3>AI Summary</h3>
      </div>
      <div className="panel-body">
        <p className="summary-text">{text}</p>
      </div>
    </div>
  );
};

export default SummaryPanel;
