import logging
from db.supabase import create_supabase_client

async def get_org_details_model():
    try:
        supabase = await create_supabase_client()
        response = await supabase.from_('organization').select('name','address').execute()
        
        org = response.data or []
        
        if not org:
            return {"org": [], "message": "No organization found", "status": 404}
        
        return {"org": org, "message": "Organization found", "status": 200}
    
    except Exception as e:
        logging.error(f"An error occurred: {e}")
        return {"error": "Something went wrong", "message": str(e), "status": 500}