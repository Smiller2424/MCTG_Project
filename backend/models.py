from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from database import Base
import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    account_type = Column(String, default="Copy Trader")
    member_since = Column(DateTime, default=datetime.datetime.utcnow)

    wallet = relationship("Wallet", back_populates="owner", uselist=False)
    trades = relationship("TradeHistory", back_populates="owner")


class Wallet(Base):
    __tablename__ = "wallets"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    wallet_id = Column(String, unique=True, index=True)
    address = Column(String, unique=True, index=True)
    balance = Column(Float, default=0.0)
    total_deposited = Column(Float, default=0.0)

    owner = relationship("User", back_populates="wallet")


class TradeHistory(Base):
    __tablename__ = "trade_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    trader_copied = Column(String)
    trade_copied = Column(String)
    side = Column(String)
    amount = Column(Float)
    shares = Column(Float)
    avg_price = Column(Float)
    status = Column(String)
    date = Column(DateTime, default=datetime.datetime.utcnow)

    owner = relationship("User", back_populates="trades")