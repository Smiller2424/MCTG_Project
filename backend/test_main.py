from unittest.mock import AsyncMock, Mock, patch

from fastapi.testclient import TestClient

from main import app


client = TestClient(app)


@patch("main.httpx.AsyncClient.get", new_callable=AsyncMock)
def test_get_top_traders_success(mock_get):
    """The endpoint should transform Polymarket data for the frontend."""
    mock_response = Mock()
    mock_response.status_code = 200
    mock_response.json.return_value = [
        {
            "rank": "1",
            "userName": "TraderOne",
            "xUsername": "trader_one",
            "vol": 50000,
            "pnl": 12000,
            "verifiedBadge": True,
        }
    ]

    mock_get.return_value = mock_response

    response = client.get("/api/top-traders")

    assert response.status_code == 200
    assert response.json() == [
        {
            "rank": 1,
            "name": "TraderOne",
            "username": "@trader_one",
            "markets": "Overall",
            "volume": 50000,
            "pnl": 12000,
            "verified": True,
        }
    ]

    mock_get.assert_awaited_once_with(
        "https://data-api.polymarket.com/v1/leaderboard",
        params={
            "category": "OVERALL",
            "timePeriod": "MONTH",
            "orderBy": "PNL",
            "limit": 5,
        },
    )


@patch("main.httpx.AsyncClient.get", new_callable=AsyncMock)
def test_get_top_traders_returns_502_when_polymarket_fails(mock_get):
    """The endpoint should report an upstream Polymarket failure."""
    mock_response = Mock()
    mock_response.status_code = 500
    mock_get.return_value = mock_response

    response = client.get("/api/top-traders")

    assert response.status_code == 502
    assert response.json() == {
        "detail": "Failed to fetch Polymarket data"
    }