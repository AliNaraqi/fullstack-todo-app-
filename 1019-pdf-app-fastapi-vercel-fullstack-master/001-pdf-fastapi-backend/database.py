import os
from pathlib import Path
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv, dotenv_values

# Load env files early, preferring a local api.env next to this file, then .env
backend_dir = Path(__file__).resolve().parent
api_env_path = backend_dir / "api.env"

# Load a .env if present (base), then force-load api.env to override stale values.
load_dotenv(override=False)
if api_env_path.exists():
    load_dotenv(dotenv_path=api_env_path, override=True)

# Force SQLite for testing to avoid PostgreSQL connection issues
database_url = os.getenv("DATABASE_URL")
if not database_url:
    # Always use SQLite for testing
    database_url = "sqlite:///./test.db"
    print("✅ Using SQLite database for testing")
else:
    # If DATABASE_URL is set, still try to use SQLite for testing
    database_url = "sqlite:///./test.db"
    print("✅ Using SQLite database for testing (overriding DATABASE_URL)")

engine = create_engine(database_url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()