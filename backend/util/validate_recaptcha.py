import aiohttp

from config import config


async def is_recaptcha_valid(token: str, ip: str) -> bool:
    """Validate the recaptcha token."""
    async with aiohttp.ClientSession() as session:
        async with session.post(
            "https://www.google.com/recaptcha/api/siteverify",
            data={
                "secret": config["PERSONAL_SITE_RECAPTCHA_SECRET"],
                "response": token,
                "remoteip": ip
            },
        ) as response:
            if response.status == 200:
                data = await response.json()
                return data.get("success", False)
    return False
