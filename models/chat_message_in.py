from pydantic import BaseModel


class ChatIn(BaseModel):
    message: str
    g_recaptcha_token: str
