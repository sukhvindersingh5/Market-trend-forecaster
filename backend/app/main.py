from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import routers
from app.routes.auth_routes import router as auth_router
from app.routes.user_routes import router as user_router
from app.routes.raw_data_routes import router as raw_data_router
from app.routes.sentiment_routes import router as sentiment_router
from app.routes.chatbot_routes import router as chatbot_router


app = FastAPI(
    title="Market Trend Forecaster API",
    description="AI-powered Market Trend & Consumer Sentiment Forecaster",
    version="1.0.0"
)


# -------------------------------
# CORS CONFIGURATION
# -------------------------------

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -------------------------------
# ROUTES
# -------------------------------

# Authentication
app.include_router(auth_router, prefix="/auth", tags=["auth"])

# User
app.include_router(user_router, prefix="/users", tags=["users"])

# Raw data ingestion
app.include_router(raw_data_router, prefix="/api", tags=["raw_data"])

# Sentiment analysis APIs
app.include_router(sentiment_router, prefix="/api", tags=["sentiment"])

# AI Chatbot
app.include_router(chatbot_router, tags=["ai"])


# -------------------------------
# ROOT ENDPOINT
# -------------------------------

@app.get("/")
def root():
    return {
        "message": "Market Trend Forecaster API running",
        "docs": "/docs"
    }
