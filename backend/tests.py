from unittest.mock import AsyncMock, Mock, patch

from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


@patch("main.httpx.AsyncClient.get", new_callable=AsyncMock)
def test_get_top_traders_success(mock_get):
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

    data = response.json()

    assert len(data) == 1
    assert data[0] == {
        "rank": 1,
        "name": "TraderOne",
        "username": "@trader_one",
        "markets": "Overall",
        "volume": 50000,
        "pnl": 12000,
        "verified": True,
    }

    mock_get.assert_awaited_once_with(
        "https://data-api.polymarket.com/v1/leaderboard",
        params={
            "category": "OVERALL",
            "timePeriod": "MONTH",
            "orderBy": "PNL",
            "limit": 5,
        },
    )