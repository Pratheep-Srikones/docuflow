from app.models import user_model
from fastapi import status, Response

async def get_all_users(response: Response):
    user_data = await user_model.get_all_users_model()
    if user_data.get("error"):
        response.status_code = user_data.get("status")
        return user_data
    
    return user_data

async def get_user_by_id(user_id, response: Response):
    if not user_id or user_id.strip() == "":
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "User ID is required"}
    if len(user_id) != 36:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "Invalid user ID format"}
    
    user_data = await user_model.get_user_by_id_model(user_id)
    if user_data.get("error"):
        response.status_code = user_data.get("status")
        return user_data
    
    return user_data

async def get_user_by_nic(nic, response: Response):
    if not nic or nic.strip() == "":
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "NIC is required"}
    if len(nic) != 12:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "Invalid NIC format"}
    
    user_data = await user_model.get_user_by_nic_model(nic)
    if user_data.get("error"):
        response.status_code = user_data.get("status")
        return user_data
    
    return user_data

async def create_user(user: user_model.User, response: Response):
    if not user:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "User data is required"}
    
    user_data = await user_model.create_user_model(user)
    if user_data.get("error"):
        response.status_code = user_data.get("status")
        return user_data
    
    return user_data

async def update_user(user_id, user: user_model.User, response: Response):
    if not user_id or user_id.strip() == "":
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "User ID is required"}
    if len(user_id) != 36:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "Invalid user ID format"}
    
    if not user:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "User data is required"}
    
    user_data = await user_model.update_user_model(user_id, user)
    if user_data.get("error"):
        response.status_code = user_data.get("status")
        return user_data
    
    return user_data

async def delete_user(user_id, response: Response):
    if not user_id or user_id.strip() == "":
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "User ID is required"}
    if len(user_id) != 36:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "Invalid user ID format"}
    
    user_data = await user_model.delete_user_model(user_id)
    if user_data.get("error"):
        response.status_code = user_data.get("status")
        return user_data
    
    return user_data
