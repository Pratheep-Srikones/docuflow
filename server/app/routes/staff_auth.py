from fastapi import APIRouter, Response, status
from pydantic import BaseModel
from app.controllers import auth_controller
from fastapi.security import OAuth2PasswordBearer

from app.models import staff_model
router = APIRouter()

class StaffLoginRequest(BaseModel):
    email: str
    password: str

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/staff/login")


@router.post("/login", status_code=200)
async def staff_login(request: StaffLoginRequest, response: Response):
    email = request.email
    password = request.password

    if email is None or password is None:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "Email and password are required"}
    
    return await auth_controller.staff_login(email, password, response)

@router.post("/register", status_code=201)
async def staff_register(staff: staff_model.Staff, response: Response):
    return await auth_controller.staff_register(staff, response)
