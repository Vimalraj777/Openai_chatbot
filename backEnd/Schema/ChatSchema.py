from pydantic import BaseModel

class Chatschema(BaseModel):
    userinput: str