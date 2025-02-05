from pydantic import BaseModel
from db.supabase import create_supabase_client

class Branch(BaseModel):
    name:str
    branch_id:str

async def get_all_branches():
    try:
        supabase = await create_supabase_client()
        response = await supabase.from_('branches').select('*').execute()
        
        branches = response.data or []
        
        if not branches:
            return {"branches": [], "message": "No branches found", "status": 404}
        
        return {"branches": branches, "message": "Branches found", "status": 200}
    
    except Exception as e:
        return {"message": "Internal Server Error", "error": str(e), "status": 500}