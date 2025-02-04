from pydantic import BaseModel
from db.supabase import create_supabase_client

class Application(BaseModel):
    applicant_id: str
    submitted_date: str
    status: str
    reviewed_by: str
    assigned_to: str
    title: str
    description: str
    signed_by: str
    signed_date: str
    remarks: str
    doc_link: str
    branch_id: str

async def get_supabase_client():
    return await create_supabase_client()

async def get_applications_assigned_by_status_model(status: str, assigned_to: str):
    try:
        supabase = await get_supabase_client()
        response = await supabase.from_('applications').select('*').eq('status', status).eq('assigned_to', assigned_to).execute()
        
        applications = response.data or []
        
        if not applications:
            return {"applications": [], "message": "No applications found", "status": 404}
        
        return {"applications": applications, "message": "Applications found", "status": 200}
    
    except Exception as e:
        return {"error": "Something went wrong", "message": str(e), "status": 500}

async def get_application_by_id_model(application_id: str):
    try:
        supabase = await get_supabase_client()
        response = await supabase.from_('applications').select('*').eq('application_id', application_id).execute()
        
        if not response.data:
            return {"error": "Application not found", "status": 404}
        
        return {"application": response.data[0], "message": "Application found", "status": 200}
    
    except Exception as e:
        return {"error": str(e), "message": "Internal Server Error", "status": 500}

async def update_application_status_model(application_id: str, status: str, signed_by: str, signed_date: str):
    try:
        supabase = await get_supabase_client()
        response = await supabase.from_('applications').update(
            {"status": status, "signed_by": signed_by, "signed_date": signed_date}
        ).eq('application_id', application_id).execute()
        
        return {"application": response.data[0], "message": "Application updated", "status": 200}
    
    except Exception as e:
        return {"error": str(e), "message": "Internal Server Error", "status": 500}

async def update_application_reviewed_by_model(application_id: str, reviewed_by: str):
    try:
        supabase = await get_supabase_client()
        response = await supabase.from_('applications').update({"reviewed_by": reviewed_by}).eq('application_id', application_id).execute()
        
        return {"application": response.data[0], "message": "Application updated", "status": 200}
    
    except Exception as e:
        return {"error": str(e), "message": "Internal Server Error", "status": 500}

async def assign_application_model(application_id: str, assigned_to: str):
    try:
        supabase = await get_supabase_client()
        response = await supabase.from_('applications').update({"assigned_to": assigned_to}).eq('application_id', application_id).execute()
        
        return {"application": response.data[0], "message": "Application updated", "status": 200}
    
    except Exception as e:
        return {"error": str(e), "message": "Internal Server Error", "status": 500}

async def create_application_model(application: Application):
    try:
        supabase = await get_supabase_client()
        response = await supabase.from_('applications').insert({
            "applicant_id": application.applicant_id,
            "status": application.status,
            "assigned_to": application.assigned_to,
            "title": application.title,
            "description": application.description,
            "remarks": application.remarks,
            "doc_link": application.doc_link,
            "branch_id": application.branch_id
        }).execute()
        
        return {"application": response.data[0], "message": "Application created", "status": 201}
    
    except Exception as e:
        return {"error": str(e), "message": "Internal Server Error", "status": 500}

async def delete_application_model(application_id: str):
    try:
        supabase = await get_supabase_client()
        await supabase.from_('applications').delete().eq('application_id', application_id).execute()
        
        return {"message": "Application deleted", "status": 200}
    
    except Exception as e:
        return {"error": str(e), "message": "Internal Server Error", "status": 500}

async def get_applications_by_applicant(applicant_id: str):
    try:
        supabase = await get_supabase_client()
        response = await supabase.from_('applications').select('*').eq('applicant_id', applicant_id).execute()
        
        applications = response.data or []
        
        if not applications:
            return {"applications": [], "message": "No applications found", "status": 404}
        
        return {"applications": applications, "message": "Applications found", "status": 200}
    
    except Exception as e:
        return {"error": "Something went wrong", "message": str(e), "status": 500}
