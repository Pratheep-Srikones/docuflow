from pydantic import BaseModel
from db.supabase import create_supabase_client

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
        response = await supabase.from_('staff').select('*').eq('branch_id', branch_id).execute()
        
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
