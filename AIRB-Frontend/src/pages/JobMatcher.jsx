import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import useResume from '../hooks/useResume';
import { matchJobDescription } from '../services/api';
import {
    Target, Sparkles, CheckCircle2, AlertTriangle,
    Loader2, ArrowLeft, RefreshCw, FileText
} from 'lucide-react';

const SAMPLE_JOB_DESCRIPTIONS = {
    fullstack: {
        title: "Senior Full Stack Engineer",
        company: "Stripe",
        text: `We are looking for a Senior Full Stack Engineer with extensive experience in React, TypeScript, Python, FastAPI, and PostgreSQL.
You will architect resilient microservices, deploy containerized workloads using Docker and Kubernetes on AWS, and maintain automated CI/CD pipelines with GitHub Actions.
Requirements:
- 5+ years of full-stack web development experience.
- Strong proficiency in modern React, state management, and responsive CSS (Tailwind CSS).
- Production experience with Python, FastAPI or Django, and asynchronous database design.
- Hands-on expertise with Docker, Kubernetes, microservices architecture, and cloud deployment on AWS.
- Familiarity with Agile, TDD, code reviews, and high-throughput REST APIs.`
    },
    cloud: {
        title: "DevOps & Cloud Infrastructure Engineer",
        company: "Datadog",
        text: `Seeking a skilled DevOps & Cloud Engineer to design scalable cloud environments on AWS and Google Cloud.
Must have strong expertise in Terraform, Docker, Kubernetes, CI/CD pipelines, Prometheus, Grafana, and Linux system administration.
Experience with Python or Go scripting for automation, security best practices, and microservices monitoring is required.`
    },
    ai: {
        title: "AI / Machine Learning Engineer",
        company: "Scale AI",
        text: `We are looking for an AI Engineer experienced in Python, PyTorch, LLMs, Gemini, NLP, Sentence Transformers, and Vector Databases (RAG pipelines).
Responsibilities:
- Build and evaluate NLP models, semantic search engines, and generative AI agents.
- Integrate REST APIs using FastAPI or Flask.
- Optimize model inference latency and deploy machine learning workloads using Docker on AWS.`
    }
};

