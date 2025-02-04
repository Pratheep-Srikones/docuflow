import uuid
from fastapi import File, Response, UploadFile
from app.controllers.user_controller import get_user_by_id
from db.supabase import create_supabase_client

BUCKET_NAME = "documents"

async def upload_pdf_to_supabase_storage(applicant_id: str, response:Response, file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        return {"error": "Only PDF files allowed", "status": 400}
    
    # Generate a unique file name if not provided

    applicant = await get_user_by_id(applicant_id,response)
    applicant = applicant.get("user")
    print("APPLICANT->",applicant)

    if applicant is None:
        return {"error": "Applicant not found", "status": 404}
    
    
    if applicant.get("nic") is None:
        return {"error": "Applicant NIC not found", "status": 404}
    
    file_name = applicant.get("nic") + ".pdf"
    file_name = file_name.lstrip("/")

    supabase = await create_supabase_client()
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
