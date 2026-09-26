// API client for AI Resume Intelligence Platform (FastAPI & PostgreSQL Backend)

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function checkBackendHealth() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/health`);
        if (!response.ok) return { online: false };
        const data = await response.json();
        return { online: true, ...data };
    } catch {
        return { online: false };
    }
}

export async function generateBulletPoints(role, company = '', description = '') {
    const response = await fetch(`${API_BASE_URL}/api/resume/generate-bullet`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, company, description })
    });
    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.detail || 'Failed to generate bullet points');
    }
    return response.json();
}

export async function generateSummary(title, skills = [], yearsExp = '3+') {
    const response = await fetch(`${API_BASE_URL}/api/resume/generate-summary`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, skills, years_exp: yearsExp })
    });
    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.detail || 'Failed to generate summary');
    }
    return response.json();
}

export async function analyzeResumeFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`${API_BASE_URL}/api/resume/analyze-file`, {
        method: 'POST',
        body: formData
    });
    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.detail || 'Failed to analyze resume file');
    }
    return response.json();
}

export async function analyzeResumeText(text) {
    const response = await fetch(`${API_BASE_URL}/api/resume/analyze-text`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
    });
    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.detail || 'Failed to analyze resume text');
    }
    return response.json();
}

export async function analyzeJobMatch(arg1, arg2, arg3 = '', arg4 = '') {
    let resumeText = '';
    let jobDescription = '';
    let jobTitle = '';
    let company = '';

    if (typeof arg1 === 'object' && arg1 !== null) {
        resumeText = arg1.resumeText || arg1.resume_text || '';
        jobDescription = arg1.jobDescription || arg1.job_description || '';
        jobTitle = arg1.jobTitle || arg1.job_title || '';
        company = arg1.company || '';
    } else {
        resumeText = arg1 || '';
        jobDescription = arg2 || '';
        jobTitle = arg3 || '';
        company = arg4 || '';
    }

    const response = await fetch(`${API_BASE_URL}/api/match/analyze-job`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            resume_text: resumeText,
            job_description: jobDescription,
            job_title: jobTitle,
            company: company
        })
    });
    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.detail || 'Failed to evaluate job match');
    }
    return response.json();
}

export const matchJobDescription = analyzeJobMatch;


export async function downloadResumePdf(resumeData) {
    const response = await fetch(`${API_BASE_URL}/api/pdf/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resumeData)
    });
    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.detail || 'Failed to generate PDF');
    }
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    const personal = resumeData.personalInfo || {};
    const first = personal.firstName || 'Resume';
    const last = personal.lastName || '';
    a.download = last ? `${first}_${last}_Resume.pdf` : `${first}_Resume.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(downloadUrl);
}

export async function fetchResumesFromDb() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/db/resumes`);
        if (!response.ok) return [];
        return response.json();
    } catch {
        return [];
    }
}

export async function saveResumeToDb(resumeData) {
    const response = await fetch(`${API_BASE_URL}/api/db/resumes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resumeData)
    });
    if (!response.ok) {
        throw new Error('Failed to persist resume to database');
    }
    return response.json();
}

export async function deleteResumeFromDb(resumeId) {
    const response = await fetch(`${API_BASE_URL}/api/db/resumes/${resumeId}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete resume');
    }
    return response.json();
}
