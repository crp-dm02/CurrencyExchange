from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def test_currency_exchange():
    # Аутентификация и получение токена
    response = client.post("/auth/login/", data={"username": "user", "password": "user"})
    token = response.json().get("access_token")

    # Тестируем обмен валют
    headers = {"Authorization": f"Bearer {token}"}
    response = client.post("/currency/exchange/",
                           json={"base_currency": "USD", "target_currency": "EUR", "amount": 100}, headers=headers)
    assert response.status_code == 200
    assert "converted_amount" in response.json()
    assert "exchange_rate" in response.json()