from dotenv import load_dotenv
import os

load_dotenv()


db_url = os.getenv('SUPABASE_URL')
db_api = os.getenv('SUPABASE_API')