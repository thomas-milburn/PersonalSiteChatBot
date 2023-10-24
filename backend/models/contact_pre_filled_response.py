from typing import Optional
from models import base_response


class ContactPreFilledResponse(base_response.BaseResponse):
    message_type: str = "contact_pre_filled"
    suggested_message: str
    name: Optional[str] = None
    email: Optional[str] = None
