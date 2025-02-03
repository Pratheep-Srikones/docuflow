from pydantic import BaseModel
from db.supabase import create_supabase_client

supabase = create_supabase_client()

class User(BaseModel):
    first_name: str
    last_name: str
    phone:str
    email: str
    nic: str
    password: str

import logging

def get_all_users_model():
    try:
        response = supabase.from_('users').select('*').execute()
        
        users = getattr(response, "data", [])  # Safe way to access data
        
        if not users:
            return {"users": [], "message": "No users found", "status": 404}
        
        return {"users": users, "message": "Users found", "status": 200}
    
    except Exception as e:
        logging.error(f"An error occurred: {e}")
        return {"error": "Something went wrong", "message": str(e), "status": 500}

def get_user_by_id_model(user_id):
    try:
        response = supabase.from_('users').select('*').eq('user_id', user_id).execute()
        if not response.data or len(response.data) == 0:
            return {"error": "User not found", "status": 404}
        
        return {"user": response.data[0], "message": "User found", "status": 200}
    
    except Exception as e:
        logging.error(f"Database error occurred: {e}")
        return {"error": str(e), "message": "Internal Server Error", "status": 500}
        
def get_user_by_nic_model(nic):
    try:
        response = supabase.from_('users').select('*').eq('nic', nic).execute()
        if not response.data or len(response.data) == 0:
            return {"error": "User not found", "status": 404}
        
        return {"user": response.data[0], "message": "User found", "status": 200}
    
    except Exception as e:
        logging.error(f"Database error occurred: {e}")
        return {"error": str(e), "message": "Internal Server Error", "status": 500}
    
def create_user_model(user: User):
    try:
        response = supabase.from_('users').insert([user.model_dump()]).execute()
        return {"user": response.data[0], "message": "User created", "status": 201}
    
    except Exception as e:
        logging.error(f"Database error occurred: {e}")
        return {"error": str(e), "message": "Internal Server Error", "status": 500}
    
def update_user_model(user_id, user: User):
    try:
        response = supabase.from_('users').update(user.model_dump()).eq('user_id', user_id).execute()
        return {"user": response.data[0], "message": "User updated", "status": 200}
    
    except Exception as e:
        logging.error(f"Database error occurred: {e}")
        return {"error": str(e), "message": "Internal Server Error", "status": 500}
    
def delete_user_model(user_id):
    try:
        response = supabase.from_('users').delete().eq('user_id', user_id).execute()
        return {"message": "User deleted", "status": 200}
    
    except Exception as e:
        logging.error(f"Database error occurred: {e}")
        return {"error": str(e), "message": "Internal Server Error", "status": 500}