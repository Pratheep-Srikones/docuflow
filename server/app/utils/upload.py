import uuid
from fastapi import File, Response, UploadFile
from app.controllers.user_controller import get_user_by_id
from db.supabase import create_supabase_client
import random
import string

BUCKET_NAME = "documents"


async def upload_pdf_to_supabase_storage(file_name:str, signed:bool, file: UploadFile = File(...)):

    supabase = await create_supabase_client()
    if signed:
        file_bytes =  file.read()
    else:
        file_bytes = await file.read()
    
    try:
        # Upload file to Supabase Storage
        response = await supabase.storage.from_(BUCKET_NAME).upload(
            file_name, 
            file_bytes, 
            file_options={
                "content-type": "application/pdf",  # Correct MIME type for PDF
                "cacheControl": "no-cache",         # Set appropriate cache control
                "contentDisposition": f"attachment; filename={file_name}.pdf"  # Correct content disposition header
            }
        )
        
        if response is None:  # Supabase might return None if upload fails
            raise ValueError("Upload response is None")
        
        # Get the public URL of the uploaded file
        files = await supabase.storage.from_("documents").list()
        print(files)

        file_url = await supabase.storage.from_("documents").create_signed_url(file_name, 3600*24*365)

        
        return {"file_url": file_url.get("signedURL"), "status": 200}
    
    except Exception as e:
        return {"error": str(e), "status": 500, "message": "Error uploading file to Supabase Storage"}

async def delete_file_from_supabase_storage(file_name:str):
    supabase = await create_supabase_client()
    try:
        # Delete file from Supabase Storage
        response = await supabase.storage.from_(BUCKET_NAME).remove([file_name])
        if response is None:  # Supabase might return None if delete fails
            raise ValueError("Delete response is None")
        return {"status": 200, "message": "File deleted successfully"}
    except Exception as e:
        return {"error": str(e), "status": 500, "message": "Error deleting file from Supabase Storage"}