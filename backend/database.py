from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# Note: Using a local SQLite database for rapid development. 
# You will swap this string for a PostgreSQL URL later (e.g., postgresql://user:password@localhost/mctg)
SQLALCHEMY_DATABASE_URL = "sqlite:///./mctg.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()