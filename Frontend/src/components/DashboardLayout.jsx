import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
// REMOVE AppNavbar import - EMBED navbar directly

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="dashboard-layout">
      {/* ✅ EMBEDDED NAVBAR - NO EXTERNAL COMPONENT */}
      <header className="app-topbar">
        <div className="app-brand">AI Market Forecaster</div>
        <button
          type="button"
          className="profile-icon-btn"
          aria-label="Profile"
          onClick={() => navigate("/profile")}
        >
          <svg className="profile-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path 
              d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" 
              fill="currentColor"
            />
          </svg>
        </button>
      </header>

      {/* ✅ CORRECT PATHS FOR NESTED ROUTES */}
      <div className="app-main">
        <aside className="app-sidebar">
          <nav className="sidebar-nav">
            <button 
              className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`} 
              onClick={() => navigate("/dashboard")}
            >
              <span>📊</span> Overview
            </button>
            <button 
              className={`nav-item ${location.pathname === '/dashboard/brands' ? 'active' : ''}`} 
              onClick={() => navigate("/dashboard/brands")}
            >
              <span>⚖️</span> Brand Comparison
            </button>
            <button 
              className={`nav-item ${location.pathname === '/dashboard/alerts' ? 'active' : ''}`} 
              onClick={() => navigate("/dashboard/alerts")}
            >
              <span>🔔</span> Alerts
            </button>
            <button 
              className="nav-item" 
              onClick={() => navigate("/dashboard/reports")}
            >
              <span>📋</span> Reports
            </button>
            <button 
              className="nav-item" 
              onClick={() => navigate("/dashboard/chatbot")}
            >
              <span>🤖</span> AI Chatbot
            </button>
          </nav>
        </aside>

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
