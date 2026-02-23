import React from "react";

const ChannelsPanel = ({ channels }) => {
  return (
    <div className="panel">
      <div className="panel-header">
        <h3>By Channel</h3>
      </div>
      <ul className="channels-list">
        {channels.map((c) => (
          <li key={c.name}>
            <span>{c.name}</span>
            <span>
              {c.mentions} · sentiment {c.sentiment.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelsPanel;
