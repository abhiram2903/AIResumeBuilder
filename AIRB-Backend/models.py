from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, JSON, Text
from db_config import Base

class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), default="Untitled Resume")
    personal_info = Column(JSON, default=dict)
    skills = Column(JSON, default=list)
    experience = Column(JSON, default=list)
    education = Column(JSON, default=list)
    projects = Column(JSON, default=list)
    ats_score = Column(Float, default=85.0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class JobMatch(Base):
    __tablename__ = "job_matches"

    id = Column(Integer, primary_key=True, index=True)
    job_title = Column(String(255), default="")
    company = Column(String(255), default="")
    job_description = Column(Text, default="")
    overall_match_score = Column(Float, default=0.0)
    skills_match_score = Column(Float, default=0.0)
    semantic_similarity_score = Column(Float, default=0.0)
    matched_skills = Column(JSON, default=list)
    missing_skills = Column(JSON, default=list)
    bonus_skills = Column(JSON, default=list)
    recommendations = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.utcnow)
