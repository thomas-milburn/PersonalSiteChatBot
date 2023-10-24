from pydantic import BaseModel


class BaseResponse(BaseModel):
    message_type: str
