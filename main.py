from fastapi import FastAPI
from app.api.endpoints.currency import currency_router
from app.api.endpoints.users import user_router


app = FastAPI()


app.include_router(user_router)
app.include_router(currency_router)





