import re
from typing import List, Dict, Any, Set
from services.taxonomy import SKILL_TAXONOMY, normalize_skill

def extract_skills_from_text(text: str) -> Dict[str, Any]:
    if not text:
        return {"all_skills": [], "categories": {}, "total_count": 0}

    text_lower = text.lower()
    found_skills_set: Set[str] = set()
    categorized_skills: Dict[str, List[str]] = {cat: [] for cat in SKILL_TAXONOMY.keys()}

    for category, skills in SKILL_TAXONOMY.items():
        for skill in skills:
            escaped_skill = re.escape(skill.lower())
            if any(ch in skill for ch in ["+", "#", "."]):
                pattern = rf'(?:^|[\s,;/()\[\]]){escaped_skill}(?:$|[\s,;/()\[\]])'
            else:
                pattern = rf'\b{escaped_skill}\b'

            if re.search(pattern, text_lower):
                canonical = normalize_skill(skill)
                if canonical not in found_skills_set:
                    found_skills_set.add(canonical)
                    categorized_skills[category].append(canonical)

    active_categories = {k: v for k, v in categorized_skills.items() if v}
    all_skills_sorted = sorted(list(found_skills_set))

    return {
        "all_skills": all_skills_sorted,
        "categories": active_categories,
        "total_count": len(all_skills_sorted)
    }


def split_into_sentences(text: str) -> List[str]:
    raw_lines = re.split(r'[\r\n•\-\*•]+', text)
    sentences = []
    for line in raw_lines:
        line = line.strip()
        if not line:
            continue
        sub_sentences = re.split(r'\.\s+', line)
        for s in sub_sentences:
            s_clean = s.strip()
            if len(s_clean) > 8:
                sentences.append(s_clean)
    return sentences


def generate_personalized_recommendations(
    overall_score: float,
    matched_skills: List[str],
    missing_skills: List[str],
    bonus_skills: List[str],
    resume_text: str,
    job_description: str
) -> List[Dict[str, str]]:
    recs = []

    if missing_skills:
        top_missing = ", ".join(missing_skills[:5])
        recs.append({
            "category": "Skill Gap Closure",
            "priority": "High",
            "title": f"Integrate Missing Technologies: {top_missing}",
            "description": f"The job description explicitly prioritizes {top_missing}. Incorporate them into your Skills and Experience sections to pass automated screening."
        })

    has_metrics = bool(re.search(r'\b(?:\d+[%kKmM\$]|\$\d+|\d+\+)\b', resume_text))
    if not has_metrics:
        recs.append({
            "category": "Experience Impact",
            "priority": "High",
            "title": "Quantify Achievements with Metrics & KPIs",
            "description": "Recruiters and ATS look for measurable business impact. Revise bullet points using Google's X-Y-Z formula: 'Accomplished [X], as measured by [Y], by doing [Z]'."
        })
    else:
        recs.append({
            "category": "Experience Impact",
            "priority": "Medium",
            "title": "Strengthen Action Verbs in Bullet Points",
            "description": "Ensure every bullet starts with an active verb (e.g. 'Architected', 'Spearheaded', 'Engineered') rather than passive phrasing."
        })

    recs.append({
        "category": "Profile Alignment",
        "priority": "Medium",
        "title": "Tailor Your Summary Statement to Target Role",
        "description": "Open your resume with a 3-sentence summary stating your exact role title, years of experience, and 2-3 core skills mirroring the target position."
    })

    if bonus_skills:
        sample_bonus = ", ".join(bonus_skills[:3])
        recs.append({
            "category": "Competitive Advantage",
            "priority": "Low",
            "title": f"Highlight Unique Differentiators ({sample_bonus})",
            "description": f"You possess valuable skills not explicitly mandated in the JD ({sample_bonus}). Frame these as value-add advantages."
        })

    if overall_score < 75:
        recs.append({
            "category": "ATS Optimization",
            "priority": "High",
            "title": "Boost Keyword Density and Standard Headings",
            "description": "Use standard section titles ('Work Experience', 'Skills', 'Education', 'Projects') so applicant tracking systems index your profile with 100% accuracy."
        })

    return recs


def parse_resume_text(text: str) -> Dict[str, Any]:
    email_match = re.search(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+', text)
    email = email_match.group(0) if email_match else ""

    phone_match = re.search(r'(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}', text)
    phone = phone_match.group(0) if phone_match else ""

    linkedin_match = re.search(r'linkedin\.com/in/[a-zA-Z0-9_-]+', text, re.IGNORECASE)
    github_match = re.search(r'github\.com/[a-zA-Z0-9_-]+', text, re.IGNORECASE)

    lines = [l.strip() for l in text.split('\n') if l.strip()]
    guessed_name = lines[0] if lines and len(lines[0]) < 40 and not '@' in lines[0] else ""

    skills_data = extract_skills_from_text(text)

    sections_found = {
        "experience": bool(re.search(r'\b(experience|employment|work history|career)\b', text, re.I)),
        "education": bool(re.search(r'\b(education|university|college|degree|bachelor|master)\b', text, re.I)),
        "skills": bool(re.search(r'\b(skills|technical skills|technologies|proficiencies)\b', text, re.I)),
        "projects": bool(re.search(r'\b(projects|personal projects|portfolio)\b', text, re.I)),
        "summary": bool(re.search(r'\b(summary|objective|about me|profile)\b', text, re.I)),
    }

    score = 40
    if email: score += 10
    if phone: score += 10
    if sections_found["experience"]: score += 15
    if sections_found["education"]: score += 10
    if sections_found["skills"]: score += 10
    if len(skills_data["all_skills"]) >= 5: score += 5
    score = min(100, score)

    return {
        "guessed_name": guessed_name,
        "email": email,
        "phone": phone,
        "linkedin": linkedin_match.group(0) if linkedin_match else "",
        "github": github_match.group(0) if github_match else "",
        "sections_detected": sections_found,
        "skills": skills_data["all_skills"],
        "skill_categories": skills_data["categories"],
        "total_skills_detected": skills_data["total_count"],
        "ats_readiness_score": score,
        "raw_text_length": len(text)
    }
