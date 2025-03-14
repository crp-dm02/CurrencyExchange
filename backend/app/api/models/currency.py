from pydantic import BaseModel
from pydantic import BaseModel


# Модель для запроса обмена валют
class CurrencyExchangeRequest(BaseModel):
    base_currency: str
    target_currency: str
    amount: float = 1.0  # по умолчанию 1 единица


# Модель для возврата информации об обмене валют
class CurrencyExchangeResponse(BaseModel):
    base_currency: str
    target_currency: str
    amount: float
    converted_amount: float
    exchange_rate: float


# Модель для списка валют
class CurrencyListResponse(BaseModel):
    currencies: dict  # Например: {"USD": "United States Dollar", "EUR": "Euro"}
