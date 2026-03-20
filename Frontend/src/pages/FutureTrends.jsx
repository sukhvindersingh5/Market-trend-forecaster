// src/pages/FutureTrends.jsx
import React, { useEffect, useState } from "react";
import { getForecasts } from "../services/futureTrendsService";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Area
} from "recharts";

  const FutureTrends = () => {
  const [brand, setBrand] = useState("echo-dot");
  const [horizon, setHorizon] = useState(7); // 7 or 30
  const [metric, setMetric] = useState("sentiment"); // 'sentiment' | 'volume'
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 useEffect(() => {
  const loadForecasts = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getForecasts({ brand, horizon });
      setData(res);
    } catch (err) {
      console.error(err);
      setError("Failed to load future trends. Please try again.");
    } finally {
      setLoading(false);
    }
  };

    loadForecasts();
  }, [brand, horizon]);

  const combinedSeries = React.useMemo(() => {
    if (!data) return [];
    const historyPoints = data.history.map(d => ({
      ...d,
      type: "history"
    }));
    const forecastPoints = data.forecast.map(d => ({
      ...d,
      type: "forecast"
    }));
    return [...historyPoints, ...forecastPoints];
  }, [data]);

  const formatSentiment = (v) => (v * 100).toFixed(0) + "%";

  return (
    <div className="panel">
      <div className="panel-header flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-100">Future Market Trends</h3>
          <p className="text-slate-400 text-sm">
            Forecasted {metric === "sentiment" ? "sentiment" : "mention volume"} for the next {horizon} days.
          </p>
        </div>

        <div className="flex gap-3">
          <select
            className="bg-slate-900/70 border border-slate-700 text-slate-100 rounded-xl px-3 py-2 text-sm"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          >
            <option value="echo-dot">Echo Dot</option>
            <option value="nest-mini">Nest Mini</option>
            <option value="homepod-mini">HomePod Mini</option>
          </select>

          <select
            className="bg-slate-900/70 border border-slate-700 text-slate-100 rounded-xl px-3 py-2 text-sm"
            value={horizon}
            onChange={(e) => setHorizon(Number(e.target.value))}
          >
            <option value={7}>Next 7 days</option>
            <option value={30}>Next 30 days</option>
          </select>

          <div className="flex bg-slate-900/70 border border-slate-700 rounded-xl overflow-hidden text-sm">
            <button
              className={`px-3 py-2 ${metric === "sentiment" ? "bg-primary/30 text-primary-100" : "text-slate-300"}`}
              onClick={() => setMetric("sentiment")}
            >
              Sentiment
            </button>
            <button
              className={`px-3 py-2 ${metric === "volume" ? "bg-primary/30 text-primary-100" : "text-slate-300"}`}
              onClick={() => setMetric("volume")}
            >
              Volume
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 text-sm text-red-300 bg-red-900/30 border border-red-700/60 rounded-xl px-4 py-2">
          {error}
        </div>
      )}

      {loading || !data ? (
        <div className="h-64 flex items-center justify-center text-slate-400">
          Loading future trends...
        </div>
      ) : (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <SummaryCard
              label="Avg forecast sentiment"
              value={formatSentiment(data.summary.avg_future_sentiment)}
            />
            <SummaryCard
              label="Change vs last week"
              value={(data.summary.delta_vs_last_week * 100).toFixed(1) + "%"}
              positive={data.summary.delta_vs_last_week >= 0}
            />
            <SummaryCard
              label="Risk level"
              value={data.summary.risk_level.toUpperCase()}
            />
          </div>

          {/* Chart */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={combinedSeries}>
                <XAxis dataKey="date" tick={{ fill: "#64748b", fontSize: 12 }} />
                <YAxis
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  tickFormatter={metric === "sentiment" ? (v) => (v * 100).toFixed(0) + "%" : undefined}
                />
                <Tooltip
                  contentStyle={{
                    background: "#020617",
                    border: "1px solid #1e293b",
                    borderRadius: "0.75rem",
                    color: "#e5e7eb",
                    fontSize: 12
                  }}
                  formatter={(value,) => {
                    if (metric === "sentiment") return [formatSentiment(value), "Sentiment"];
                    return [value, "Volume"];
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey={metric}
                  data={combinedSeries.filter(d => d.type === "history")}
                  stroke="#38bdf8"
                  strokeWidth={2}
                  dot={false}
                  name="History"
                />
                <Line
                  type="monotone"
                  dataKey={metric}
                  data={combinedSeries.filter(d => d.type === "forecast")}
                  stroke="#a855f7"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={false}
                  name="Forecast"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

const SummaryCard = ({ label, value, positive }) => (
  <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 flex flex-col gap-1">
    <span className="text-xs uppercase tracking-wide text-slate-400">{label}</span>
    <span className="text-xl font-bold text-slate-100">{value}</span>
    {typeof positive === "boolean" && (
      <span className={`text-xs ${positive ? "text-emerald-400" : "text-rose-400"}`}>
        {positive ? "Expected improvement" : "Expected decline"}
      </span>
    )}
  </div>
);

export default FutureTrends;