function JobMatcher() {
    const location = useLocation();
    const getResumeAsPlainText = useResume((state) => state.getResumeAsPlainText);

    const [resumeText, setResumeText] = useState('');
    const [jobTitle, setJobTitle] = useState('Senior Full Stack Engineer');
    const [company, setCompany] = useState('Stripe');
    const [jobDescription, setJobDescription] = useState(SAMPLE_JOB_DESCRIPTIONS.fullstack.text);

    const [isMatching, setIsMatching] = useState(false);
    const [matchResult, setMatchResult] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (location.state?.prefilledResumeText) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setResumeText(location.state.prefilledResumeText);
        } else {
            const currentText = typeof getResumeAsPlainText === 'function' ? getResumeAsPlainText() : '';
            if (currentText && currentText.trim()) {
                setResumeText(currentText);
            } else {
                setResumeText(`Alex Morgan
alex.morgan@example.com | +1 (555) 019-2834 | San Francisco, CA

Summary:
Results-driven Senior Full Stack and AI Engineer with 6+ years of experience architecting distributed cloud systems, implementing production NLP pipelines, and optimizing high-throughput web applications.

Skills:
Python, FastAPI, React, TypeScript, PostgreSQL, Docker, spaCy, Sentence Transformers, PyTorch, AWS, Tailwind CSS, Git, Redis, REST API, Microservices

Experience:
Senior Software Engineer at Stripe (2022-03 - Present)
• Architected and scaled microservices handling 40M+ daily events using FastAPI, Python, and PostgreSQL.
• Designed semantic search retrieval system using Sentence Transformers and pgvector, reducing latency by 45%.

Full Stack Engineer at DataMetrics Corp (2019-06 - 2022-02)
• Developed responsive React and TypeScript dashboards serving 150k active business analysts.
• Integrated Docker containerized CI/CD pipelines on AWS ECS, improving release velocity by 60%.

Education:
University of California, Berkeley - B.S. in Computer Science (2015 - 2019)`);
            }
        }
    }, [location.state, getResumeAsPlainText]);

    const handleLoadSampleJD = (key) => {
        const sample = SAMPLE_JOB_DESCRIPTIONS[key];
        if (sample) {
            setJobTitle(sample.title);
            setCompany(sample.company);
            setJobDescription(sample.text);
        }
    };

    const handleRunMatch = async () => {
        if (!resumeText.trim()) {
            setErrorMessage('Please provide your resume text or build one in the editor first.');
            return;
        }
        if (!jobDescription.trim()) {
            setErrorMessage('Please enter a target job description.');
            return;
        }

        setIsMatching(true);
        setErrorMessage('');
        setMatchResult(null);

        try {
            const data = await matchJobDescription({
                resumeText,
                jobDescription,
                jobTitle,
                company
            });
            setMatchResult(data);
        } catch (err) {
            console.error(err);
            setErrorMessage(err.message || 'Match analysis failed. Ensure FastAPI backend is running.');
        } finally {
            setIsMatching(false);
        }
    };

    const getScoreBadgeColor = (score) => {
        if (score >= 80) return 'text-emerald-700 bg-emerald-50 border-emerald-300';
        if (score >= 60) return 'text-blue-700 bg-blue-50 border-blue-300';
        return 'text-amber-700 bg-amber-50 border-amber-300';
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-3">
                    <Link to="/" className="text-gray-500 hover:text-blue-600 transition">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                            AI
                        </div>
                        <h1 className="text-xl font-bold text-gray-900">
                            AI Resume Intelligence <span className="text-indigo-600 font-medium">/ Job Matcher</span>
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        to="/resume-editor"
                        className="text-sm font-semibold text-gray-600 hover:text-blue-600 px-3 py-1.5 rounded-lg border border-gray-200 bg-white"
                    >
                        Resume Builder
                    </Link>
                    <Link
                        to="/analyzer"
                        className="text-sm font-semibold text-blue-600 hover:text-blue-700 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200"
                    >
                        Resume Analyzer
                    </Link>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-10">
                <div className="mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-900">Sentence Transformers Semantic Job Matcher</h2>
                    <p className="text-gray-600 mt-1">
                        Leverage spaCy skill extraction and sentence embeddings to calculate semantic alignment, identify missing keywords, and get tailored resume recommendations.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-blue-600" />
                                    Candidate Resume
                                </label>
                                <button
                                    onClick={() => setResumeText(getResumeAsPlainText())}
                                    className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-semibold"
                                >
                                    <RefreshCw className="w-3 h-3" /> Pull from Builder
                                </button>
                            </div>
                            <textarea
                                rows={12}
                                value={resumeText}
                                onChange={(e) => setResumeText(e.target.value)}
                                placeholder="Paste or verify your resume text here (Summary, Skills, Experience, Education)..."
                                className="w-full text-xs p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-mono"
                            />
                        </div>
                        <p className="text-[11px] text-gray-400 mt-2">
                            {resumeText.length > 0 ? `${resumeText.split(/\s+/).filter(Boolean).length} words detected` : 'No text entered'}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                                    <Target className="w-4 h-4 text-indigo-600" />
                                    Target Job Description
                                </label>
                                <div className="flex gap-1.5 text-xs">
                                    <span className="text-gray-400 self-center mr-1 text-[11px]">Samples:</span>
                                    <button
                                        onClick={() => handleLoadSampleJD('fullstack')}
                                        className="px-2 py-0.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-[11px] font-medium"
                                    >
                                        Full Stack
                                    </button>
                                    <button
                                        onClick={() => handleLoadSampleJD('cloud')}
                                        className="px-2 py-0.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-[11px] font-medium"
                                    >
                                        DevOps
                                    </button>
                                    <button
                                        onClick={() => handleLoadSampleJD('ai')}
                                        className="px-2 py-0.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-[11px] font-medium"
                                    >
                                        AI / ML
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <input
                                    type="text"
                                    placeholder="Target Job Title"
                                    value={jobTitle}
                                    onChange={(e) => setJobTitle(e.target.value)}
                                    className="text-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                                />
                                <input
                                    type="text"
                                    placeholder="Company"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    className="text-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                                />
                            </div>

                            <textarea
                                rows={9}
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                placeholder="Paste the full job description or requirements here..."
                                className="w-full text-xs p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none font-mono"
                            />
                        </div>
                        <p className="text-[11px] text-gray-400 mt-2">
                            {jobDescription.length > 0 ? `${jobDescription.split(/\s+/).filter(Boolean).length} words detected` : 'No text entered'}
                        </p>
                    </div>
                </div>

                {errorMessage && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600">
                        {errorMessage}
                    </div>
                )}

                <div className="text-center mb-10">
                    <button
                        onClick={handleRunMatch}
                        disabled={isMatching}
                        className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold rounded-xl text-sm hover:from-indigo-700 hover:to-blue-700 transition shadow-md disabled:opacity-50 inline-flex items-center gap-2"
                    >
                        {isMatching ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Computing Sentence Embeddings & Skill Gaps...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-4 h-4 text-amber-300" />
                                Analyze Match & Identify Skill Gaps
                            </>
                        )}
                    </button>
                </div>

                {matchResult && (
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="flex items-center gap-6">
                                    <div className="relative w-28 h-28 rounded-full border-8 border-indigo-600 flex items-center justify-center bg-indigo-50/50">
                                        <div className="text-center">
                                            <span className="text-3xl font-black text-indigo-950">
                                                {matchResult.overall_match_score}%
                                            </span>
                                            <span className="text-[10px] text-gray-500 block uppercase font-bold">Match</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">
                                            {jobTitle || 'Target Position'} {company ? `at ${company}` : ''}
                                        </h3>
                                        <span className={`inline-block mt-1 text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getScoreBadgeColor(matchResult.overall_match_score)}`}>
                                            {matchResult.overall_match_score >= 80 ? 'High Match Profile' : matchResult.overall_match_score >= 60 ? 'Moderate Match — Optimization Recommended' : 'Low Match — Significant Gaps'}
                                        </span>
                                        <p className="text-[11px] text-gray-400 mt-2">
                                            Engine: <strong className="text-indigo-600 font-semibold">{matchResult.embedding_engine}</strong>
                                        </p>
                                    </div>
                                </div>

                                <div className="w-full md:w-72 space-y-4">
                                    <div>
                                        <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
                                            <span>Skills Coverage</span>
                                            <span>{matchResult.skills_match_score}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                                            <div
                                                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                                                style={{ width: `${matchResult.skills_match_score}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
                                            <span>Sentence Embeddings Similarity</span>
                                            <span>{matchResult.semantic_similarity_score}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                                            <div
                                                className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                                                style={{ width: `${matchResult.semantic_similarity_score}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-2xl border border-emerald-200 shadow-sm">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-7 h-7 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-900">Matched Skills ({matchResult.matched_skills.length})</h4>
                                        <p className="text-[11px] text-gray-500">Explicitly validated in both</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-1.5 mt-3">
                                    {matchResult.matched_skills.length > 0 ? (
                                        matchResult.matched_skills.map((skill, idx) => (
                                            <span
                                                key={idx}
                                                className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-md font-medium"
                                            >
                                                ✓ {skill}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-xs text-gray-400 italic">No exact skill overlaps detected.</p>
                                    )}
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-red-200 shadow-sm">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-7 h-7 bg-red-100 rounded-lg flex items-center justify-center text-red-600">
                                        <AlertTriangle className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-900">Skill Gaps ({matchResult.missing_skills.length})</h4>
                                        <p className="text-[11px] text-gray-500">Required in JD, missing in resume</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-1.5 mt-3">
                                    {matchResult.missing_skills.length > 0 ? (
                                        matchResult.missing_skills.map((skill, idx) => (
                                            <span
                                                key={idx}
                                                className="text-xs bg-red-50 text-red-800 border border-red-200 px-2.5 py-1 rounded-md font-medium"
                                            >
                                                + {skill}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-xs text-emerald-600 font-medium">All specified JD skills covered!</p>
                                    )}
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-blue-200 shadow-sm">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                        <Sparkles className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-900">Value-Add Strengths ({matchResult.bonus_skills.length})</h4>
                                        <p className="text-[11px] text-gray-500">Unique candidate competencies</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-1.5 mt-3">
                                    {matchResult.bonus_skills.length > 0 ? (
                                        matchResult.bonus_skills.map((skill, idx) => (
                                            <span
                                                key={idx}
                                                className="text-xs bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-md font-medium"
                                            >
                                                ★ {skill}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-xs text-gray-400 italic">No additional skills.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                            <h4 className="text-base font-bold text-gray-900 mb-1 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-indigo-600" />
                                Personalized Resume Recommendations
                            </h4>
                            <p className="text-xs text-gray-500 mb-6">
                                Actionable suggestions generated from Sentence Transformers sentence embeddings and skill gap analysis.
                            </p>

                            <div className="space-y-4">
                                {matchResult.recommendations.map((rec, index) => (
                                    <div
                                        key={index}
                                        className="p-4 rounded-xl border border-gray-100 bg-slate-50/70 hover:bg-slate-50 transition"
                                    >
                                        <div className="flex items-center justify-between mb-1.5">
                                            <span className="text-xs font-bold text-gray-900">{rec.title}</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] uppercase font-bold text-gray-500">{rec.category}</span>
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${rec.priority === 'High' ? 'bg-red-100 text-red-700' : rec.priority === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                                                    {rec.priority} Priority
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-600 leading-relaxed">{rec.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default JobMatcher;
