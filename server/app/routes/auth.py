from fastapi import APIRouter, Response, status
from pydantic import BaseModel
from app.controllers import auth_controller
from app.models import user_model

router = APIRouter()

class LoginRequest(BaseModel):
    nic: str
    password: str

@router.post("/login", status_code=200)
async def login(request: LoginRequest, response: Response):
    nic = request.nic
    password = request.password

    if nic is None or password is None:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "NIC and password are required"}
    
    return await auth_controller.login(nic, password, response)

@router.post("/register", status_code=201)
async def register(user: user_model.User, response: Response):
    return await auth_controller.register(user, response)