from fastapi import status, Response
from fastapi.responses import JSONResponse
from app.models import staff_model
from app.utils import hashing

async def get_all_staff_by_branch(branch_id: str, response: Response):
    if not branch_id or branch_id.strip() == "":
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "Branch ID is required"}
    
    staff_data = await staff_model.get_all_staff_by_branch_model(branch_id)
    if staff_data.get("error"):
        response.status_code = staff_data.get("status")
        return staff_data
    
    return staff_data

async def get_staff_by_id(staff_id: str, response: Response):
    if not staff_id or staff_id.strip() == "":
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "Staff ID is required"}
    if len(staff_id) != 36:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "Invalid staff ID format"}
    
    staff_data = await staff_model.get_staff_by_id_model(staff_id)
    if staff_data.get("error"):
        response.status_code = staff_data.get("status")
        return staff_data
    
    return staff_data

async def get_staff_details_by_id(staff_id: str, response: Response):
    if not staff_id or staff_id.strip() == "":
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "Staff ID is required"}
    if len(staff_id) != 36:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "Invalid staff ID format"}
    
    staff_data = await staff_model.get_staff_details_by_id_model(staff_id)
    if staff_data.get("error"):
        response.status_code = staff_data.get("status")
        return staff_data
    
    return staff_data

async def get_staff_by_email(email: str, response: Response):
    if not email or email.strip() == "":
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "Email is required"}
    
    staff_data = await staff_model.get_staff_by_email_model(email)
    if staff_data.get("error"):
        response.status_code = staff_data.get("status")
        return staff_data
    
    return staff_data

async def create_staff(staff: staff_model.Staff, response: Response):
    if not staff:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "Staff data is required"}
    staff_data = await staff_model.create_staff_model(staff)
    if staff_data.get("error"):
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return JSONResponse(status_code=staff_data.get("status"), content={
            "error": staff_data.get("error"),
            "message": staff_data.get("message"),
            "data": staff_data
        })

    
    return staff_data

async def update_staff(staff_id: str, staff: staff_model.Staff, response: Response):
    if not staff_id or staff_id.strip() == "":
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "Staff ID is required"}
    if len(staff_id) != 36:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "Invalid staff ID format"}
    
    staff_data = await staff_model.update_staff_model(staff_id, staff)
    if staff_data.get("error"):
        response.status_code = staff_data.get("status")
        return staff_data
    
    return staff_data

async def delete_staff(staff_id: str, response: Response):
    if not staff_id or staff_id.strip() == "":
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "Staff ID is required"}
    if len(staff_id) != 36:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "Invalid staff ID format"}
    
    staff_data = await staff_model.delete_staff_model(staff_id)
    if staff_data.get("error"):
        response.status_code = staff_data.get("status")
        return staff_data
    
    return staff_data

async def validate_security_key(staff_id: str, security_key: str, response: Response):
    if not staff_id or staff_id.strip() == "":
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "Staff ID is required"}
    if len(staff_id) != 36:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "Invalid staff ID format"}
    if not security_key or security_key.strip() == "":
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "Security key is required"}
    
    staff_data = await staff_model.validate_security_key_model(staff_id, security_key)
    if staff_data.get("error"):
        response.status_code = staff_data.get("status")
        return staff_data
    
    return staff_data

async def change_staff_password(staff_id: str, old_password:str, new_password:str, response:Response):
    if not staff_id or staff_id.strip() == "":
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "Staff ID is required"}
    if len(staff_id) != 36:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "Invalid staff ID format"}
    if not old_password or old_password.strip() == "":
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "Old password is required"}
    if not new_password or new_password.strip() == "":
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "New password is required"}
    
    staff_data = await staff_model.get_staff_by_id_model(staff_id)
    if staff_data.get("error"):
        response.status_code = staff_data.get("status")
        return staff_data
    staff = staff_data.get("staff")
    isValid = hashing.verify(old_password, staff.get("password"))
    if not isValid:
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return {"error": "Invalid old password"}
    
    hashed_password = hashing.hash(new_password)
    staff_data = await staff_model.change_staff_password_model(staff_id, hashed_password)
    if staff_data.get("error"):
        response.status_code = staff_data.get("status")
        return staff_data
    return staff_data
       