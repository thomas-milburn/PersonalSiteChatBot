import logging
import os

from dotenv import load_dotenv
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.templating import Jinja2Templates
from websockets.exceptions import ConnectionClosedOK

import config
from assistant.assistant import get_chain
from assistant.assistant_callback import StreamingLLMCallbackHandler
from models.chat_message_in import ChatIn
from models.chat_response import ChatResponse
from util.validate_recaptcha import is_recaptcha_valid

# Load the environment variables from the .env file
load_dotenv()

# Access the variables using os.environ
openai_api_key = os.environ.get("OPENAI_API_KEY")

templates = Jinja2Templates(directory="templates")

app = FastAPI()


@app.websocket("/chat")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    stream_handler = StreamingLLMCallbackHandler(websocket)
    qa_chain = get_chain(stream_handler)

    while True:
        try:
            # Receive and send back the client message
            user_msg_string = await websocket.receive_text()
            chat_message = ChatIn.model_validate_json(user_msg_string)

            if chat_message.message == "":
                continue

            if config.config["PERSONAL_SITE_IS_DEVELOPMENT"] != "true":
                # We are in deployment mode, check recaptcha
                recaptcha_valid = await is_recaptcha_valid(chat_message.g_recaptcha_token, websocket.client.host)
                if not recaptcha_valid:
                    resp = ChatResponse(sender="bot", message="Recaptcha not valid, please try again", type="error")
                    await websocket.send_json(resp.model_dump())
                    continue

            # Construct a response
            start_resp = ChatResponse(sender="bot", message="", type="start")
            await websocket.send_json(start_resp.model_dump())

            # Send the message to the chain and feed the response back to the client
            final_message = await qa_chain.arun(chat_message.message)

            # Send the end-response back to the client
            end_resp = ChatResponse(sender="bot", message=final_message, type="end")
            await websocket.send_json(end_resp.model_dump())
        except WebSocketDisconnect:
            logging.info("WebSocketDisconnect")
            # TODO try to reconnect with back-off
            break
        except ConnectionClosedOK:
            logging.info("ConnectionClosedOK")
            # TODO handle this?
            break
        except Exception as e:
            logging.error(e, exc_info=True)
            resp = ChatResponse(
                sender="bot",
                message="Sorry, something went wrong. Try again.",
                type="error",
            )
            await websocket.send_json(resp.model_dump())
