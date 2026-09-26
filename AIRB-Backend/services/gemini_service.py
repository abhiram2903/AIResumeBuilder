import os
import json
import re
from typing import List, Optional
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

def get_genai_client():
    if not GEMINI_API_KEY:
        return None
    try:
        from google import genai
        return genai.Client(api_key=GEMINI_API_KEY)
    except Exception as e:
        print(f"Warning: Failed to initialize Google GenAI Client: {e}")
        return None


def generate_experience_bullets(role: str, company: str = "", description: str = "") -> List[str]:
    client = get_genai_client()
    
    if client:
        try:
            prompt = f"""
Act as a world-class executive resume writer and career coach.
Generate 3 to 4 professional, ATS-optimized, high-impact resume bullet points for the following work experience:

Job Role: {role}
Company: {company or 'Technology Company'}
Context / Key Responsibilities: {description or 'Led key initiatives, developed features, and delivered measurable business outcomes'}

Rules:
1. Start each bullet point with a strong, active past-tense verb (e.g., 'Architected', 'Spearheaded', 'Optimized', 'Engineered', 'Streamlined').
2. Incorporate realistic metrics and business impact (e.g. percentages, latency reductions, team sizes, revenue, or efficiency improvements).
3. Follow the Google X-Y-Z formula: Accomplished [X], as measured by [Y], by doing [Z].
4. Return ONLY a valid JSON array of strings, without any extra text or markdown formatting.
Example: ["Architected...", "Spearheaded...", "Optimized..."]
"""
            try:
                interaction = client.interactions.create(
                    model="gemini-3.8-flash",
                    input=prompt
                )
                raw_text = interaction.output_text or ""
            except Exception:
                response = client.models.generate_content(
                    model="gemini-3.8-flash",
                    contents=prompt
                )
                raw_text = response.text or ""

            cleaned = re.sub(r'```(?:json)?', '', raw_text).replace('```', '').strip()
            bullets = json.loads(cleaned)
            if isinstance(bullets, list) and len(bullets) > 0:
                return [str(b).strip() for b in bullets]
        except Exception as err:
            print(f"Gemini generation fallback: {err}")

    company_name = company or "the organization"
    return [
        f"Spearheaded core software development initiatives for {role} at {company_name}, increasing operational workflow velocity by 28%.",
        f"Architected modular and scalable solutions adhering to modern engineering standards, driving a 35% reduction in recurring defects.",
        f"Partnered cross-functionally with product managers and engineers to deliver critical customer-facing milestones 2 weeks ahead of schedule.",
        f"Refactored legacy codebases and integrated automated CI/CD pipelines, optimizing application throughput and deployment reliability."
    ]


def generate_resume_summary(title: str, top_skills: List[str] = None, years_exp: str = "3+") -> str:
    client = get_genai_client()
    skills_str = ", ".join(top_skills) if top_skills else "Full Stack Engineering, Cloud Architecture, Agile Delivery"

    if client:
        try:
            prompt = f"""
Write a compelling, professional 3-sentence resume summary for a {title} with {years_exp} years of experience.
Key skills to highlight: {skills_str}.
Tone: Confident, results-driven, modern.
Return ONLY the summary paragraph without quotes or commentary.
"""
            try:
                interaction = client.interactions.create(
                    model="gemini-3.8-flash",
                    input=prompt
                )
                summary = (interaction.output_text or "").strip()
            except Exception:
                res = client.models.generate_content(
                    model="gemini-3.8-flash",
                    contents=prompt
                )
                summary = (res.text or "").strip()

            if summary:
                return summary.replace('"', '').strip()
        except Exception as e:
            print(f"Summary generation fallback: {e}")

    return f"Results-driven {title} with {years_exp} years of proven expertise in {skills_str}. Adept at architecting scalable applications, collaborating in cross-functional Agile environments, and translating complex business requirements into high-performance digital solutions."

generate_executive_summary = generate_resume_summary
