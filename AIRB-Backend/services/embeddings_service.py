import re
from typing import Dict, Any, List, Optional
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer

from services.spacy_service import extract_skills_spacy
from services.nlp_service import split_into_sentences, generate_personalized_recommendations

try:
    from sentence_transformers import SentenceTransformer
    HAS_SENTENCE_TRANSFORMERS = True
except ImportError:
    HAS_SENTENCE_TRANSFORMERS = False

_st_model = None

def get_sentence_transformer():
    global _st_model
    if not HAS_SENTENCE_TRANSFORMERS:
        return None

    if _st_model is None:
        try:
            _st_model = SentenceTransformer('all-MiniLM-L6-v2')
        except Exception as e:
            print(f"Warning: Could not load SentenceTransformer: {e}")
            _st_model = None

    return _st_model


def compute_semantic_matching_pipeline(
    resume_text: str,
    job_description: str,
    job_title: str = "",
    company: str = ""
) -> Dict[str, Any]:
    resume_skills_data = extract_skills_spacy(resume_text)
    jd_skills_data = extract_skills_spacy(job_description)

    resume_skills_set = set(resume_skills_data["all_skills"])
    jd_skills_set = set(jd_skills_data["all_skills"])

    matched_skills = sorted(list(resume_skills_set.intersection(jd_skills_set)))
    missing_skills = sorted(list(jd_skills_set - resume_skills_set))
    bonus_skills = sorted(list(resume_skills_set - jd_skills_set))

    if len(jd_skills_set) > 0:
        skill_coverage_pct = round((len(matched_skills) / len(jd_skills_set)) * 100, 1)
    else:
        skill_coverage_pct = 75.0

    resume_sentences = split_into_sentences(resume_text)
    jd_sentences = split_into_sentences(job_description)

    model = get_sentence_transformer()
    semantic_sim_score = 0.0
    embedding_engine = "TF-IDF N-Gram Vectorizer"

    if model and resume_sentences and jd_sentences:
        try:
            resume_embeddings = model.encode(resume_sentences, convert_to_numpy=True)
            jd_embeddings = model.encode(jd_sentences, convert_to_numpy=True)

            similarity_matrix = cosine_similarity(resume_embeddings, jd_embeddings)
            max_sim_per_requirement = np.max(similarity_matrix, axis=0)
            avg_requirement_alignment = float(np.mean(max_sim_per_requirement))

            scaled_score = min(100.0, max(20.0, round(avg_requirement_alignment * 115.0, 1)))
            semantic_sim_score = scaled_score
            embedding_engine = "SentenceTransformer (all-MiniLM-L6-v2)"
        except Exception as err:
            print(f"SentenceTransformer fallback: {err}")
            model = None

    if not model or semantic_sim_score == 0.0:
        if resume_text.strip() and job_description.strip():
            try:
                vectorizer = TfidfVectorizer(
                    stop_words='english',
                    ngram_range=(1, 3),
                    max_features=3000
                )
                tfidf_matrix = vectorizer.fit_transform([resume_text, job_description])
                cos_sim = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
                semantic_sim_score = min(100.0, max(15.0, round(float(cos_sim) * 165.0, 1)))
            except Exception as e:
                print(f"Vectorization error: {e}")
                semantic_sim_score = 65.0
        else:
            semantic_sim_score = 50.0

    overall_score = round(0.50 * skill_coverage_pct + 0.50 * semantic_sim_score, 1)
    overall_score = min(99.0, max(12.0, overall_score))

    recommendations = generate_personalized_recommendations(
        overall_score=overall_score,
        matched_skills=matched_skills,
        missing_skills=missing_skills,
        bonus_skills=bonus_skills,
        resume_text=resume_text,
        job_description=job_description
    )

    return {
        "overall_match_score": overall_score,
        "skills_match_score": skill_coverage_pct,
        "semantic_similarity_score": semantic_sim_score,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "bonus_skills": bonus_skills[:12],
        "total_jd_skills": len(jd_skills_set),
        "total_matched_skills": len(matched_skills),
        "total_missing_skills": len(missing_skills),
        "embedding_engine": embedding_engine,
        "nlp_engine": resume_skills_data.get("engine", "spaCy NLP Engine"),
        "recommendations": recommendations,
        "job_title": job_title,
        "company": company
    }
