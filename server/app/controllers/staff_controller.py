from fastapi import status, Response

from app.models import staff_model

def get_all_staff_by_branch(branch_id: str, response: Response):
    if not branch_id or branch_id.strip() == "":
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "Branch ID is required"}
    
    staff_data = staff_model.get_all_staff_by_branch_model(branch_id)
    if staff_data.get("error"):
        response.status_code = staff_data.get("status")
        return staff_data
    
    return staff_data

def get_staff_by_id(staff_id:str, response: Response):
    if not staff_id or staff_id.strip() == "":
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "Staff ID is required"}
    if len(staff_id) != 36:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "Invalid staff ID format"}
    
    staff_data = staff_model.get_staff_by_id_model(staff_id)
    if staff_data.get("error"):
        response.status_code = staff_data.get("status")
        return staff_data
    
    return staff_data

def get_staff_by_email(email:str, response: Response):
    if not email or email.strip() == "":
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "Email is required"}
    
    staff_data = staff_model.get_staff_by_email_model(email)
    if staff_data.get("error"):
        response.status_code = staff_data.get("status")
        return staff_data
    
    return staff_data

def create_staff(staff: staff_model.Staff, response: Response):
    if not staff:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "Staff data is required"}
    
    staff_data = staff_model.create_staff_model(staff)
    if staff_data.get("error"):
        response.status_code = staff_data.get("status")
        return staff_data
    
    return staff_data

def update_staff(staff_id:str, staff: staff_model.Staff, response: Response):
    if not staff_id or staff_id.strip() == "":
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "Staff ID is required"}
    if len(staff_id) != 36:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "Invalid staff ID format"}
    
    staff_data = staff_model.update_staff_model(staff_id, staff)
    if staff_data.get("error"):
        response.status_code = staff_data.get("status")
        return staff_data
    
    return staff_data

def delete_staff(staff_id:str, response: Response):
    if not staff_id or staff_id.strip() == "":
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "Staff ID is required"}
    if len(staff_id) != 36:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "Invalid staff ID format"}
    
    staff_data = staff_model.delete_staff_model(staff_id)
    if staff_data.get("error"):
        response.status_code = staff_data.get("status")
        return staff_data
    
    return staff_data

