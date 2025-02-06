from fastapi import APIRouter, Response
from pydantic import BaseModel
from app.controllers import staff_controller
from app.models import staff_model

router = APIRouter()

class ValidateRequest(BaseModel):
    security_key: str

@router.get("/branch/{branch_id}", status_code=200)
async def get_all_staff_by_branch(branch_id: str, response: Response):
    return await staff_controller.get_all_staff_by_branch(branch_id, response)

@router.get("/{staff_id}", status_code=200)
async def get_staff_by_id(staff_id: str, response: Response):
    return await staff_controller.get_staff_by_id(staff_id, response)

@router.get("/details/{staff_id}", status_code=200)
async def get_staff_details_by_id(staff_id: str, response: Response):
    return await staff_controller.get_staff_details_by_id(staff_id, response)

@router.get("/email/{email}", status_code=200)
async def get_staff_by_email(email: str, response: Response):
    return await staff_controller.get_staff_by_email(email, response)

@router.post("/", status_code=201)
async def create_staff(staff: staff_model.Staff, response: Response):
    return await staff_controller.create_staff(staff, response)

@router.put("/{staff_id}", status_code=200)
async def update_staff(staff_id: str, staff: staff_model.Staff, response: Response):
    return await staff_controller.update_staff(staff_id, staff, response)

@router.delete("/{staff_id}", status_code=200)
async def delete_staff(staff_id: str, response: Response):
    return await staff_controller.delete_staff(staff_id, response)

@router.post("/validate/{staff_id}", status_code=200)
async def validate_security_key(staff_id: str,request:ValidateRequest, response: Response):
    return await staff_controller.validate_security_key(staff_id, request.security_key, response)