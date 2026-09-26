import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from routes.resume_router import router as resume_router
from routes.match_router import router as match_router
from routes.pdf_router import router as pdf_router
from routes.db_router import router as db_router
from db_config import engine

load_dotenv()

app = FastAPI(
    title="AI Resume Intelligence Platform API",
    description="FastAPI & PostgreSQL backend for creating professional resumes, analyzing resumes with spaCy NLP, semantic job matching with Sentence Transformers, and PDF generation.",
    version="2.1.0"
)

origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(resume_router)
app.include_router(match_router)
app.include_router(pdf_router)
app.include_router(db_router)

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "AI Resume Intelligence Platform Backend",
        "version": "2.1.0",
        "stack": ["FastAPI", "React", "PostgreSQL", "spaCy", "Sentence Transformers", "Docker", "ReportLab", "PyPDF"],
        "endpoints": [
            "/api/health",
            "/api/resume/generate-bullet",
            "/api/resume/generate-summary",
            "/api/resume/analyze-text",
            "/api/resume/analyze-file",
            "/api/match/analyze-job",
            "/api/pdf/generate",
            "/api/db/resumes",
            "/api/db/matches"
        ]
    }

@app.get("/api/health")
def health_check():
    gemini_configured = bool(os.getenv("GEMINI_API_KEY"))
    db_status = "connected" if engine is not None else "disconnected"
    return {
        "status": "healthy",
        "database": db_status,
        "gemini_configured": gemini_configured,
        "nlp_engine": "spaCy",
        "semantic_engine": "Sentence Transformers & Cosine Similarity",
        "pdf_engine": "ReportLab & PyPDF",
        "docker_ready": True
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    print(f"Starting AI Resume Intelligence Platform on http://127.0.0.1:{port}...")
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
