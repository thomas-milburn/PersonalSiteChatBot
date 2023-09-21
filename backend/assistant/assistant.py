from langchain.agents import OpenAIFunctionsAgent, AgentExecutor
from langchain.callbacks.manager import AsyncCallbackManager
from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationTokenBufferMemory
from langchain.prompts.chat import HumanMessagePromptTemplate
from langchain.schema import SystemMessage

import config
from tools.contact.contact_tool import ContactTool
from tools.github.get_activity import GithubGetUserEvents
from tools.github.get_read_me import GithubGetRepoReadMe
from tools.university.university_modules import GetUniversityModules, GetUniversityModuleDescription

with open("context/system_prompt.txt", "r") as f:
    system_prompt = f.read()


def get_chain(stream_handler) -> AgentExecutor:
    stream_manager = AsyncCallbackManager([stream_handler])

    llm = ChatOpenAI(
        model="gpt-3.5-turbo",
        verbose=True,
        openai_api_key=config.config["PERSONAL_SITE_OPENAI_KEY"],
        temperature=1,
        streaming=True,
        callback_manager=stream_manager,
    )

    tools = [
        GetUniversityModules(callback_manager=stream_manager),
        GetUniversityModuleDescription(callback_manager=stream_manager),
        ContactTool(callback_manager=stream_manager),
        GithubGetUserEvents(callback_manager=stream_manager),
        GithubGetRepoReadMe(callback_manager=stream_manager)
    ]

    # Step 3: Create the prompt
    system_message = SystemMessage(content=system_prompt)
    prompt = OpenAIFunctionsAgent.create_prompt(
        system_message=system_message,
        extra_prompt_messages=[HumanMessagePromptTemplate.from_template("{chat_history}")]
    )

    memory = ConversationTokenBufferMemory(llm=llm, memory_key="chat_history", max_token_limit=2048)

    # Step 4: Create the agent
    agent = OpenAIFunctionsAgent(llm=llm, tools=tools, prompt=prompt)

    agent_executor = AgentExecutor.from_agent_and_tools(
        agent=agent, tools=tools, verbose=True, memory=memory, callback_manager=stream_manager
    )

    return agent_executor
