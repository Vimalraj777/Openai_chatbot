from pydantic_settings import BaseSettings

class Secrets(BaseSettings):
    api_key:str


    class Config():
        env_file = ".env"

secret = Secrets()