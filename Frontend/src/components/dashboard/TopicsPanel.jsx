import React from "react";

const TopicsPanel = ({ topics }) => {
  return (
    <div className="panel">
      <div className="panel-header">
        <h3>Top Topics</h3>
      </div>
      <ul className="topics-list">
        {topics.map((t) => (
          <li key={t.name}>
            <span>{t.name}</span>
            <span className="topic-badge">
              {t.sentiment.toFixed(2)} · {t.mentions} mentions
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopicsPanel;
