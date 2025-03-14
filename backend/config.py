from pydantic_settings  import BaseSettings
from dotenv import load_dotenv
import os

load_dotenv()


class Settings(BaseSettings):
    secret_key: str = os.getenv("SECRET_KEY")
    database_url: str = os.getenv("DATABASE_URL")
    api_key: str = os.getenv("API_KEY")
    api_url: str = os.getenv("API_URL")
    algorithm: str = os.getenv("ALGORITHM")
    access_token_expires_minutes: int = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")


settings = Settings()



