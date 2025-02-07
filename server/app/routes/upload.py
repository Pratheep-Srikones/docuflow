from fastapi import APIRouter, File, Response, UploadFile
from app.controllers import upload_controller
router = APIRouter()

@router.post("/{applicant_id}", status_code=201)
async def upload_file(applicant_id:str,response:Response, file: UploadFile = File(...)):
    if file is None:
        return {"error": "No file provided", "status": 400}
    return await upload_controller.upload_pdf(applicant_id,response,file)
