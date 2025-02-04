from pydantic import BaseModel
from db.supabase import create_supabase_client
import logging

class User(BaseModel):
    first_name: str
    last_name: str
    phone: str
    email: str
    nic: str
    password: str
  

async def get_supabase_client():
    return await create_supabase_client()

async def get_all_users_model():
    try:
        supabase = await get_supabase_client()
        response = await supabase.from_('users').select('*').execute()
        
        users = response.data or []
        
        if not users:
            return {"users": [], "message": "No users found", "status": 404}
        
        return {"users": users, "message": "Users found", "status": 200}
    
    except Exception as e:
        logging.error(f"An error occurred: {e}")
        return {"error": "Something went wrong", "message": str(e), "status": 500}

async def get_user_by_id_model(user_id: str):
    try:
        supabase = await get_supabase_client()
        response = await supabase.from_('users').select('*').eq('user_id', user_id).execute()
        
        if not response.data:
            return {"error": "User not found", "status": 404}
        
        return {"user": response.data[0], "message": "User found", "status": 200}
    
    except Exception as e:
        logging.error(f"Database error occurred: {e}")
        return {"error": str(e), "message": "Internal Server Error", "status": 500}

async def get_user_by_nic_model(nic: str):
    try:
        supabase = await get_supabase_client()
        response = await supabase.from_('users').select('*').eq('nic', nic).execute()
        
        if not response.data:
            return {"error": "User not found", "status": 404}
        
        return {"user": response.data[0], "message": "User found", "status": 200}
    
    except Exception as e:
        logging.error(f"Database error occurred: {e}")
        return {"error": str(e), "message": "Internal Server Error", "status": 500}

async def create_user_model(user: User):
    try:
        supabase = await get_supabase_client()
        response = await supabase.from_('users').insert([user.model_dump()]).execute()
        
        user_data = response.data[0]
        user_data.pop('password', None)
        return {"user": user_data, "message": "User created", "status": 201}
    
    except Exception as e:
        logging.error(f"Database error occurred: {e}")
        return {"error": str(e), "message": "Internal Server Error", "status": 500}

async def update_user_model(user_id: str, user: User):
    try:
        supabase = await get_supabase_client()
        response = await supabase.from_('users').update(user.model_dump()).eq('user_id', user_id).execute()
        
        return {"user": response.data[0], "message": "User updated", "status": 200}
    
    except Exception as e:
        logging.error(f"Database error occurred: {e}")
        return {"error": str(e), "message": "Internal Server Error", "status": 500}

async def delete_user_model(user_id: str):
    try:
        supabase = await get_supabase_client()
        await supabase.from_('users').delete().eq('user_id', user_id).execute()
        
        return {"message": "User deleted", "status": 200}
    
    except Exception as e:
        logging.error(f"Database error occurred: {e}")
        return {"error": str(e), "message": "Internal Server Error", "status": 500}
