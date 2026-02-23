import React from "react";

const KpiRow = ({ summary }) => {
  return (
    <section className="kpi-row">
      <div className="kpi-card">
        <span className="kpi-label">Overall Sentiment</span>
        <span className="kpi-value">
          {summary.overallSentiment.toFixed(2)}
        </span>
      </div>
      <div className="kpi-card">
        <span className="kpi-label">Total Mentions</span>
        <span className="kpi-value">{summary.mentions}</span>
      </div>
      <div className="kpi-card">
        <span className="kpi-label">Positive / Negative</span>
        <span className="kpi-value">
          {summary.positivePct}% / {summary.negativePct}%
        </span>
      </div>
      <div className="kpi-card">
        <span className="kpi-label">Active Alerts</span>
        <span className="kpi-value">{summary.activeAlerts}</span>
      </div>
    </section>
  );
};

export default KpiRow;
