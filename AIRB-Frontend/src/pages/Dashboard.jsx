import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useResume from '../hooks/useResume';
import { downloadResumePdf, fetchResumesFromDb, deleteResumeFromDb } from '../services/api';
import {
    Plus, FileSearch, Target, Download, Edit3, ArrowRight,
    Sparkles, CheckCircle2, Layers, Trash2, Database
} from 'lucide-react';

function Dashboard() {
    const navigate = useNavigate();
    const resumeData = useResume((state) => state.resumeData);
    const setResumeData = useResume((state) => state.setResumeData);
    const loadSampleData = useResume((state) => state.loadSampleData);

    const [dbResumes, setDbResumes] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [isLoadingDb, setIsLoadingDb] = useState(false);

    const fallbackResumes = [
        {
            id: 101,
            title: 'Alex Morgan - Senior Full Stack & AI Engineer',
            targetRole: 'Senior Full Stack Engineer',
            company: 'Stripe',
            lastEdited: '10 mins ago',
            template: 'Classic',
            score: 92,
            skillsCount: 16
        },
        {
            id: 102,
            title: 'Alex Morgan - DevOps & Cloud Infrastructure',
            targetRole: 'DevOps Engineer',
            company: 'Datadog',
            lastEdited: '2 days ago',
            template: 'Modern',
            score: 85,
            skillsCount: 12
        }
    ];


    const loadResumes = async () => {
        setIsLoadingDb(true);
        try {
            const data = await fetchResumesFromDb();
            if (Array.isArray(data) && data.length > 0) {
                setDbResumes(data);
            }
        } catch (e) {
            console.warn('PostgreSQL fetch error, using local state:', e);
        } finally {
            setIsLoadingDb(false);
        }
    };
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadResumes();
    }, []);

    const handleDownload = async (e, resume) => {
        e.stopPropagation();
        try {
            await downloadResumePdf(resume.personalInfo ? resume : resumeData);
        } catch (err) {
            console.error('Download error:', err);
            window.print();
        }
    };

    const handleOpenInEditor = (resume) => {
        if (resume.personalInfo) {
            setResumeData({
                personalInfo: resume.personalInfo || {},
                experience: resume.experience || [],
                education: resume.education || [],
                projects: resume.projects || [],
                skills: resume.skills || []
            });
        }
        navigate('/resume-editor');
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        try {
            await deleteResumeFromDb(id);
            setDbResumes((prev) => prev.filter((r) => r.id !== id));
        } catch (err) {
            console.error('Delete error:', err);
        }
    };

    const displayResumes = dbResumes.length > 0 ? dbResumes : fallbackResumes;

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                        AI
                    </div>
                    <Link to="/" className="text-xl font-bold text-gray-900 hover:text-blue-600 transition">
                        AI Resume Intelligence Platform
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <Link
                        to="/analyzer"
                        className="text-xs font-semibold text-gray-600 hover:text-blue-600 px-3 py-1.5 rounded-lg border border-gray-200 bg-white"
                    >
                        Resume Analyzer
                    </Link>
                    <Link
                        to="/job-matcher"
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200"
                    >
                        Job Matcher
                    </Link>
                    <div className="flex items-center gap-3 pl-2 border-l border-gray-200">
                        <span className="text-sm font-medium text-gray-700">Abhiram</span>
                        <div className="w-9 h-9 bg-blue-100 text-blue-700 font-bold rounded-full flex items-center justify-center border border-blue-200 shadow-sm">
                            A
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-8 py-10">
                <div className="mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-900">Intelligence Workspace</h2>
                    <p className="text-gray-600 mt-1">
                        Create high-impact ATS resumes, analyze existing profiles with spaCy, and run semantic skill gap matching with Sentence Transformers.
                    </p>
                </div>

                {/* KPI Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                            <Layers className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="text-2xl font-black text-gray-900">{displayResumes.length}</span>
                            <p className="text-xs font-medium text-gray-500">Resumes in DB</p>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="text-2xl font-black text-gray-900">92%</span>
                            <p className="text-xs font-medium text-gray-500">Avg ATS Readiness</p>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                            <Target className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="text-2xl font-black text-gray-900">81.4%</span>
                            <p className="text-xs font-medium text-gray-500">Sentence Embeddings Match</p>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="text-2xl font-black text-gray-900">spaCy</span>
                            <p className="text-xs font-medium text-gray-500">NLP Skill Extractor</p>
                        </div>
                    </div>
                </div>

                {/* Core Actions */}
                <h3 className="text-lg font-bold text-gray-900 mb-4">Core Platform Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div
                        onClick={() => navigate('/resume-editor')}
                        className="bg-white p-6 rounded-2xl border-2 border-blue-100 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                    >
                        <div>
                            <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                                <Plus className="w-6 h-6" />
                            </div>
                            <h4 className="text-base font-bold text-gray-900">Create & Edit Resume</h4>
                            <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                                Build ATS resumes with Gemini AI bullet suggestions, ReportLab PDF download, and PostgreSQL persistence.
                            </p>
                        </div>
                        <div className="mt-4 flex items-center text-xs font-bold text-blue-600">
                            Open Resume Builder <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>

                    <div
                        onClick={() => navigate('/analyzer')}
                        className="bg-white p-6 rounded-2xl border-2 border-blue-100 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                    >
                        <div>
                            <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                                <FileSearch className="w-6 h-6" />
                            </div>
                            <h4 className="text-base font-bold text-gray-900">Analyze Existing Resume</h4>
                            <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                                Upload PDF resume to parse text, run spaCy linguistic skill extraction, and evaluate ATS compliance.
                            </p>
                        </div>
                        <div className="mt-4 flex items-center text-xs font-bold text-indigo-600">
                            Upload & Inspect <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>

                    <div
                        onClick={() => navigate('/job-matcher')}
                        className="bg-white p-6 rounded-2xl border-2 border-indigo-100 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                    >
                        <div>
                            <div className="w-12 h-12 bg-purple-600 text-white rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                                <Target className="w-6 h-6" />
                            </div>
                            <h4 className="text-base font-bold text-gray-900">Match with Job Description</h4>
                            <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                                Compare candidate resumes with job descriptions using Sentence Transformers sentence embeddings and cosine similarity.
                            </p>
                        </div>
                        <div className="mt-4 flex items-center text-xs font-bold text-purple-600">
                            Run Matcher <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>

                {/* Resumes Section */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-gray-900">Saved Resumes</h3>
                        <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Database className="w-3 h-3" /> PostgreSQL
                        </span>
                    </div>
                    <button
                        onClick={loadSampleData}
                        className="text-xs font-semibold text-blue-600 hover:underline"
                    >
                        Load Sample Profile
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {displayResumes.map((resume) => (
                        <div
                            key={resume.id}
                            className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h4 className="font-bold text-gray-900 text-base">{resume.title}</h4>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        Target: <span className="font-medium text-gray-700">{resume.targetRole || 'Full Stack Engineer'}</span>
                                    </p>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-[11px] font-bold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                                        {resume.template || 'Classic'}
                                    </span>
                                    {dbResumes.length > 0 && (
                                        <button
                                            onClick={(e) => handleDelete(e, resume.id)}
                                            className="text-gray-400 hover:text-red-500 p-1 transition"
                                            title="Delete resume from database"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-xs text-gray-500 my-3 py-2 border-y border-gray-100">
                                <span>ATS Score: <strong className="text-emerald-600 font-bold">{resume.ats_score || resume.score || 88}%</strong></span>
                                <span>•</span>
                                <span>{Array.isArray(resume.skills) ? resume.skills.length : (resume.skillsCount || 14)} Skills</span>
                                <span>•</span>
                                <span>{resume.updated_at ? new Date(resume.updated_at).toLocaleDateString() : (resume.lastEdited || 'Recently')}</span>
                            </div>

                            <div className="flex items-center justify-between mt-2 pt-1">
                                <button
                                    onClick={() => handleOpenInEditor(resume)}
                                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
                                >
                                    <Edit3 className="w-3.5 h-3.5" />
                                    Edit Resume
                                </button>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => navigate('/job-matcher')}
                                        className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1.5 rounded-lg transition"
                                    >
                                        <Target className="w-3.5 h-3.5" /> Match Job
                                    </button>
                                    <button
                                        onClick={(e) => handleDownload(e, resume)}
                                        className="inline-flex items-center gap-1 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 px-2.5 py-1.5 rounded-lg transition"
                                    >
                                        <Download className="w-3.5 h-3.5" /> PDF
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
