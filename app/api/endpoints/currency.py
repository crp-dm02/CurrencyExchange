from fastapi import Depends,APIRouter

from app.api.models.currency import CurrencyExchangeRequest, CurrencyExchangeResponse, CurrencyListResponse
from app.core.security import get_user
from app.utils.external_api import get_exchange_rate, get_list_of_currencies


currency_router = APIRouter(prefix="/currency")


@currency_router.get("/exchange/")
async def currency_exchange(request: CurrencyExchangeRequest, current_user: dict = Depends(get_user)):
    exchange_rate = get_exchange_rate(request.base_currency, request.target_currency)
    converted_amount = request.amount * exchange_rate

    # Возврат информации об обмене валют
    return CurrencyExchangeResponse(
        base_currency=request.base_currency,
        target_currency=request.target_currency,
        amount=request.amount,
        converted_amount=converted_amount,
        exchange_rate=exchange_rate
    )


@currency_router.get("/list/")
async def currency_list(current_user: dict = Depends(get_user)):
    currencies = get_list_of_currencies()
    return CurrencyListResponse(currencies=currencies)