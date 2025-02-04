from fastapi import APIRouter, Response
from datetime import datetime
from app.controllers import application_controller
from app.models import application_model

router = APIRouter()

@router.get("/assigned/{assigned_to}/{status}", status_code=200)
async def get_applications_assigned_by_status(assigned_to: str, status: str, response: Response):
    return await application_controller.get_all_appliactions_assigned_by_status(assigned_to, status, response)

@router.get("/applicant/{applicant_id}", status_code=200)
async def get_applications_by_applicant(applicant_id: str, response: Response):
    return await application_controller.get_all_applications_by_applicant(applicant_id, response)

@router.get("/{application_id}", status_code=200)
async def get_application_by_id(application_id: str, response: Response):
    return await application_controller.get_application_by_id(application_id, response)

@router.put("/{application_id}/{status}", status_code=200)
async def update_application_status(application_id: str, status: str, response: Response):
    return await application_controller.update_application_status(application_id, status, response)

@router.put("/{application_id}/assign/{assigned_to}", status_code=200)
async def assign_application(application_id: str, assigned_to: str, response: Response):
    return await application_controller.assign_application(application_id, assigned_to, response)

@router.post("/", status_code=201)
async def create_application(application: application_model.Application, response: Response):
    return await application_controller.create_application(application, response)

@router.delete("/{application_id}", status_code=200)
async def delete_application(application_id: str, response: Response):
    return await application_controller.delete_application(application_id, response)

@router.put("/approve/{application_id}/{signed_by}", status_code=200)
async def approve_application(application_id: str, signed_by: str, response: Response):
    signed_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')
    return await application_controller.approve_application(application_id, signed_by, signed_date, response)

@router.put("/reject/{application_id}/{signed_by}", status_code=200)
async def reject_application(application_id: str, signed_by: str, response: Response):
    signed_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')
    return await application_controller.reject_application(application_id, signed_by, signed_date, response)
