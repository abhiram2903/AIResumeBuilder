import re
from typing import Dict, List

SKILL_TAXONOMY: Dict[str, List[str]] = {
    "Programming Languages": [
        "Python", "JavaScript", "TypeScript", "Java", "C++", "C#", "C", "Go", "Golang",
        "Rust", "Ruby", "PHP", "Swift", "Kotlin", "Scala", "R", "Dart", "Shell", "Bash", "SQL"
    ],
    "Frameworks & Libraries": [
        "React", "React.js", "Next.js", "Vue", "Vue.js", "Angular", "Node.js", "Express",
        "Express.js", "FastAPI", "Django", "Flask", "Spring Boot", "ASP.NET", ".NET",
        "Tailwind CSS", "Redux", "GraphQL", "REST API", "gRPC"
    ],
    "Cloud & DevOps": [
        "AWS", "Amazon Web Services", "Azure", "Google Cloud", "GCP", "Docker", "Kubernetes",
        "Terraform", "CI/CD", "GitLab CI", "GitHub Actions", "Jenkins", "Ansible", "Linux",
        "Nginx", "Microservices", "Serverless"
    ],
    "Databases & Caching": [
        "PostgreSQL", "Postgres", "MySQL", "MongoDB", "Redis", "SQLite", "Cassandra",
        "Elasticsearch", "DynamoDB", "Prisma", "SQLAlchemy"
    ],
    "AI & Machine Learning": [
        "Machine Learning", "Deep Learning", "NLP", "Natural Language Processing",
        "Computer Vision", "PyTorch", "TensorFlow", "Keras", "scikit-learn", "spaCy",
        "Hugging Face", "Transformers", "Sentence Transformers", "LLMs", "LangChain",
        "OpenAI", "Gemini", "Pandas", "NumPy"
    ],
    "Soft Skills & Methodologies": [
        "Agile", "Scrum", "Kanban", "System Design", "Leadership", "Team Collaboration",
        "Problem Solving", "Code Review", "Mentorship", "TDD"
    ]
}

CANONICAL_MAP = {
    "react.js": "React",
    "reactjs": "React",
    "vue.js": "Vue",
    "vuejs": "Vue",
    "angularjs": "Angular",
    "node": "Node.js",
    "nodejs": "Node.js",
    "golang": "Go",
    "postgres": "PostgreSQL",
    "scikit learn": "scikit-learn",
    "sklearn": "scikit-learn",
    "amazon web services": "AWS",
    "google cloud platform": "GCP",
    "natural language processing": "NLP",
    "llm": "LLMs"
}

def normalize_skill(name: str) -> str:
    cleaned = name.strip()
    return CANONICAL_MAP.get(cleaned.lower(), cleaned)
