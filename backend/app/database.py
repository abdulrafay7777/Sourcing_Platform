import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

# For local dev, SQLite is fine. Swap to Postgres in production:
# DATABASE_URL = "postgresql://user:password@localhost:5432/paksource"
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./paksource.db")

connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
