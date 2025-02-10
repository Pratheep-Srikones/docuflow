from fastapi import status, Response

from app.models import application_model
from app.models import staff_model

async def get_all_appliactions_assigned_by_status(assigned_to:str,in_status:str,response:Response):
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
    application_data = await application_model.get_applications_assigned_by_status_model(status=in_status,assigned_to=assigned_to)
    if application_data.get("error"):
        response.status_code = application_data.get("status")
        return application_data
    return application_data

async def get_all_applications_by_applicant(applicant_id:str,response:Response):
    if not applicant_id or applicant_id.strip() == '':
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Applicant ID is required"}
    if len(applicant_id) != 36:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Invalid applicant ID format"}
    application_data = await application_model.get_applications_by_applicant(applicant_id)
    if application_data.get("error"):
        response.status_code = application_data.get("status")
        return application_data
    return application_data
    
async def get_application_by_id(application_id:str,response:Response):
    if not application_id or application_id.strip() == '':
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Application ID is required"}
    if len(application_id) != 36:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Invalid application ID format"}
    application_data = await application_model.get_application_by_id_model(application_id)
    if application_data.get("error"):
        response.status_code = application_data.get("status")
        return application_data
    return application_data

async def update_application_status(application_id:str,in_status:str,response:Response):
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
    application_data = await application_model.update_application_status_model(application_id,in_status,"","")
    if application_data.get("error"):
        response.status_code = application_data.get("status")
        return application_data
    return application_data

#need reconsideration
async def update_application_reviewed_by(application_id:str,reviewed_by:str,response:Response):
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
    application_data = await application_model.update_application_reviewed_by_model(application_id,reviewed_by)
    if application_data.get("error"):
        response.status_code = application_data.get("status")
        return application_data
    return application_data

async def update_application(application_id:str,application:application_model.Application,response:Response):
    if not application_id or application_id.strip() == '':
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Application ID is required"}
    if len(application_id) != 36:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Invalid application ID format"}
    if not application:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Application data is required"}
    application_data = await application_model.update_application_model(application_id,application)
    if application_data.get("error"):
        response.status_code = application_data.get("status")
        return application_data
    reduced_data = await staff_model.decrease_assigned_applications_model(application.assigned_to)
    if reduced_data.get("error"):
        response.status_code = reduced_data.get("status")
        return reduced_data
    return application_data


async def assign_application(application_id:str,assigned_to:str,old_assignee_id:str ,response:Response):
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
    application_data = await application_model.assign_application_model(application_id,assigned_to)
    if application_data.get("error"):
        response.status_code = application_data.get("status")
        return application_data
    reduced_data = await staff_model.decrease_assigned_applications_model(old_assignee_id)
    if reduced_data.get("error"):
        response.status_code = reduced_data.get("status")
        return reduced_data
    return application_data

async def create_application(application:application_model.Application,response:Response):
    if not application:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Application data is required"}
    previous_application_data = await application_model.get_pending_applications_by_applicant(application.applicant_id)
    if previous_application_data.get("error"):
        response.status_code = previous_application_data.get("status")
        return previous_application_data
    
    if (previous_application_data.get("applications") and len(previous_application_data.get("applications")) >= 5):
        for app in previous_application_data.get("applications"):
            if app.get("status") == 'pending':
                response.status_code = status.HTTP_409_CONFLICT
                return {"message":"Previous application is pending","error":"Cannot submit multiple applications","status":409}
            
    staff_data = await staff_model.get_staff_with_low_applications_model(application.branch_id)
    if staff_data.get("error"):
        response.status_code = staff_data.get("status")
        return staff_data
    if not staff_data.get("staff"):
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"error":"No staff found","status":404}
    
    application.assigned_to = staff_data.get("staff").get("staff_id")
    data = await staff_model.increase_assigned_applications_model(application.assigned_to)
    if data.get("error"):
        response.status_code = data.get("status")
        return data
    
    application_data = await application_model.create_application_model(application)

    if application_data.get("error"):
        response.status_code = application_data.get("status")
        return application_data
    return application_data

async def delete_application(application_id:str,response:Response):
    if not application_id or application_id.strip() == '':
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Application ID is required"}
    if len(application_id) != 36:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Invalid application ID format"}
    application_data = await application_model.delete_application_model(application_id)
    if application_data.get("error"):
        response.status_code = application_data.get("status")
        return application_data
    return application_data

async def approve_application(application_id:str, signed_by:str, signed_date:str, response:Response):
    if not application_id or application_id.strip() == '':
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Application ID is required"}
    if len(application_id) != 36:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Invalid application ID format"}
    if not signed_by or signed_by.strip() == '':
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Signed by is required"}
    if len(signed_by) != 36:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Invalid signed by format"}
    if not signed_date or signed_date.strip() == '':
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Signed date is required"}
    application_data = await application_model.update_application_status_model(application_id, 'approved', signed_by, signed_date)
    if application_data.get("error"):
        response.status_code = application_data.get("status")
        return application_data
    return application_data

async def reject_application(application_id:str, signed_by:str, signed_date:str, response:Response):
    if not application_id or application_id.strip() == '':
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Application ID is required"}
    if len(application_id) != 36:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Invalid application ID format"}
    if not signed_by or signed_by.strip() == '':
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Signed by is required"}
    if len(signed_by) != 36:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Invalid signed by format"}
    if not signed_date or signed_date.strip() == '':
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error":"Signed date is required"}
    application_data = await application_model.update_application_status_model(application_id, 'rejected', signed_by, signed_date)
    if application_data.get("error"):
        response.status_code = application_data.get("status")
        return application_data
    return application_data
