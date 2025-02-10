from fastapi import status, Response
from app.models import organization_models

async def get_org_details(response: Response):
    org_data = await organization_models.get_org_details_model()
    if org_data.get("error"):
        response.status_code = org_data.get("status")
        return org_data
    
    return org_data