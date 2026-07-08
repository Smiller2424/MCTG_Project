from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

POLYMARKET_LEADERBOARD_URL = "https://data-api.polymarket.com/v1/leaderboard"


@app.get("/api/top-traders")
async def get_top_traders():
    params = {
        "category": "OVERALL",
        "timePeriod": "MONTH",
        "orderBy": "PNL",
        "limit": 5,
    }

    async with httpx.AsyncClient(timeout=10) as client:
        response = await client.get(POLYMARKET_LEADERBOARD_URL, params=params)

    if response.status_code != 200:
        raise HTTPException(status_code=502, detail="Failed to fetch Polymarket data")

    data = response.json()

    return [
        {
            "rank": int(trader["rank"]),
            "name": trader.get("userName") or "Unknown Trader",
            "username": f"@{trader['xUsername']}" if trader.get("xUsername") else "@unknown",
            "markets": "Overall",
            "volume": trader.get("vol", 0),
            "pnl": trader.get("pnl", 0),
            "verified": trader.get("verifiedBadge", False),
        }
        for trader in data
    ]