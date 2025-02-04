from fastapi import APIRouter, File, Response, UploadFile
from app.utils import upload

router = APIRouter()

@router.post("/{applicant_id}", status_code=201)
async def upload_file(applicant_id:str,response:Response, file: UploadFile = File(...)):
    print("starting")
    print("file received: ",file)
    if file is None:
        return {"error": "No file provided", "status": 400}
    return await upload.upload_pdf_to_supabase_storage(applicant_id,response,file)
