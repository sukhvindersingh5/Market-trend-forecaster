import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
    Filler 
} from "chart.js";
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TrendPanel = ({ trend }) => {
  const chartData = {
    labels: trend?.map(item => item.date) || [],
    datasets: [
      {
        label: "Sentiment Score",
        data: trend?.map(item => item.sentiment) || [],
        borderColor: "rgba(56, 189, 248, 1)",
        backgroundColor: "rgba(56, 189, 248, 0.1)",
        tension: 0.4,
        fill: true,
        yAxisID: "y-sentiment",
        pointRadius: 6,
        pointHoverRadius: 8,
      },
      {
        label: "Volume (Mentions)",
        data: trend?.map(item => item.mentions) || [],
        borderColor: "rgba(34, 197, 94, 1)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        tension: 0.4,
        fill: true,
        yAxisID: "y-volume",
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "top" },
    title: { display: false },
  },
  scales: {
   x: {
  grid: { color: "rgba(148, 163, 184, 0.2)" },
  ticks: {
    color: "#94a3b8",
    maxRotation: 45,
    callback: function(value, index, ticks) {
      // Get date from your trend data
      if (trend && trend[index]) {
        const date = new Date(trend[index].date);
        return date.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        }); // "Feb 15"
      }
      return '';
    }
  },
},


      
      "y-sentiment": {
        type: "linear",
        position: "left",
        min: -1,
        max: 1,
        grid: { drawOnChartArea: false },
        ticks: {
          color: "rgba(56, 189, 248, 0.8)",
          callback: function(value) {
            return (value * 100).toFixed(0) + "%";
          },
        },
        title: {
          display: true,
          text: "Sentiment Score",
          color: "#38bdf8",
        },
      },
      "y-volume": {
        type: "linear",
        position: "right",
        grid: { drawOnChartArea: false },
        ticks: { color: "rgba(34, 197, 94, 0.8)" },
        title: {
          display: true,
          text: "Mentions",
          color: "#22c55e",
        },
      },
    },
    interaction: { intersect: false, mode: "index" },
  };

  return (
    <div className="panel">
      {/* BRAND SUMMARY */}
      <div className="brand-breakdown">
        <div className="brand-metric echo">
          <div className="brand-name">Echo Dot</div>
          <div className="brand-sentiment">+15%</div>
          <div className="brand-volume">1,200</div>
        </div>
        <div className="brand-metric nest">
          <div className="brand-name">Nest Mini</div>
          <div className="brand-sentiment">-45%</div>
          <div className="brand-volume">890</div>
        </div>
        <div className="brand-metric homepod">
          <div className="brand-name">HomePod</div>
          <div className="brand-sentiment">+32%</div>
          <div className="brand-volume">589</div>
        </div>
      </div>

      {/* CHART HEADER */}
      <div className="panel-header">
        <h3>Sentiment & Volume Over Time</h3>
        <span className="chart-subtitle">Filtered by global brand selection</span>
      </div>

      <div style={{ height: "320px", position: "relative" }}>
        {trend && trend.length > 0 ? (
          <Line data={chartData} options={options} />
        ) : (
          <div className="chart-placeholder">
            <div>📈</div>
            <div style={{ marginTop: "8px" }}>Sentiment trend data loading...</div>
            <div style={{ fontSize: "0.9rem", opacity: 0.7 }}>
              2,679 reviews analyzed across all channels
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendPanel;
