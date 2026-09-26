import re
from typing import Dict, Any, List, Set

try:
    import spacy
    from spacy.matcher import PhraseMatcher
    HAS_SPACY = True
except ImportError:
    HAS_SPACY = False

from services.taxonomy import SKILL_TAXONOMY, normalize_skill

_spacy_nlp = None
_phrase_matcher = None

def get_spacy_pipeline():
    global _spacy_nlp, _phrase_matcher
    if not HAS_SPACY:
        return None, None

    if _spacy_nlp is None:
        try:
            try:
                _spacy_nlp = spacy.load("en_core_web_sm")
            except Exception:
                _spacy_nlp = spacy.blank("en")

            matcher = PhraseMatcher(_spacy_nlp.vocab, attr="LOWER")

            for category, skills in SKILL_TAXONOMY.items():
                patterns = [_spacy_nlp.make_doc(skill) for skill in skills]
                matcher.add(category, patterns)

            _phrase_matcher = matcher
        except Exception as e:
            print(f"Warning: Could not initialize spaCy phrase matcher: {e}")
            _spacy_nlp = None
            _phrase_matcher = None

    return _spacy_nlp, _phrase_matcher


def extract_skills_spacy(text: str) -> Dict[str, Any]:
    if not text or not text.strip():
        return {"all_skills": [], "categories": {}, "total_count": 0}

    nlp, matcher = get_spacy_pipeline()

    if nlp and matcher:
        doc = nlp(text)
        matches = matcher(doc)

        found_skills: Set[str] = set()
        categorized_skills: Dict[str, List[str]] = {cat: [] for cat in SKILL_TAXONOMY.keys()}

        for match_id, start, end in matches:
            span = doc[start:end]
            category = nlp.vocab.strings[match_id]
            skill_text = span.text.strip()
            canonical = normalize_skill(skill_text)

            if canonical not in found_skills:
                found_skills.add(canonical)
                if category in categorized_skills:
                    categorized_skills[category].append(canonical)
                else:
                    categorized_skills["Technical Skills"] = categorized_skills.get("Technical Skills", []) + [canonical]

        if nlp.has_pipe("parser"):
            try:
                for chunk in doc.noun_chunks:
                    chunk_clean = chunk.text.strip()
                    canonical = normalize_skill(chunk_clean)
                    for cat, skills in SKILL_TAXONOMY.items():
                        if any(s.lower() == chunk_clean.lower() for s in skills) and canonical not in found_skills:
                            found_skills.add(canonical)
                            categorized_skills[cat].append(canonical)
            except Exception:
                pass

        active_categories = {k: v for k, v in categorized_skills.items() if v}
        all_skills_sorted = sorted(list(found_skills))

        return {
            "all_skills": all_skills_sorted,
            "categories": active_categories,
            "total_count": len(all_skills_sorted),
            "engine": "spaCy NLP Engine"
        }

    from services.nlp_service import extract_skills_from_text
    result = extract_skills_from_text(text)
    result["engine"] = "Regex & Taxonomy NLP"
    return result
