from typing import Optional, Type

from langchain.callbacks.manager import CallbackManagerForToolRun, AsyncCallbackManagerForToolRun
from langchain.tools import BaseTool
from pydantic import BaseModel, Field


class ContactToolArgs(BaseModel):
    human_name: Optional[str] = \
        Field(description="The real name of the human who is asking the question", default=None)
    human_email: Optional[str] = \
        Field(description="The real email of the human who is asking the question", default=None)
    message: str = Field(description="The message the user is sending")


class ContactTool(BaseTool):
    name = "message_thomas"
    description = """Send user's message to Thomas, enabling direct questions to him. Human users must provide their real details. Useful if the assistant does not know the answer to a question"""
    args_schema: Type[ContactToolArgs] = ContactToolArgs

    def _run(
        self,
        message: str,
        human_name: Optional[str] = None,
        human_email: Optional[str] = None,
        run_manager: Optional[CallbackManagerForToolRun] = None,
    ) -> dict:
        """Use the tool."""
        return {
            "message": "Your message has been sent. Thomas will get back to you as soon as possible."
        }

    async def _arun(
        self,
        message: str,
        human_name: Optional[str] = None,
        human_email: Optional[str] = None,
        run_manager: Optional[AsyncCallbackManagerForToolRun] = None,
    ) -> dict:
        """Use the tool asynchronously."""
        return {
            "message": "Your message has been sent. Thomas will get back to you as soon as possible."
        }
