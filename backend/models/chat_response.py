from pydantic import BaseModel, field_validator


class ChatResponse(BaseModel):
    """Chat response schema."""

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
