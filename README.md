# AI Resume Intelligence Platform

An end-to-end AI-powered platform for creating professional resumes, analyzing existing profiles, and matching candidates with job descriptions.

Built with **React.js (Vite + Tailwind CSS)**, **FastAPI**, **PostgreSQL**, and containerized using **Docker & Docker Compose**. Features NLP-based skill extraction via **spaCy**, semantic candidate–job alignment and skill gap isolation using **Sentence Transformers**, and automated ATS-compliant PDF generation via **ReportLab**.

---

## Key Features

1. **AI Resume Builder & Editor**
   * Real-time preview with support for **Classic** (traditional ATS) and **Modern** templates.
   * Action verb enhancement and Google X-Y-Z formula bullet point generation via Gemini.
   * Direct database persistence to PostgreSQL with SQLite fallback for offline local mode.
   * Streaming ATS-compliant PDF downloads generated server-side using ReportLab.

2. **spaCy Resume Analyzer**
   * Extract text from uploaded PDF or plain text resumes using PyPDF.
   * Tokenization, phrase matching, and taxonomy classification using **spaCy**.
   * Automatic calculation of ATS Readiness Scores across detected sections and competency categories.
   * One-click import into the editor workspace.

3. **Semantic Job Matcher**
   * Sentence-level dense vector embeddings using **Sentence Transformers (`all-MiniLM-L6-v2`)**.
   * Cosine similarity scoring matrix evaluating candidate-to-requirement alignment.
   * Skill gap isolation: Matched Skills, Missing Mandates, and Differentiator Bonus Skills.
   * Prioritized, actionable resume improvement recommendations.

4. **Intelligence Workspace & Dashboard**
   * Centralized dashboard tracking saved profiles, average ATS scores, and target roles.
   * Fast actions to edit, delete, or download PDF resumes directly from the database.

---

## Architecture & Tech Stack

```
AIResumeBuilder/
├── AIRB-Backend/                  # FastAPI REST API (Python 3.11+)
│   ├── routes/                    # Clean REST API endpoints
│   │   ├── resume_router.py       # PDF parsing, spaCy skill extraction, Gemini AI
│   │   ├── match_router.py        # Sentence Transformers & cosine similarity matching
│   │   ├── pdf_router.py          # ReportLab ATS PDF generation and streaming
│   │   └── db_router.py           # PostgreSQL CRUD for resumes & job matches
│   ├── services/                  # Business logic & AI pipelines
│   │   ├── spacy_service.py       # spaCy PhraseMatcher NLP engine
│   │   ├── embeddings_service.py  # SentenceTransformer ('all-MiniLM-L6-v2') matching
│   │   ├── pdf_service.py         # ReportLab ATS styling engine
│   │   ├── nlp_service.py         # ATS readiness scoring & recommendation engine
│   │   ├── taxonomy.py            # Normalized skills taxonomy & canonical mapping
│   │   └── gemini_service.py      # Gemini Flash integration & bullet generator
│   ├── db_config.py               # PostgreSQL engine with SQLite fallback
│   ├── models.py                  # SQLAlchemy ORM models (Resume, JobMatch)
│   ├── requirements.txt           # Python dependencies
│   ├── Dockerfile                 # Backend container definition
│   └── main.py                    # FastAPI entrypoint & CORS middleware
│
├── AIRB-Frontend/                 # React SPA (Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/            # UI components (resume sections, preview, landing)
│   │   ├── hooks/                 # Zustand global store (useResume.js)
│   │   ├── pages/                 # Full feature views (Dashboard, Analyzer, Matcher, Editor)
│   │   ├── services/              # API client for backend communication (api.js)
│   │   └── routes/                # Client-side routing (AppRoutes.jsx)
│   ├── Dockerfile                 # Multi-stage production container with Nginx
│   └── nginx.conf                 # Nginx reverse proxy config
│
├── docker-compose.yml             # Orchestration for PostgreSQL, Backend, and Frontend
├── run_backend.bat                # 1-click Windows backend runner
└── run_frontend.bat               # 1-click Windows frontend runner
```

---

## Quick Start

### Option 1: Local Development

1. **Start the Backend**:
   * Double-click `run_backend.bat` or run:
     ```bash
     cd AIRB-Backend
     python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
     ```
   * *Swagger API Docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)*

2. **Start the Frontend**:
   * Double-click `run_frontend.bat` or run:
     ```bash
     cd AIRB-Frontend
     npm run dev
     ```
   * *Web Application: [http://localhost:5173](http://localhost:5173)*

### Option 2: Docker Compose (Full Stack with PostgreSQL)

```bash
docker-compose up --build
```

* **Frontend Web App**: [http://localhost:3000](http://localhost:3000)
* **FastAPI Backend**: [http://localhost:8000](http://localhost:8000)
* **PostgreSQL Database**: `localhost:5432`

---

## Verification & Health Check

* **Health Endpoint**: `GET /api/health`
  ```json
  {
    "status": "healthy",
    "database": "connected",
    "gemini_configured": true,
    "nlp_engine": "spaCy",
    "semantic_engine": "Sentence Transformers & Cosine Similarity",
    "pdf_engine": "ReportLab & PyPDF",
    "docker_ready": true
  }
  ```
