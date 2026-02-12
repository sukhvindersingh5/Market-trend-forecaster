import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/landing.css";

import echo from "../assets/echo.png";
import nest from "../assets/nest.png";
import homepod from "../assets/homepod.png";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <h1>
          AI-Powered Market Trend & Consumer Sentiment Analysis
        </h1>
        <p>
          Compare and analyze real-time consumer sentiment and market trends
          for top smart speakers using Artificial Intelligence.
        </p>

        <div className="hero-buttons">
          <button onClick={() => navigate("/login")} className="primary-btn">
            Explore Dashboard
          </button>
          <button onClick={() => navigate("/signup")} className="secondary-btn">
            Get Started
          </button>
        </div>
      </section>

      {/* Products Section */}
      <section className="products">
        <h2>Products We Analyze</h2>
        <div className="product-grid">
          <div className="product-card">
            <img src={echo} alt="Amazon Echo Dot" />
            <h3>Amazon Echo Dot</h3>
            <p>Alexa-powered smart speaker with strong smart home integration.</p>
          </div>

          <div className="product-card">
            <img src={nest} alt="Google Nest Mini" />
            <h3>Google Nest Mini</h3>
            <p>Google Assistant smart speaker with voice intelligence.</p>
          </div>

          <div className="product-card">
            <img src={homepod} alt="Apple HomePod Mini" />
            <h3>Apple HomePod Mini</h3>
            <p>Premium smart speaker with Siri and Apple ecosystem support.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <h2>About the Project</h2>
        <p>
          Our platform collects data from reviews, social media, and news
          articles. Using LLM-based sentiment analysis, topic modeling,
          and RAG pipelines, we provide actionable market intelligence
          for businesses and marketing teams.
        </p>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <h2>Core Features</h2>
        <div className="feature-grid">
          <div className="feature-card">🤖 AI Sentiment Analysis</div>
          <div className="feature-card">📈 Market Trend Forecasting</div>
          <div className="feature-card">🧠 Topic Modeling</div>
          <div className="feature-card">🔍 RAG-Based Smart Insights</div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Ready to Explore Market Intelligence?</h2>
        <button onClick={() => navigate("/signup")} className="primary-btn">
          Create Account
        </button>
      </section>

      <Footer />
    </>
  );
};

export default LandingPage;
