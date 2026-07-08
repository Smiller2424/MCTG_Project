from fastapi import FastAPI
import models
from database import engine

# This creates all the tables in the database based on models.py
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="MCTG Backend API")

@app.get("/")
def read_root():
    return {"message": "Database provisioned and API running."}