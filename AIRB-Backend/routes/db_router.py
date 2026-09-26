from typing import List, Dict, Any, Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db_config import get_db, Base, engine
import models

try:
    Base.metadata.create_all(bind=engine)
except Exception as e:
    print(f"Warning: Table creation issue: {e}")

router = APIRouter(prefix="/api/db", tags=["PostgreSQL Persistence"])

@router.get("/resumes")
def get_all_resumes(db: Session = Depends(get_db)):
    resumes = db.query(models.Resume).order_by(models.Resume.updated_at.desc()).all()
    return [
        {
            "id": r.id,
            "title": r.title,
            "personalInfo": r.personal_info,
            "skills": r.skills,
            "experience": r.experience,
            "education": r.education,
            "projects": r.projects,
            "ats_score": r.ats_score,
            "updated_at": r.updated_at.isoformat() if r.updated_at else None
        }
        for r in resumes
    ]

@router.post("/resumes")
def save_resume(data: Dict[str, Any], db: Session = Depends(get_db)):
    resume_id = data.get("id")
    personal = data.get("personalInfo", {})
    first = personal.get("firstName", "")
    last = personal.get("lastName", "")
    job_title = personal.get("jobTitle") or personal.get("title") or ""
    title = f"{first} {last} - {job_title}".strip() or data.get("title", "Untitled Resume")

    if resume_id and isinstance(resume_id, int):
        existing = db.query(models.Resume).filter(models.Resume.id == resume_id).first()
        if existing:
            existing.title = title
            existing.personal_info = personal
            existing.skills = data.get("skills", [])
            existing.experience = data.get("experience", [])
            existing.education = data.get("education", [])
            existing.projects = data.get("projects", [])
            existing.ats_score = data.get("ats_score", existing.ats_score)
            db.commit()
            db.refresh(existing)
            return {"status": "updated", "id": existing.id}

    new_resume = models.Resume(
        title=title,
        personal_info=personal,
        skills=data.get("skills", []),
        experience=data.get("experience", []),
        education=data.get("education", []),
        projects=data.get("projects", []),
        ats_score=data.get("ats_score", 85.0)
    )
    db.add(new_resume)
    db.commit()
    db.refresh(new_resume)
    return {"status": "created", "id": new_resume.id}

@router.delete("/resumes/{resume_id}")
def delete_resume(resume_id: int, db: Session = Depends(get_db)):
    resume = db.query(models.Resume).filter(models.Resume.id == resume_id).first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    db.delete(resume)
    db.commit()
    return {"status": "deleted", "id": resume_id}

@router.post("/matches")
def save_match_result(data: Dict[str, Any], db: Session = Depends(get_db)):
    match_entry = models.JobMatch(
        job_title=data.get("job_title", ""),
        company=data.get("company", ""),
        job_description=data.get("job_description", ""),
        overall_match_score=data.get("overall_match_score", 0.0),
        skills_match_score=data.get("skills_match_score", 0.0),
        semantic_similarity_score=data.get("semantic_similarity_score", 0.0),
        matched_skills=data.get("matched_skills", []),
        missing_skills=data.get("missing_skills", []),
        bonus_skills=data.get("bonus_skills", []),
        recommendations=data.get("recommendations", [])
    )
    db.add(match_entry)
    db.commit()
    db.refresh(match_entry)
    return {"status": "saved", "id": match_entry.id}
