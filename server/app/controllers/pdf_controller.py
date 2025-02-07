import re
from fastapi import status, Response
from app.utils import pdf,upload

def extract_file_name_from_link(pdf_url: str) -> str:
    match = re.search(r"/([^/]+\.pdf)\?", pdf_url)
    return match.group(1) if match else None
    
async def sign_pdf(pdf_url: str, text:str,in_status:str, response: Response):
    if (pdf_url == ""):
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "PDF not found"}

    if (text == ""):
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "Text not found"}
    
    if (in_status == ""):
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "Status not found"}
    file_name = extract_file_name_from_link(pdf_url)
    if (file_name == ""):
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "File name not found"}
    
    pdf_data = await pdf.sign_pdf(pdf_url, text,in_status)
    if pdf_data.get("error"):
        response.status_code = pdf_data.get("status")
        return pdf_data
    
    if pdf_data.get("pdf"):
        delete_data = await upload.delete_file_from_supabase_storage(file_name)
        if delete_data.get("error"):
            response.status_code = delete_data.get("status")
            return delete_data
        upload_data = await upload.upload_pdf_to_supabase_storage(file_name,pdf_data.get("pdf"))
        if upload_data.get("error"):
            response.status_code = upload_data.get("status")
            return upload_data
        return upload_data

    