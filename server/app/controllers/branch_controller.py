from fastapi import status, Response

from app.models import branch_model

async def get_all_branches(response: Response):
    branch_data = await branch_model.get_all_branches()
    if branch_data.get("error"):
        response.status_code = branch_data.get("status")
        return branch_data
    
    return branch_data