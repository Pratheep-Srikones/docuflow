from pydantic import BaseModel
from db.supabase import create_supabase_client
from app.utils import hashing

class Staff(BaseModel):
    first_name: str
    last_name: str
    phone: str
    email: str
    nic: str
    password: str
    security_key: str
    role: str
    job_title: str
    assigned_applications: int
    branch_id: str

async def get_supabase_client():
    return await create_supabase_client()

async def get_all_staff_by_branch_model(branch_id: str):
    try:
        supabase = await get_supabase_client()
        response = await supabase.from_('staff').select('first_name', 'last_name', 'staff_id', 'role', 'job_title').eq('branch_id', branch_id).execute()
        
        staff = response.data or []
        
        if not staff:
            return {"staff": [], "message": "No staff found", "status": 404}
        
        return {"staff": staff, "message": "Staff found", "status": 200}
    
    except Exception as e:
        return {"message": "Internal Server Error", "error": str(e), "status": 500}

async def get_staff_by_id_model(staff_id: str):
    try:
        supabase = await get_supabase_client()
        response = await supabase.from_('staff').select('*').eq('staff_id', staff_id).execute()
        
        if not response.data:
            return {"error": "Staff not found", "status": 404}
        
        return {"staff": response.data[0], "message": "Staff found", "status": 200}
    
    except Exception as e:
        return {"error": str(e), "message": "Internal Server Error", "status": 500}
    
async def get_staff_details_by_id_model(staff_id:str):
    try:
        supabase = await get_supabase_client()
        response = await supabase.from_('staff').select('first_name','last_name','role','job_title').eq('staff_id', staff_id).execute()
        
        if not response.data:
            return {"error": "Staff not found", "status": 404}
        
        return {"staff": response.data[0], "message": "Staff found", "status": 200}
    
    except Exception as e:
        return {"error": str(e), "message": "Internal Server Error", "status": 500}

async def get_staff_by_email_model(email: str):
    try:
        supabase = await get_supabase_client()
        response = await supabase.from_('staff').select('*').eq('email', email).execute()
        
        if not response.data:
            return {"error": "Staff not found", "status": 404}
        
        return {"staff": response.data[0], "message": "Staff found", "status": 200}
    
    except Exception as e:
        return {"error": str(e), "message": "Internal Server Error", "status": 500}

async def create_staff_model(staff: Staff):
    try:
        supabase = await get_supabase_client()
        response = await supabase.from_('staff').insert([staff.model_dump()]).execute()
        
        return {"staff": response.data[0], "message": "Staff created", "status": 201}
    
    except Exception as e:
        return {"error": str(e), "message": "Internal Server Error", "status": 500}

async def update_staff_model(staff_id: str, staff: Staff):
    try:
        supabase = await get_supabase_client()
        response = await supabase.from_('staff').update(staff.model_dump()).eq('staff_id', staff_id).execute()
        
        return {"staff": response.data[0], "message": "Staff updated", "status": 200}
    
    except Exception as e:
        return {"error": str(e), "message": "Internal Server Error", "status": 500}

async def delete_staff_model(staff_id: str):
    try:
        supabase = await get_supabase_client()
        await supabase.from_('staff').delete().eq('staff_id', staff_id).execute()
        
        return {"message": "Staff deleted", "status": 200}
    
    except Exception as e:
        return {"error": str(e), "message": "Internal Server Error", "status": 500}

async def get_staff_with_low_applications_model(branch_id: str):
    try:
        supabase = await get_supabase_client()
        response = await supabase.from_('staff').select('*').eq('branch_id', branch_id).eq('role',"clerical").order('assigned_applications', desc=False).limit(1).execute()
        
        if not response.data:
            return {"error": "Staff not found", "status": 404}
        
        return {"staff": response.data[0], "message": "Staff found", "status": 200}
    
    except Exception as e:
        return {"error": str(e), "message": "Internal Server Error", "status": 500}
    
async def increase_assigned_applications_model(staff_id:str):
    try:
        supabase = await get_supabase_client()
        response = await supabase.from_('staff').select('assigned_applications').eq('staff_id', staff_id).execute()
        
        assigned_applications = response.data[0]['assigned_applications']
        
        response = await supabase.from_('staff').update({"assigned_applications": assigned_applications + 1}).eq('staff_id', staff_id).execute()
        
        return {"message": "Assigned applications updated", "status": 200}
    
    except Exception as e:
        return {"error": str(e), "message": "Internal Server Error", "status": 500}
async def decrease_assigned_applications_model(staff_id:str):
    try:
        supabase = await get_supabase_client()
        response = await supabase.from_('staff').select('assigned_applications').eq('staff_id', staff_id).execute()
        
        assigned_applications = response.data[0]['assigned_applications']
        
        response = await supabase.from_('staff').update({"assigned_applications": assigned_applications - 1}).eq('staff_id', staff_id).execute()
        
        return {"message": "Assigned applications updated", "status": 200}
    
    except Exception as e:
        return {"error": str(e), "message": "Internal Server Error", "status": 500}
    
async def validate_security_key_model(staff_id: str, security_key: str):
    try:
        supabase = await get_supabase_client()
        response = await supabase.from_('staff').select('security_key').eq('staff_id', staff_id).execute()
        
        if not response.data:
            return {"error": "Staff not found", "status": 404}
        
        isValid = hashing.verify(security_key, response.data[0]['security_key'])

        if not isValid:
            return {"message": "Invalid security key", "status": 401}
        
        return {"message": "Valid security key", "status": 200}
    
    except Exception as e:
        return {"error": str(e), "message": "Internal Server Error", "status": 500}
    
async def change_staff_password_model(staff_id: str, hashed_password: str):
    try:
        supabase = await get_supabase_client()
        await supabase.from_('staff').update({"password": hashed_password}).eq('staff_id', staff_id).execute()
        
        return {"message": "Password updated", "status": 200}
    
    except Exception as e:
        return {"error": str(e), "message": "Internal Server Error", "status": 500}
