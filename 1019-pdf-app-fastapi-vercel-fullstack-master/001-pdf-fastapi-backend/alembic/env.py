from dotenv import load_dotenv
from pathlib import Path
load_dotenv()

from logging.config import fileConfig

from sqlalchemy import engine_from_config
from sqlalchemy import pool

from alembic import context

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

import os

# Ensure environment variables are loaded from a local api.env if present
# This mirrors the runtime behavior in database.py so CLI migrations work the same way.
backend_dir = Path(__file__).resolve().parents[1]
api_env_path = backend_dir / "api.env"
if api_env_path.exists():
    load_dotenv(dotenv_path=api_env_path, override=True)

# Prefer a single DATABASE_URL; otherwise assemble from individual parts
database_url = os.getenv("DATABASE_URL")
if not database_url:
    user = os.getenv("DATABASE_USER")
    password = os.getenv("DATABASE_PASSWORD", "")
    host = os.getenv("DATABASE_HOST", "localhost")
    port = os.getenv("DATABASE_PORT", "5432")
    name = os.getenv("DATABASE_NAME")

    if not user or not name:
        raise RuntimeError(
            "Database configuration is incomplete. Set DATABASE_URL or DATABASE_USER and DATABASE_NAME (and optional DATABASE_PASSWORD, DATABASE_HOST, DATABASE_PORT)."
        )

    database_url = f"postgresql://{user}:{password}@{host}:{port}/{name}"

config.set_main_option("sqlalchemy.url", database_url)


# Interpret the config file for Python logging.
# This line sets up loggers basically.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# add your model's MetaData object here
# for 'autogenerate' support
from models import Base
target_metadata = Base.metadata

# other values from the config, defined by the needs of env.py,
# can be acquired:
# my_important_option = config.get_main_option("my_important_option")
# ... etc.


def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode.

    This configures the context with just a URL
    and not an Engine, though an Engine is acceptable
    here as well.  By skipping the Engine creation
    we don't even need a DBAPI to be available.

    Calls to context.execute() here emit the given string to the
    script output.

    """
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Run migrations in 'online' mode.

    In this scenario we need to create an Engine
    and associate a connection with the context.

    """
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection, target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
