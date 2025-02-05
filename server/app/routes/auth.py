from fastapi import APIRouter, Response, status
from pydantic import BaseModel
from app.controllers import auth_controller
from app.models import user_model

router = APIRouter()

class UserLoginRequest(BaseModel):
    nic: str
    password: str

class StaffLoginRequest(BaseModel):
    email: str
    password: str

@router.post("/user/login", status_code=200)
async def user_login(request: UserLoginRequest, response: Response):
    nic = request.nic
    password = request.password

    if nic is None or password is None:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "NIC and password are required"}
    
    return await auth_controller.user_login(nic, password, response)

@router.post("/user/register", status_code=201)
async def user_register(user: user_model.User, response: Response):
    return await auth_controller.user_register(user, response)

@router.post("/staff/login", status_code=200)
async def staff_login(request: StaffLoginRequest, response: Response):
    email = request.email
    password = request.password

    if email is None or password is None:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "Email and password are required"}
    
    return await auth_controller.staff_login(email, password, response)


