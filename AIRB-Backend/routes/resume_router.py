import io
from typing import Dict, Any, List, Optional
from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel

from services.gemini_service import generate_experience_bullets, generate_resume_summary
from services.spacy_service import extract_skills_spacy
from services.nlp_service import parse_resume_text

try:
    import pypdf
    HAS_PYPDF = True
except ImportError:
    HAS_PYPDF = False

router = APIRouter(prefix="/api/resume", tags=["Resume Intelligence"])

class BulletRequest(BaseModel):
    role: str
    company: Optional[str] = ""
    description: Optional[str] = ""

class SummaryRequest(BaseModel):
    title: str
    skills: Optional[List[str]] = []
    years_exp: Optional[str] = "3+"

class TextAnalysisRequest(BaseModel):
    text: str

@router.post("/generate-bullet")
def api_generate_bullet(req: BulletRequest):
    bullets = generate_experience_bullets(
        role=req.role,
        company=req.company or "",
        description=req.description or ""
    )
    return {"bullets": bullets}

@router.post("/generate-summary")
def api_generate_summary(req: SummaryRequest):
    summary = generate_resume_summary(
        title=req.title,
        top_skills=req.skills or [],
        years_exp=req.years_exp or "3+"
    )
    return {"summary": summary}

@router.post("/analyze-text")
def api_analyze_text(req: TextAnalysisRequest):
    if not req.text or not req.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    
    analysis = parse_resume_text(req.text)
    spacy_res = extract_skills_spacy(req.text)
    if spacy_res.get("all_skills"):
        analysis["skills"] = spacy_res["all_skills"]
        analysis["skill_categories"] = spacy_res["categories"]
        analysis["total_skills_detected"] = spacy_res["total_count"]
        analysis["engine"] = spacy_res.get("engine", "spaCy NLP Engine")
        
    analysis["text"] = req.text
    return analysis

@router.post("/analyze-file")
async def api_analyze_file(file: UploadFile = File(...)):
    filename = file.filename or ""
    contents = await file.read()

    extracted_text = ""
    if filename.lower().endswith(".pdf"):
        if not HAS_PYPDF:
            raise HTTPException(status_code=500, detail="PyPDF is not installed on server.")
        try:
            pdf_reader = pypdf.PdfReader(io.BytesIO(contents))
            pages_text = []
            for page in pdf_reader.pages:
                text = page.extract_text()
                if text:
                    pages_text.append(text)
            extracted_text = "\n\n".join(pages_text)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Failed to extract PDF text: {str(e)}")
    else:
        try:
            extracted_text = contents.decode("utf-8", errors="ignore")
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Failed to read file text: {str(e)}")

    if not extracted_text.strip():
        raise HTTPException(status_code=400, detail="No readable text found in uploaded document.")

    analysis = parse_resume_text(extracted_text)
    spacy_res = extract_skills_spacy(extracted_text)
    if spacy_res.get("all_skills"):
        analysis["skills"] = spacy_res["all_skills"]
        analysis["skill_categories"] = spacy_res["categories"]
        analysis["total_skills_detected"] = spacy_res["total_count"]
        analysis["engine"] = spacy_res.get("engine", "spaCy NLP Engine")

    analysis["filename"] = filename
    analysis["text"] = extracted_text
    return analysis
