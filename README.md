# Market-trend-forecaster

AI-Powered Market Trend & Consumer Sentiment Forecaster.

This repository contains:

- **Frontend**: React + Vite (`Frontend/`)
- **Backend**: FastAPI + MongoDB (`backend/`)

## Prerequisites

- **Node.js** 18+ (recommended)
- **Python** 3.10+
- **MongoDB** running locally or accessible via a connection string

## Project structure

```
Market-trend-forecaster/
  Frontend/
  backend/
```

## Backend (FastAPI)

### MongoDB setup (Atlas or Local + Compass)

The backend reads `MONGODB_URL` from `backend/.env`.

#### Option A: Local MongoDB (recommended for development) + MongoDB Compass

1. Install and start MongoDB Community Server.
2. (Optional) Install **MongoDB Compass**.
3. In Compass, connect using:

```
mongodb://localhost:27017
```

Your `.env` value:

```env
MONGODB_URL=mongodb://localhost:27017
```

#### Option B: MongoDB Atlas (cloud)

1. Create a cluster on MongoDB Atlas.
2. Create a database user and allow your IP (or use `0.0.0.0/0` for testing).
3. Click **Connect** -> **Drivers** and copy the connection string.

Example `.env` value (replace placeholders):

```env
MONGODB_URL=mongodb+srv://<username>:<password>@<cluster-host>/market_trend_db?retryWrites=true&w=majority
```

If your password contains special characters, URL-encode it.

### 1) Create virtual environment (recommended)

From the repository root:

```bash
python -m venv backend/venv
```

Activate it:

```bash
source backend/venv/bin/activate
```

### 2) Install backend dependencies

```bash
pip install -r backend/requirements.txt
```

### 3) Configure environment variables

Copy the example env file and edit as needed:

```bash
cp backend/.env.example backend/.env
```

`backend/.env` (do not commit it) should look like:

```env
MONGODB_URL=mongodb://localhost:27017
SECRET_KEY=change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### 4) Run the backend server

Run it from the `backend/` folder:

```bash
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Then open:

- `http://localhost:8000/docs` (Swagger UI)

### Backend API routes

- `POST /auth/signup`
- `POST /auth/login`
- `GET /users/profile` (requires Bearer token)
- `POST /api/raw_data` (requires Bearer token)
- `GET /api/sentiment`

## Frontend (React + Vite)

### 1) Install dependencies

Run the command from `Frontend/`:

```bash
cd Frontend
npm install
```

### 2) Start the development server

From `Frontend/`:

```bash
npm run dev
```

The frontend runs on:

- `http://localhost:5173`

## Authentication notes

- After login, the frontend stores the JWT in `localStorage` as `token`.
- Routes like `/dashboard` and `/profile` are protected on the frontend.

## Troubleshooting

- If CORS blocks requests, ensure the frontend is running at `http://localhost:5173`.
- Ensure MongoDB is running and `MONGODB_URL` is correct.
