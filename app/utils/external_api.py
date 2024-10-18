import requests
from fastapi import HTTPException
from config import settings


API_KEY = settings.api_key
API_URL = settings.api_url


def get_exchange_rate(base_currency: str, target_currency: str) -> float:
    url = f"{API_URL}latest/"
    params = {"apikey": API_KEY, "currencies": target_currency, "base_currency": base_currency}
    response = requests.get(url, params=params)

    if response.status_code != 200:
        raise HTTPException(status_code=502, detail="Failed to fetch currency rates")

    rates = response.json().get("data", {})
    if target_currency not in rates:
        raise HTTPException(status_code=400, detail="Invalid currency code")

    return rates[target_currency]


def get_list_of_currencies():
    url = f"{API_URL}currencies/"
    params = {"apikey": API_KEY, "currencies": ""}
    response = requests.get(url, params=params)
    return response.json()
