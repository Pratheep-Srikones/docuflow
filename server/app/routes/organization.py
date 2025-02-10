from fastapi import APIRouter, Response
from app.controllers import organization_controller

router = APIRouter()

@router.get("/")
async def get_org_details(response: Response):
    return await organization_controller.get_org_details(response)