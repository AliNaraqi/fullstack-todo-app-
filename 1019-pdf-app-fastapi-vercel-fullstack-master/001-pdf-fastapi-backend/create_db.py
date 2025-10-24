#!/usr/bin/env python3
"""
Simple script to create database tables for testing
"""
import os
from pathlib import Path
from dotenv import load_dotenv, dotenv_values

# Load environment variables
backend_dir = Path(__file__).resolve().parent
api_env_path = backend_dir / "api.env"

load_dotenv(override=False)
if api_env_path.exists():
    load_dotenv(dotenv_path=api_env_path, override=True)

from sqlalchemy import create_engine
from database import Base
import models

# Create engine
database_url = os.getenv("DATABASE_URL", "sqlite:///./test.db")
engine = create_engine(database_url)

# Create all tables
Base.metadata.create_all(bind=engine)
print(f"Database tables created successfully using: {database_url}")

