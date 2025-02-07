from fastapi import APIRouter, Response
from pydantic import BaseModel

from app.controllers import pdf_controller
router = APIRouter()

class SignRequest(BaseModel):
    pdf_url: str
    text: str
    status: str

@router.post("/sign", status_code=200)
async def sign_pdf(request: SignRequest, response: Response):
    return await pdf_controller.sign_pdf(request.pdf_url, request.text,request.status, response)