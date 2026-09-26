from typing import Dict, Any, Optional
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from services.embeddings_service import compute_semantic_matching_pipeline

router = APIRouter(prefix="/api/match", tags=["Semantic Job Matcher"])

class JobMatchRequest(BaseModel):
    resume_text: str
    job_description: str
    job_title: Optional[str] = ""
    company: Optional[str] = ""

@router.post("/analyze-job")
def api_analyze_job_match(req: JobMatchRequest):
    if not req.resume_text or not req.resume_text.strip():
        raise HTTPException(status_code=400, detail="Resume text is required for matching.")
    if not req.job_description or not req.job_description.strip():
        raise HTTPException(status_code=400, detail="Job description is required for matching.")

    result = compute_semantic_matching_pipeline(
        resume_text=req.resume_text,
        job_description=req.job_description,
        job_title=req.job_title or "",
        company=req.company or ""
    )
    return result
