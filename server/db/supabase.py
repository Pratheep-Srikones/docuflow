from supabase import AsyncClient, create_async_client
from config.config import db_api, db_url, db_service

api_url: str = db_url
key: str = db_service

async def create_supabase_client():
    supabase: AsyncClient = await create_async_client(api_url, key)
    return supabase

