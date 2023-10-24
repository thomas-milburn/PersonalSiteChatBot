from pydantic import BaseModel, field_validator
from models.base_response import BaseResponse


class ChatResponse(BaseResponse):
    """Chat response schema."""

    message_type: str = "chat_response"
    sender: str
    message: str
    type: str

    @field_validator("sender")
    def sender_must_be_bot_or_you(cls, v):
        if v not in ["bot", "human"]:
            raise ValueError("sender must be bot or human")
        return v

    @field_validator("type")
    def validate_message_type(cls, v):
        if v not in ["start", "stream", "end", "error", "info", "tool"]:
            raise ValueError("type must be start, stream or end")
        return v
