import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { analyzeResumeFile, analyzeResumeText } from '../services/api';
import useResume from '../hooks/useResume';
import {
    Upload, FileText, CheckCircle2, AlertCircle, Sparkles,
    ArrowRight, Loader2, Award, Zap, Layers, ArrowLeft
} from 'lucide-react';

function ResumeAnalyzer() {
    const navigate = useNavigate();
    const setResumeData = useResume((state) => state.setResumeData);

    const [activeTab, setActiveTab] = useState('upload');
    const [rawText, setRawText] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setErrorMessage('');
        }
    };

    const handleAnalyze = async () => {
        setIsAnalyzing(true);
        setErrorMessage('');
        setAnalysisResult(null);

        try {
            let data;
            if (activeTab === 'upload') {
                if (!selectedFile) {
                    setErrorMessage('Please choose a PDF file to analyze.');
                    setIsAnalyzing(false);
                    return;
                }
                data = await analyzeResumeFile(selectedFile);
            } else {
                if (!rawText.trim()) {
                    setErrorMessage('Please paste your resume text to analyze.');
                    setIsAnalyzing(false);
                    return;
                }
                data = await analyzeResumeText(rawText);
            }
            setAnalysisResult(data);
        } catch (err) {
            console.error(err);
            setErrorMessage(err.message || 'Analysis failed. Ensure the FastAPI backend is running.');
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleImportToEditor = () => {
        if (!analysisResult) return;

        const nameParts = (analysisResult.guessed_name || '').split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        setResumeData({
            personalInfo: {
                firstName: firstName,
                lastName: lastName,
                jobTitle: 'Software Professional',
                email: analysisResult.email || '',
                phone: analysisResult.phone || '',
                location: '',
                portfolio: analysisResult.linkedin || analysisResult.github || '',
                summary: ''
            },
            experience: [],
            education: [],
            projects: [],
            skills: analysisResult.skills || []
        });

        navigate('/resume-editor');
    };

    const handleGoToMatcher = () => {
        navigate('/job-matcher', {
            state: {
                prefilledResumeText: analysisResult?.extracted_text || rawText
            }
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Header */}
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
                            AI Resume Intelligence <span className="text-blue-600 font-medium">/ Analyzer</span>
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
                        to="/job-matcher"
                        className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200"
                    >
                        Job Matcher
                    </Link>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-10">
                <div className="mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-900">Resume Analyzer & spaCy Skill Extractor</h2>
                    <p className="text-gray-600 mt-1">
                        Upload your existing PDF resume to extract technical competencies using spaCy, check ATS compliance, and identify optimization opportunities.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                            <div className="flex border-b border-gray-200 mb-5">
                                <button
                                    onClick={() => setActiveTab('upload')}
                                    className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition ${activeTab === 'upload' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                                >
                                    Upload PDF
                                </button>
                                <button
                                    onClick={() => setActiveTab('paste')}
                                    className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition ${activeTab === 'paste' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                                >
                                    Paste Resume Text
                                </button>
                            </div>

                            {activeTab === 'upload' ? (
                                <div className="space-y-4">
                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors bg-gray-50/50">
                                        <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                                        <p className="text-sm font-medium text-gray-700">
                                            {selectedFile ? selectedFile.name : 'Choose a PDF resume'}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">Supported formats: PDF (up to 10MB)</p>
                                        <label className="mt-4 inline-block px-4 py-2 bg-blue-50 text-blue-600 text-xs font-semibold rounded-lg cursor-pointer hover:bg-blue-100 transition">
                                            Browse Files
                                            <input
                                                type="file"
                                                accept=".pdf"
                                                onChange={handleFileChange}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                                        Paste Plain Text Resume
                                    </label>
                                    <textarea
                                        rows={10}
                                        value={rawText}
                                        onChange={(e) => setRawText(e.target.value)}
                                        placeholder="Paste full text of your resume here (Summary, Experience, Education, Skills)..."
                                        className="w-full text-xs p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-mono"
                                    />
                                </div>
                            )}

                            {errorMessage && (
                                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600 flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    <span>{errorMessage}</span>
                                </div>
                            )}

                            <button
                                onClick={handleAnalyze}
                                disabled={isAnalyzing}
                                className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl text-sm hover:from-blue-700 hover:to-indigo-700 transition shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isAnalyzing ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Running spaCy NLP Extraction...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-4 h-4" />
                                        Analyze Resume
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-7">
                        {analysisResult ? (
                            <div className="space-y-6">
                                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div className="flex items-center gap-5">
                                        <div className="relative w-24 h-24 flex items-center justify-center rounded-full bg-blue-50 border-4 border-blue-600">
                                            <div className="text-center">
                                                <span className="text-2xl font-black text-blue-900">
                                                    {analysisResult.ats_readiness_score}
                                                </span>
                                                <span className="text-[10px] text-gray-500 block uppercase font-semibold">ATS Score</span>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">
                                                {analysisResult.guessed_name || 'Resume Document'}
                                            </h3>
                                            <p className="text-xs text-gray-500 mt-0.5">
                                                {analysisResult.email || 'No email detected'} {analysisResult.phone ? `• ${analysisResult.phone}` : ''}
                                            </p>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                <span className="text-[11px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium border border-emerald-200">
                                                    {analysisResult.total_skills_detected} Skills Extracted
                                                </span>
                                                {analysisResult.nlp_engine && (
                                                    <span className="text-[11px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-medium">
                                                        {analysisResult.nlp_engine}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 w-full md:w-auto">
                                        <button
                                            onClick={handleImportToEditor}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-1.5 shadow-sm"
                                        >
                                            <Layers className="w-3.5 h-3.5" />
                                            Import into Builder
                                        </button>
                                        <button
                                            onClick={handleGoToMatcher}
                                            className="px-4 py-2 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-semibold hover:bg-indigo-100 transition flex items-center justify-center gap-1.5"
                                        >
                                            Match with Job <ArrowRight className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <Award className="w-4 h-4 text-blue-600" />
                                        ATS Section Check
                                    </h4>
                                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                                        {Object.entries(analysisResult.sections_detected || {}).map(([sec, found]) => (
                                            <div
                                                key={sec}
                                                className={`p-3 rounded-xl border text-center ${found ? 'bg-emerald-50/60 border-emerald-200 text-emerald-800' : 'bg-amber-50/60 border-amber-200 text-amber-800'}`}
                                            >
                                                <div className="flex justify-center mb-1">
                                                    {found ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-amber-600" />}
                                                </div>
                                                <span className="text-xs font-bold capitalize block">{sec}</span>
                                                <span className="text-[10px] opacity-80">{found ? 'Detected' : 'Missing'}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <Zap className="w-4 h-4 text-indigo-600" />
                                        spaCy Extracted Competencies
                                    </h4>

                                    <div className="space-y-4">
                                        {Object.entries(analysisResult.skill_categories || {}).map(([category, skills]) => (
                                            <div key={category} className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                                                <h5 className="text-xs font-bold text-gray-700 uppercase mb-2">{category}</h5>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {skills.map((skill, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md font-medium border border-slate-200"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white p-12 rounded-2xl border border-gray-200 shadow-sm text-center flex flex-col items-center justify-center h-full min-h-[360px]">
                                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                                    <FileText className="w-7 h-7" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800">No Resume Analyzed Yet</h3>
                                <p className="text-xs text-gray-500 max-w-sm mt-1">
                                    Upload a PDF resume or paste plain text to view instant spaCy NLP skill extraction, ATS compliance score, and recommendations.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ResumeAnalyzer;
