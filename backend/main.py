from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
import models
from database import engine, get_db

# Create all database tables on startup
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="MCTG Polymarket API")

# Seed initial database data if empty
@app.on_event("startup")
def startup_event():
    db = next(get_db())
    if not db.query(models.User).first():
        sample_user = models.User(
            name="Alpha Trader",
            username="trader1",
            email="trader1@mctg.io",
            account_type="Copy Trader"
        )
        db.add(sample_user)
        db.commit()
        db.refresh(sample_user)

        sample_wallet = models.Wallet(
            user_id=sample_user.id,
            wallet_id="W-1001",
            address="0x3F...9A",
            balance=12500.50,
            total_deposited=15000.00
        )
        db.add(sample_wallet)

        sample_trade = models.TradeHistory(
            user_id=sample_user.id,
            trader_copied="WhaleTrader_01",
            trade_copied="US Election 2026 - YES",
            side="BUY",
            amount=500.00,
            shares=1000.00,
            avg_price=0.50,
            status="EXECUTED"
        )
        db.add(sample_trade)
        db.commit()
    db.close()

@app.get("/")
def read_root():
    return {"message": "MCTG Backend API and Database are running live."}

@app.get("/api/users")
def get_users(db: Session = Depends(get_db)):
    users = db.query(models.User).all()
    return users

@app.get("/api/wallet")
def get_wallet(db: Session = Depends(get_db)):
    wallet = db.query(models.Wallet).first()
    return wallet

@app.get("/api/trades")
def get_trades(db: Session = Depends(get_db)):
    trades = db.query(models.TradeHistory).all()
    return trades