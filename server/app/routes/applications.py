from fastapi import APIRouter, Response

from app.controllers import application_controller
from app.models import application_model

router = APIRouter()

@router.get("/assigned/{assigned_to}/{status}",status_code=200)
def get_applications_assigned_by_status(assigned_to:str,status:str,response:Response):
    return application_controller.get_all_appliactions_assigned_by_status(assigned_to,status,response)

@router.get("/applicant/{applicant_id}",status_code=200)
def get_applications_by_applicant(applicant_id:str,response:Response):
    return application_controller.get_all_applications_by_applicant(applicant_id,response)

@router.get("/{application_id}",status_code=200)
def get_application_by_id(application_id:str,response:Response):
    return application_controller.get_application_by_id(application_id,response)

@router.put("/{application_id}/{status}",status_code=200)
def update_application_status(application_id:str,status:str,response:Response):
    return application_controller.update_application_status(application_id,status,response)

@router.put("/{application_id}/assign/{assigned_to}",status_code=200)
def assign_application(application_id:str,assigned_to:str,response:Response):
    return application_controller.assign_application(application_id,assigned_to,response)

@router.post("/",status_code=201)
def create_application(application: application_model.Application, response: Response):
    return application_controller.create_application(application,response)

@router.delete("/{application_id}",status_code=200)
def delete_application(application_id:str, response: Response):
    return application_controller.delete_application(application_id,response)

