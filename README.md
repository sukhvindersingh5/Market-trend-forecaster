# MarketForecaster

> AI-powered consumer sentiment analysis and market trend forecasting dashboard for smart speaker products.

[![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue)](https://vitejs.dev/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-green)](https://fastapi.tiangolo.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)](https://www.mongodb.com/)

---

## 🚀 Overview

MarketForecaster aggregates consumer sentiment data from multiple sources — Amazon reviews, YouTube comments, news articles, and web-scraped product reviews — and presents AI-driven insights through an interactive dashboard.

---

## 🆕 Real-Time Review Ingestion

This project includes a **user-triggered ingestion pipeline**:

👉 Click **"Update Reviews"** button on Dashboard  
→ Fetches latest data from all sources  
→ Processes & merges data  
→ Updates dataset dynamically  

### 🔥 Data Sources:
- Amazon Reviews (Kaggle dataset)
- YouTube Comments (YouTube Data API)
- News Articles (GNews API)
- Web Reviews (Crawl4AI scraping)

---

## 📊 Key Features

- 📈 Real-time sentiment trends (7/30/90 days)
- 📊 Brand comparison analytics
- 🔍 Sentiment Explorer with filters
- 🚨 AI-based anomaly alerts
- 🤖 AI Chatbot (Market Assistant)
- 📄 Exportable reports (PDF/Excel)
- 🔐 JWT Authentication
- 🔄 Live Data Update via Dashboard Button

---

## 🧠 Tech Stack

| Layer | Technology |
|------|-----------|
| Frontend | React + Vite + Tailwind CSS |
| Backend | FastAPI |
| Database | MongoDB |
| Data Sources | YouTube API, GNews API, Web Scraping |
| Auth | JWT |

---

## 📁 Project Structure


Market-trend-forecaster/
├── Frontend/
├── backend/
├── ingestion/
│ ├── amazon_reviews.py
│ ├── youtube_comments.py
│ ├── crawl_web_reviews.py
│ ├── news_fetch.py
│ └── merge_reviews.py
├── data/
│ ├── raw/
│ └── processed/


---

## ⚙️ Setup Instructions

### 🔹 Backend Setup

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload

👉 Backend runs on: http://localhost:8000

🔹 Frontend Setup
cd Frontend
npm install
npm run dev

👉 Frontend runs on: http://localhost:5173

🔑 Environment Variables (backend/.env)
MONGODB_URL=mongodb://localhost:27017
JWT_SECRET=your_secret_key
GNEWS_API_KEY=your_api_key
YOUTUBE_API_KEY=your_api_key
🔄 How Update Reviews Works
User clicks Update Reviews button
JWT token is sent to backend
Backend API (/update-reviews) runs:
amazon_reviews.py
youtube_comments.py
crawl_web_reviews.py
news_fetch.py
merge_reviews.py
New data is appended to dataset
Dashboard refreshes automatically
📊 Data Pipeline
Amazon / YouTube / News / Web
        ↓
Data Processing Scripts
        ↓
merge_reviews.py
        ↓
all_reviews_clean.csv
        ↓
Dashboard Visualization
🧪 Troubleshooting
Issue	Fix
Backend not starting	Install dependencies
CSV not updating	Close Excel file
401 Unauthorized	Login again
No new data	Check API keys
Script errors	Check ingestion logs
💡 Highlights
Full-stack application (React + FastAPI)
Multi-source data integration
Real-time ingestion pipeline
Secure API communication using JWT
Dynamic dataset updates with timestamp tracking
⭐ Future Improvements
Automated scheduled ingestion (cron jobs)
Real-time streaming updates
Advanced NLP sentiment analysis
Cloud deployment (AWS/GCP)
