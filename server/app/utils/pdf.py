import fitz  # PyMuPDF
import requests
from io import BytesIO
import httpx

colors = {
    "Approved": (0, 0.5, 0),  # Green
    "Rejected": (1, 0, 0),  # Red
}

async def sign_pdf(pdf_url:str,text:str,status:str):
    try:
        print(pdf_url)
        async with httpx.AsyncClient() as client:
            response = await client.get(pdf_url)
        if response.status_code != 200 or not response.content:
            return {"error": "PDF not found or empty", "status": 400}


        pdf_bytes = BytesIO(response.content)
        doc = fitz.open(stream=pdf_bytes, filetype="pdf")

        # Add text to the first page
        page = doc[0]
        page.insert_text((350, 600), text, fontsize=12, color=colors.get(status))  # Red text

        # Save modified PDF to a buffer
        output_pdf = BytesIO()
        doc.save(output_pdf)
        output_pdf.seek(0)

        return {"pdf":output_pdf,"status":200,"message":"PDF signed successfully"}
    
    except Exception as e:
       return {"error": str(e),"status":500, "message":"Internal server error"}
