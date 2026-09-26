from typing import Dict, Any
from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse

from services.pdf_service import generate_pdf_resume

router = APIRouter(prefix="/api/pdf", tags=["PDF Generation"])

@router.post("/generate")
def api_generate_pdf(resume_data: Dict[str, Any]):
    if not resume_data:
        raise HTTPException(status_code=400, detail="Resume data cannot be empty.")

    try:
        pdf_stream = generate_pdf_resume(resume_data)
        
        personal = resume_data.get("personalInfo", {})
        first_name = personal.get("firstName", "Resume")
        last_name = personal.get("lastName", "")
        filename = f"{first_name}_{last_name}_Resume.pdf" if last_name else f"{first_name}_Resume.pdf"

        return StreamingResponse(
            pdf_stream,
            media_type="application/pdf",
            headers={
                "Content-Disposition": f'attachment; filename="{filename}"',
                "Access-Control-Expose-Headers": "Content-Disposition"
            }
        )
    except Exception as e:
        print(f"PDF generation error: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to generate PDF resume: {str(e)}")
