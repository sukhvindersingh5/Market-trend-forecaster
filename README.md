# Market-trend-forecaster

AI-Powered Market Trend & Consumer Sentiment Forecaster.

## Overview

MarketForecaster builds a multi-source data ingestion pipeline to collect consumer sentiment data for smart speaker products:
- Amazon Alexa
- Google Nest Mini
- Apple HomePod Mini

### Project Objective
The platform aggregates social media posts, product reviews, and news data to generate consumer sentiment insights using LLM-based sentiment analysis, topic modeling, and RAG pipelines.

### Data Ecosystem
The dataset combines consumer opinions from multiple platforms:
- **Amazon product reviews** (Kaggle dataset)
- **YouTube comments** (YouTube Data API)
- **News articles** (GNews API)
- **Web-scraped product reviews** (Technology review websites)

---

## Repository Structure

- **Frontend**: React + Vite (`Frontend/`)
- **Backend**: FastAPI + MongoDB (`backend/`)
- **Data Ingestion**: Python scraping and cleaning scripts (`ingestion/` and `data/`)

## Getting Started

### Prerequisites

- **Node.js** 18+
- **Python** 3.10+
- **MongoDB** running locally or via Atlas

### Backend (FastAPI)

1. **Setup MongoDB**: The backend reads `MONGODB_URL` from `backend/.env`.
2. **Create Venv**: `python -m venv backend/venv`
3. **Install Dependencies**: `pip install -r backend/requirements.txt`
4. **Configure Env**: Copy `backend/.env.example` to `backend/.env`.
5. **Run Server**: 
   ```bash
   cd backend
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```
   Open `http://localhost:8000/docs` for API documentation.

### Frontend (React + Vite)

1. **Install Dependencies**: `cd Frontend && npm install`
2. **Start Dev Server**: `npm run dev`
   Available at `http://localhost:5173`.

---

## Data Processing (Milestone 1)

The ingestion module performs:
- Text cleaning (lowercase, noise removal)
- Standardized schema alignment
- Duplicate removal
- Multi-source merging

**Final Dataset**: ~2,679 reviews/comments and 13 news articles across 3 products.

---

## Troubleshooting

- **CORS**: Ensure frontend is at `http://localhost:5173`.
- **Database**: Ensure MongoDB is running and `MONGODB_URL` is correct.
