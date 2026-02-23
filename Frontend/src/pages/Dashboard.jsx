import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";  

import "../styles/dashboard.css";
import { getDashboardOverview } from "../services/dashboardService";
import KpiRow from "../components/dashboard/KpiRow";
import TrendPanel from "../components/dashboard/TrendPanel";
import TopicsPanel from "../components/dashboard/TopicsPanel";
import ChannelsPanel from "../components/dashboard/ChannelsPanel";
import AlertsPreviewPanel from "../components/dashboard/AlertsPreviewPanel";
import SummaryPanel from "../components/dashboard/SummaryPanel";




const Dashboard = () => {
  const navigate = useNavigate();
    const location = useLocation();
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filters - NO TIME FILTER, only real channels + brands
  const [filters, setFilters] = useState({
    channel: "all",
    brand: "all",
  });

  const brandOptions = [
    { id: "all", label: "All brands" },
    { id: "echo-dot", label: "Amazon Echo Dot" },
    { id: "nest-mini", label: "Google Nest Mini" },
    { id: "homepod-mini", label: "Apple HomePod Mini" },
  ];

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const overview = await getDashboardOverview(filters);
        setData(overview);
      } catch (error) {
        console.error("Dashboard load error:", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [filters.channel, filters.brand]); 

  if (loading) {
    return (
     
        
        <div className="dashboard" style={{ padding: "100px", textAlign: "center" }}>
          <div>Loading dashboard...</div>
        </div>
      
    );
  }

    if (!data) {
      return (
        <div className="dashboard empty-state">
          <div style={{ padding: "100px", textAlign: "center", color: "#94a3b8" }}>
            No dashboard data available
          </div>
        </div>
      );
    }

  return (
    <div className="app-shell">
     


  {/* 2. MAIN CONTENT (RIGHT) */}
  <main className="dashboard">
    {/* Header */}
    <header className="dash-header">
      <h2>Dashboard</h2>
      <p className="dash-subtitle">AI Market Trend & Consumer Sentiment Analysis</p>
    </header>
    
    



          {/* Filters - Only Channel + Brand */}
          <section className="dash-filters">
            <select
              value={filters.channel}
              onChange={(e) =>
                setFilters((f) => ({ ...f, channel: e.target.value }))
              }
            >
              <option value="all">All Channels</option>
              <option value="amazon-reviews">Amazon Reviews</option>
              <option value="youtube">YouTube Comments</option>
              <option value="news">News Articles</option>
              <option value="web-reviews">Review Sites</option>
            </select>

            <select
              value={filters.brand}
              onChange={(e) =>
                setFilters((f) => ({ ...f, brand: e.target.value }))
              }
            >
              {brandOptions.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.label}
                </option>
              ))}
            </select>
          </section>

          {/* KPI Cards */}
          <KpiRow summary={data.summary} />

          {/* Main Grid: Trend + Topics */}
          <section className="dash-grid">
            <TrendPanel trend={data.trend} />
            <TopicsPanel topics={data.topics} />
          </section>

          {/* Bottom Grid: Channels + Alerts + Summary */}
          <section className="dash-grid-bottom">
            <ChannelsPanel channels={data.channels} />
            <AlertsPreviewPanel alerts={data.alerts} />
            <SummaryPanel text={data.summaryText} />
          </section>
        </main>
      </div>
    
  );
};

export default Dashboard;
