import random
import string

from fastapi import File, Response, UploadFile

from app.controllers.user_controller import get_user_by_id
from app.utils.upload import upload_pdf_to_supabase_storage


def generate_random_string(length=4):
    letters = string.ascii_letters
    return ''.join(random.choice(letters) for i in range(length))

async def upload_pdf(applicant_id: str, response:Response, file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        return {"error": "Only PDF files allowed", "status": 400}
    applicant = await get_user_by_id(applicant_id,response)
    applicant = applicant.get("user")
    print("APPLICANT->",applicant)

    if applicant is None:
        return {"error": "Applicant not found", "status": 404}
    
    
    if applicant.get("nic") is None:
        return {"error": "Applicant NIC not found", "status": 404}
    
    file_name = applicant.get("nic") + generate_random_string(4)+ ".pdf"
    file_name = file_name.lstrip("/")


    upload_data = await upload_pdf_to_supabase_storage(file_name,False,file)
    if upload_data.get("error"):
        response.status_code = upload_data.get("status")
        return upload_data
    return upload_data