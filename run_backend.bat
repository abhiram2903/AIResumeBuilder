@echo off
title AI Resume Intelligence Platform - FastAPI Backend
echo ========================================================
echo Starting AI Resume Intelligence Platform - FastAPI Backend
echo NLP Engine: spaCy
echo Semantic Engine: Sentence Transformers (all-MiniLM-L6-v2)
echo API Documentation: http://127.0.0.1:8000/docs
echo ========================================================
cd /d "%~dp0AIRB-Backend"
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
pause
