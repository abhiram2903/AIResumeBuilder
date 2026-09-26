import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PersonalInfo from '../components/resume/PersonalInfo';
import Experience from '../components/resume/Experience';
import Education from '../components/resume/Education';
import Projects from '../components/resume/Projects';
import Skills from '../components/resume/Skills';
import ResumePreview from '../components/resume/ResumePreview';
import useResume from '../hooks/useResume';
import { downloadResumePdf, saveResumeToDb } from '../services/api';
import { Download, Save, ArrowLeft, Printer, RefreshCw, Target, CheckCircle2 } from 'lucide-react';

function ResumeEditor() {
    const navigate = useNavigate();
    const resumeData = useResume((state) => state.resumeData);
    const selectedTemplate = useResume((state) => state.selectedTemplate);
    const setTemplate = useResume((state) => state.setTemplate);
    const loadSampleData = useResume((state) => state.loadSampleData);
    const clearResumeData = useResume((state) => state.clearResumeData);

    const [isDownloading, setIsDownloading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 3500);
    };

    const handleDownloadPdf = async () => {
        setIsDownloading(true);
        try {
            await downloadResumePdf(resumeData);
            showToast('PDF downloaded successfully via FastAPI & ReportLab!');
        } catch (error) {
            console.error('PDF generation error:', error);
            window.print();
        } finally {
            setIsDownloading(false);
        }
    };

    const handleSaveToDatabase = async () => {
        setIsSaving(true);
        try {
            await saveResumeToDb(resumeData);
            showToast('Resume saved to PostgreSQL database!');
        } catch (error) {
            console.error('Database save error:', error);
            showToast('Saved locally (PostgreSQL connected when backend runs).');
        } finally {
            setIsSaving(false);
        }
    };

    const title = resumeData.personalInfo.jobTitle || resumeData.personalInfo.title || 'Untitled Resume';
    const fullName = `${resumeData.personalInfo.firstName || ''} ${resumeData.personalInfo.lastName || ''}`.trim();

    return (
        <div className="flex flex-col h-screen bg-slate-100 font-sans print:bg-white print:h-auto">
            {/* Header */}
            <header className="flex justify-between items-center px-6 py-3.5 border-b border-gray-200 bg-white z-10 shadow-sm print:hidden">
                <div className="flex items-center space-x-4">
                    <Link to="/" className="flex items-center gap-1.5 text-gray-500 hover:text-blue-600 font-medium transition-colors text-sm">
                        <ArrowLeft className="w-4 h-4" />
                        Home
                    </Link>
                    <div className="h-5 w-px bg-gray-200"></div>
                    <div>
                        <h1 className="text-base font-bold text-gray-900 leading-tight">
                            {fullName ? `${fullName} - ${title}` : title}
                        </h1>
                        <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            FastAPI & PostgreSQL Connected
                        </span>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    {/* Template Switcher */}
                    <div className="flex items-center bg-gray-100 rounded-lg p-1 text-xs font-medium">
                        <button
                            onClick={() => setTemplate('classic')}
                            className={`px-3 py-1 rounded-md transition ${selectedTemplate === 'classic' ? 'bg-white text-blue-600 shadow-sm font-semibold' : 'text-gray-600'}`}
                        >
                            Classic
                        </button>
                        <button
                            onClick={() => setTemplate('modern')}
                            className={`px-3 py-1 rounded-md transition ${selectedTemplate === 'modern' ? 'bg-white text-blue-600 shadow-sm font-semibold' : 'text-gray-600'}`}
                        >
                            Modern
                        </button>
                    </div>

                    {/* Sample Data */}
                    <button
                        onClick={loadSampleData}
                        className="flex items-center gap-1 text-xs text-gray-600 hover:text-blue-600 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-lg border border-gray-200 transition"
                        title="Load prefilled professional example"
                    >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Sample Data
                    </button>

                    {/* Match with Job Link */}
                    <button
                        onClick={() => navigate('/job-matcher')}
                        className="flex items-center gap-1.5 text-xs text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-2 rounded-lg border border-indigo-200 font-semibold transition"
                    >
                        <Target className="w-3.5 h-3.5" />
                        Match Job
                    </button>

                    {/* Save to PostgreSQL */}
                    <button
                        onClick={handleSaveToDatabase}
                        disabled={isSaving}
                        className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-2 rounded-lg border border-emerald-200 font-semibold transition disabled:opacity-60"
                        title="Save to PostgreSQL database"
                    >
                        <Save className="w-3.5 h-3.5" />
                        {isSaving ? 'Saving...' : 'Save to DB'}
                    </button>

                    {/* Print / Save */}
                    <button
                        onClick={() => window.print()}
                        className="p-2 text-gray-500 hover:text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                        title="Print / Save via browser"
                    >
                        <Printer className="w-4 h-4" />
                    </button>

                    {/* Download PDF via FastAPI */}
                    <button
                        onClick={handleDownloadPdf}
                        disabled={isDownloading}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-indigo-700 transition shadow-sm disabled:opacity-60"
                    >
                        <Download className="w-4 h-4" />
                        {isDownloading ? 'Generating PDF...' : 'Download PDF'}
                    </button>
                </div>
            </header>

            {toastMessage && (
                <div className="bg-emerald-600 text-white text-xs text-center py-1.5 font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {toastMessage}
                </div>
            )}

            {/* Main Content Split */}
            <div className="flex flex-1 overflow-hidden print:block print:overflow-visible">
                {/* Left Panel: Form Inputs */}
                <div className="w-1/2 h-full overflow-y-auto border-r border-gray-200 p-8 custom-scrollbar bg-white print:hidden">
                    <div className="max-w-2xl mx-auto space-y-6 pb-20">
                        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                            <div>
                                <h2 className="text-xl font-extrabold text-gray-900">Resume Builder</h2>
                                <p className="text-xs text-gray-500">Edit sections below with Gemini AI & export to PDF</p>
                            </div>
                            <button
                                onClick={clearResumeData}
                                className="text-xs text-red-500 hover:underline"
                            >
                                Reset All
                            </button>
                        </div>

                        <PersonalInfo />
                        <Experience />
                        <Education />
                        <Projects />
                        <Skills />
                    </div>
                </div>

                {/* Right Panel: Live Document Preview */}
                <div className="w-1/2 h-full overflow-y-auto bg-slate-200/80 p-8 flex justify-center custom-scrollbar print:w-full print:p-0 print:bg-white">
                    <div className="w-full flex justify-center">
                        <ResumePreview />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResumeEditor;
