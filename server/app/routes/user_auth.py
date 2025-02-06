from fastapi import APIRouter, Response, status
from pydantic import BaseModel
from app.controllers import auth_controller,user_controller
from app.models import user_model
from fastapi.security import OAuth2PasswordBearer
router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/user/login")


class UserLoginRequest(BaseModel):
    nic: str
    password: str

class changePasswordRequest(BaseModel):
    old_password: str
    new_password: str

@router.post("/login", status_code=200)
async def user_login(request: UserLoginRequest, response: Response):
    nic = request.nic
    password = request.password

    if nic is None or password is None:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "NIC and password are required"}
    
    return await auth_controller.user_login(nic, password, response)

@router.post("/register", status_code=201)
async def user_register(user: user_model.User, response: Response):
    return await auth_controller.user_register(user, response)

@router.post("/password/change/{user_id}", status_code=200)
async def change_password(user_id: str, request: changePasswordRequest ,response: Response):
    return await user_controller.change_password(user_id, request.old_password, request.new_password, response)



