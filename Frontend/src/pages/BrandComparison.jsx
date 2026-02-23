import '../styles/brandcomparison.css';

import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
     
} from 'chart.js';
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const BrandComparison = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with real API later
  useEffect(() => {
    const mockData = [
      {
        name: "Echo Dot",
        sentiment: 0.15,
        mentions: 1200,
        positive: 62,
        negative: 18,
        trend: [
          { date: "2026-02-15", sentiment: 0.12, mentions: 180 },
          { date: "2026-02-16", sentiment: 0.18, mentions: 200 },
          { date: "2026-02-17", sentiment: 0.14, mentions: 190 },
        ]
      },
      {
        name: "Nest Mini",
        sentiment: -0.45,
        mentions: 890,
        positive: 28,
        negative: 52,
        trend: [
          { date: "2026-02-15", sentiment: -0.42, mentions: 140 },
          { date: "2026-02-16", sentiment: -0.48, mentions: 160 },
          { date: "2026-02-17", sentiment: -0.45, mentions: 150 },
        ]
      },
      {
        name: "HomePod Mini",
        sentiment: 0.32,
        mentions: 589,
        positive: 71,
        negative: 12,
        trend: [
          { date: "2026-02-15", sentiment: 0.28, mentions: 90 },
          { date: "2026-02-16", sentiment: 0.35, mentions: 110 },
          { date: "2026-02-17", sentiment: 0.33, mentions: 105 },
        ]
      }
    ];
    setBrands(mockData);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="page-loading">
        <div>Loading brand comparison...</div>
      </div>
    );
  }

//   useEffect(() => {
//   async function loadBrands() {
//     setLoading(true);
//     try {
//       const data = await getBrandComparison(dateRange);  // ✅ Real API call
//       setBrands(data);
//     } catch (error) {
//       console.error('Brand comparison error:', error);
//       // Fallback to mock data if needed
//     } finally {
//       setLoading(false);
//     }
//   }
  
//   loadBrands();
// }, [dateRange]);
  return (
    <div className="brand-comparison">
      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h1>Brand Comparison</h1>
          <p>Side-by-side analysis of smart speaker performance</p>
        </div>
        <div className="page-controls">
          <select className="date-filter">
            <option>30 Days</option>
            <option>7 Days</option>
            <option>90 Days</option>
          </select>
         
        </div>
      </div>

      {/* METRICS TABLE */}
      <div className="metrics-section">
        <h2>Key Metrics</h2>
        <div className="metrics-table">
          <table>
            <thead>
              <tr>
                <th>Brand</th>
                <th>Sentiment</th>
                <th>Mentions</th>
                <th>Positive %</th>
                <th>Negative %</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand, index) => (
                <tr key={brand.name} className={`brand-row brand-${index}`}>
                  <td>
                    <strong>{brand.name}</strong>
                  </td>
                  <td className={brand.sentiment >= 0 ? 'positive' : 'negative'}>
                    {(brand.sentiment * 100).toFixed(1)}%
                  </td>
                  <td>{brand.mentions.toLocaleString()}</td>
                  <td>{brand.positive}%</td>
                  <td className="negative">{brand.negative}%</td>
                  <td>↗️ +{(brand.sentiment * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TRENDS CHARTS */}
      <div className="trends-section">
        <h2>Sentiment Trends</h2>
        <div className="charts-grid">
          {brands.map((brand) => (
            <div key={brand.name} className="trend-card">
              <h3>{brand.name}</h3>
              <div style={{ height: '300px' }}>
                <Line
                  data={{
                    labels: brand.trend.map(d => new Date(d.date).toLocaleDateString('short')),
                    datasets: [{
                      label: 'Sentiment Score',
                      data: brand.trend.map(d => d.sentiment),
                      borderColor: '#38bdf8',
                      backgroundColor: 'rgba(56, 189, 248, 0.1)',
                      fill: true,
                      tension: 0.4
                    }]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        min: -1,
                        max: 1,
                        ticks: {
                          callback: (value) => (value * 100).toFixed(0) + '%'
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* VOLUME COMPARISON */}
      <div className="volume-section">
        <h2>Mentions Volume</h2>
        <div style={{ height: '400px' }}>
          <Bar
            data={{
              labels: brands.map(b => b.name),
              datasets: [{
                label: 'Total Mentions',
                data: brands.map(b => b.mentions),
                backgroundColor: [
                  'rgba(56, 189, 248, 0.8)',
                  'rgba(34, 197, 94, 0.8)',
                  'rgba(239, 68, 68, 0.8)'
                ]
              }]
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BrandComparison;
