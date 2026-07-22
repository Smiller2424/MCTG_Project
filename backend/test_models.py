import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database import Base
from models import User, Wallet, TradeHistory

SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

def test_create_user():
    db = TestingSessionLocal()
    new_user = User(username="testuser")
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    assert new_user.username == "testuser"
    assert new_user.id is not None
    db.close()