from fastapi import status, Response

from app.models import application_model

def get_all_appliactions_assigned_by_status(assigned_to:str,in_status:str,response:Response):
    if not assigned_to or assigned_to.strip() == '':
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Applicant ID is required"}
    if len(assigned_to) != 36:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Invalid applicant ID format"}
    if not in_status or in_status.strip() == '':
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Status is required"}
    if in_status not in ['pending','approved','rejected','under review']:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Invalid status"}
    application_data = application_model.get_applications_assigned_by_status_model(status=in_status,assigned_to=assigned_to)
    if application_data.get("error"):
        response.status_code = application_data.get("status")
        return application_data
    return application_data

def get_all_applications_by_applicant(applicant_id:str,response:Response):
    if not applicant_id or applicant_id.strip() == '':
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Applicant ID is required"}
    if len(applicant_id) != 36:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Invalid applicant ID format"}
    application_data = application_model.get_applications_by_applicant(applicant_id)
    if application_data.get("error"):
        response.status_code = application_data.get("status")
        return application_data
    return application_data
    
def get_application_by_id(application_id:str,response:Response):
    if not application_id or application_id.strip() == '':
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Application ID is required"}
    if len(application_id) != 36:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Invalid application ID format"}
    application_data = application_model.get_application_by_id_model(application_id)
    if application_data.get("error"):
        response.status_code = application_data.get("status")
        return application_data
    return application_data

def update_application_status(application_id:str,in_status:str,response:Response):
    if not application_id or application_id.strip() == '':
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Application ID is required"}
    if len(application_id) != 36:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Invalid application ID format"}
    if not in_status or in_status.strip() == '':
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Status is required"}
    if in_status not in ['pending','approved','rejected','under review']:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Invalid status"}
    application_data = application_model.update_application_status_model(application_id,in_status)
    if application_data.get("error"):
        response.status_code = application_data.get("status")
        return application_data
    return application_data

#need reconsideration
def update_application_reviewed_by(application_id:str,reviewed_by:str,response:Response):
    if not application_id or application_id.strip() == '':
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Application ID is required"}
    if len(application_id) != 36:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Invalid application ID format"}
    if not reviewed_by or reviewed_by.strip() == '':
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Reviewed by is required"}
    if len(reviewed_by) != 36:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Invalid reviewed by format"}
    application_data = application_model.update_application_reviewed_by_model(application_id,reviewed_by)
    if application_data.get("error"):
        response.status_code = application_data.get("status")
        return application_data
    return application_data

def assign_application(application_id:str,assigned_to:str,response:Response):
    if not application_id or application_id.strip() == '':
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Application ID is required"}
    if len(application_id) != 36:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Invalid application ID format"}
    if not assigned_to or assigned_to.strip() == '':
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Assigned to is required"}
    if len(assigned_to) != 36:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Invalid assigned to format"}
    application_data = application_model.assign_application_model(application_id,assigned_to)
    if application_data.get("error"):
        response.status_code = application_data.get("status")
        return application_data
    return application_data

def create_application(application:application_model.Application,response:Response):
    if not application:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Application data is required"}
    application_data = application_model.create_application_model(application)
    if application_data.get("error"):
        response.status_code = application_data.get("status")
        return application_data
    return application_data

def delete_application(application_id:str,response:Response):
    if not application_id or application_id.strip() == '':
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Application ID is required"}
    if len(application_id) != 36:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Invalid application ID format"}
    application_data = application_model.delete_application_model(application_id)
    if application_data.get("error"):
        response.status_code = application_data.get("status")
        return application_data
    return application_data

