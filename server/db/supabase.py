from supabase import Client, create_client
from config.config import db_api, db_url

api_url: str = db_url
key: str = db_api

def create_supabase_client():
    supabase: Client = create_client(api_url, key)
    return supabase
