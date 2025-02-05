from fastapi import status, Response
from fastapi.exceptions import HTTPException
from app.utils.jwt import create_jwt

from app.models import user_model
from app.utils import hashing
from app.models import staff_model

async def user_login(nic: str, password: str, response: Response):
    try:
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

        if not hashing.verify(password, user.get("password")):
            response.status_code = status.HTTP_401_UNAUTHORIZED
            return {"error": "Invalid password"}

        user.pop("password", None)

        token = create_jwt({"nic": user.get("nic"), "account": "user"})
        print("user Token IS HERE: =>=>=>=>=>",token)
        return {"user": user, "token": token, "message": "User found & login success", "status": 200}
    except Exception as e:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return {"error": str(e)}

async def staff_login(email: str, password: str, response: Response):
    try:
        if email is None or password is None:
            response.status_code = status.HTTP_400_BAD_REQUEST
            return {"error": "email and password are required"}
        if "@" not in email:
            response.status_code = status.HTTP_400_BAD_REQUEST
            return {"error": "Invalid email format"}
        staff_data = await staff_model.get_staff_by_email_model(email)
        if staff_data is None or staff_data.get("staff") is None:
            response.status_code = status.HTTP_404_NOT_FOUND
            return {"error": "Staff not found"}
        staff = staff_data.get("staff")

        if not hashing.verify(password, staff.get("password")):
            response.status_code = status.HTTP_401_UNAUTHORIZED
            return {"error": "Invalid password"}
        
        staff.pop("password", None)
        token = create_jwt({"email": staff.get("email"), "account": "staff", "role": staff.get("role"),"job_title": staff.get("job_title")})

        return {"staff": staff,"token":token, "message": "Staff found & login success", "status": 200}
    except Exception as e:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return {"error": str(e)}

async def user_register(user: user_model.User, response: Response):
    try:
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
    except Exception as e:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return {"error": str(e)}

async def staff_register(staff: staff_model.Staff, response: Response):
    try:
        if staff is None:
            response.status_code = status.HTTP_400_BAD_REQUEST
            return {"error": "Staff data is required"}
        if "@" not in staff.email:
            response.status_code = status.HTTP_400_BAD_REQUEST
            return {"error": "Invalid email format"}
        if len(staff.password) < 8:
            response.status_code = status.HTTP_400_BAD_REQUEST
            return {"error": "Password must be at least 8 characters long"}
        staff_data = await staff_model.get_staff_by_email_model(staff.email)
        if staff_data is not None and staff_data.get("staff") is not None:
            response.status_code = status.HTTP_409_CONFLICT
            return {"error": "Staff already exists"}
        staff.password = hashing.hash(staff.password)
        staff.security_key = hashing.hash(staff.security_key)
        staff_data = await staff_model.create_staff_model(staff)
        if staff_data.get("error"):
            response.status_code = staff_data.get("status")
            return staff_data
        return staff_data
    except Exception as e:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return {"error": str(e)}