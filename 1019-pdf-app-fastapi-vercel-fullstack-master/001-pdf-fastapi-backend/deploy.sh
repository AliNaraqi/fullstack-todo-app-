#!/bin/bash
# Production deployment script for Render

echo "🚀 Starting FastAPI deployment..."

# Install dependencies
echo "📦 Installing Python dependencies..."
pip install -r requirements-production.txt

# Run database migrations
echo "🗄️ Running database migrations..."
alembic upgrade head

# Start the application
echo "🌟 Starting FastAPI application..."
uvicorn main:app --host 0.0.0.0 --port $PORT
