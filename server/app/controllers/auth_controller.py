from fastapi import status, Response

from app.models import user_model
from app.utils import hashing

async def login(nic:str,password:str,response:Response):
    if nic is None or password is None:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "nic and password are required"}
    if not ((len(nic) == 10 and nic.isalnum()) or (len(nic) == 12 and nic.isdigit())):
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "Invalid nic format"}
    user_data = await user_model.get_user_by_nic_model(nic)
    if user_data is None or user_data.get("user") is None:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"error": "User not found"}
    user = user_data.get("user")

    if not hashing.verify(password,user.get("password")):
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return {"error": "Invalid password"}
    
    return {"user": user, "message": "User found & login success", "status": 200}

async def register(user:user_model.User,response:Response):
    if user is None:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "User data is required"}
    if not ((len(user.nic) == 10 and user.nic.isalnum()) or (len(user.nic) == 12 and user.nic.isdigit())):
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "Invalid nic format"}
    if len(user.password) < 8:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "Password must be at least 8 characters long"}
    user_data = await user_model.get_user_by_nic_model(user.nic)
    if user_data is not None and user_data.get("user") is not None:
        response.status_code = status.HTTP_409_CONFLICT
        return {"error": "User already exists"}
    user.password = hashing.hash(user.password)
    user_data = await user_model.create_user_model(user)
    return user_data