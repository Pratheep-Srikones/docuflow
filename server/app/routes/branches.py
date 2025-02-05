from fastapi import APIRouter, Response
from app.controllers import branch_controller

router = APIRouter()

@router.get("/", status_code=200)
async def get_all_branches(response: Response):
    return await branch_controller.get_all_branches(response)