from pydantic import BaseModel
from db.supabase import create_supabase_client

supabase = create_supabase_client()

class Application(BaseModel):
    applicant_id:str
    submitted_date:str
    status:str
    reviewed_by:str
    assigned_to:str
    title:str
    description:str
    signed_by:str
    signed_date:str
    remarks:str
    doc_link:str
    branch_id: str
   

def get_applications_assigned_by_status_model(status:str, assigned_to:str):
    try:
        response = supabase.from_('applications').select('*').eq('status', status).eq('assigned_to', assigned_to).execute()
        
        applications = getattr(response, "data", [])  # Safe way to access data
        
        if not applications:
            return {"applications": [], "message": "No applications found", "status": 404}
        
        return {"applications": applications, "message": "Applications found", "status": 200}
    
    except Exception as e:
        return {"error": "Something went wrong", "message": str(e), "status": 500}
    
def get_application_by_id_model(application_id:str):
    try:
        response = supabase.from_('applications').select('*').eq('application_id', application_id).execute()
        if not response.data or len(response.data) == 0:
            return {"error": "Application not found", "status": 404}
        
        return {"application": response.data[0], "message": "Application found", "status": 200}
    
    except Exception as e:
        return {"error": str(e), "message": "Internal Server Error", "status": 500}
    
def update_application_status_model(application_id:str, status:str):
    try:
        response = supabase.from_('applications').update({"status": status}).eq('application_id', application_id).execute()
        return {"application": response.data[0], "message": "Application updated", "status": 200}
    
    except Exception as e:
        return {"error": str(e), "message": "Internal Server Error", "status": 500}
    
def update_application_reviewed_by_model(application_id:str, reviewed_by:str):
    try:
        response = supabase.from_('applications').update({"reviewed_by": reviewed_by}).eq('application_id', application_id).execute()
        return {"application": response.data[0], "message": "Application updated", "status": 200}
    
    except Exception as e:
        return {"error": str(e), "message": "Internal Server Error", "status": 500}
    
def assign_application_model(application_id:str, assigned_to:str):
    try:
        response = supabase.from_('applications').update({"assigned_to": assigned_to}).eq('application_id', application_id).execute()
        return {"application": response.data[0], "message": "Application updated", "status": 200}
    
    except Exception as e:
        return {"error": str(e), "message": "Internal Server Error", "status": 500}
    
def create_application_model(application: Application):
    try:
        response = supabase.from_('applications').insert({
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

def delete_application_model(application_id:str):
    try:
        response = supabase.from_('applications').delete().eq('application_id', application_id).execute()
        return {"message": "Application deleted", "status": 200}
    
    except Exception as e:
        return {"error": str(e), "message": "Internal Server Error", "status": 500}
    
def get_applications_by_applicant(applicant_id:str):
    try:
        response = supabase.from_('applications').select('*').eq('applicant_id', applicant_id).execute()
        
        applications = getattr(response, "data", [])  # Safe way to access data
        
        if not applications:
            return {"applications": [], "message": "No applications found", "status": 404}
        
        return {"applications": applications, "message": "Applications found", "status": 200}
    
    except Exception as e:
        return {"error": "Something went wrong", "message": str(e), "status": 500}
    
