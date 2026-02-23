import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import BrandComparison from "../pages/BrandComparison";  // ✅
import DashboardLayout from "../components/DashboardLayout";  // ✅
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* DASHBOARD LAYOUT */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
              <Route index element={<Dashboard />} />                           {/* /dashboard */}
        <Route path="brands" element={<BrandComparison />} />            {/* /dashboard/brands */}
        <Route path="alerts" element={<div>Alerts Page (Coming Soon)</div>} />
        <Route path="reports" element={<div>Reports Page (Coming Soon)</div>} />
        <Route path="chatbot" element={<div>AI Chatbot (Coming Soon)</div>} />
      </Route>
      
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
