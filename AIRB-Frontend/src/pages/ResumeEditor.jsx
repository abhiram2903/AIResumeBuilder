import React from 'react';
import { Link } from 'react-router-dom';

import PersonalInfo from '../components/resume/PersonalInfo';
import Experience from '../components/resume/Experience';
import Education from '../components/resume/Education';
import Projects from '../components/resume/Projects';
import Skills from '../components/resume/Skills';
import ResumePreview from '../components/resume/ResumePreview';
function ResumeEditor() {
    return (
        <div className="flex flex-col h-screen bg-slate-50 font-sans">
            
            <header className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-white z-10 shadow-sm">
                <div className="flex items-center space-x-4">
                    <Link to="/" className="text-gray-500 hover:text-blue-600 font-medium transition-colors">
                        &larr; Home
                    </Link>
                    <div className="h-6 w-px bg-gray-300"></div>
                    <h1 className="text-xl font-bold text-gray-900">
                        Untitled Resume
                    </h1>
                </div>
                <div>
                    <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">
                        Download PDF
                    </button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                
                <div className="w-1/2 h-full overflow-y-auto border-r border-gray-200 p-8 custom-scrollbar">
                    
                    <div className="max-w-2xl mx-auto space-y-8 pb-20">
                        
                        <PersonalInfo />
                        <Experience />
                        <Education />
                        <Projects />
                        <Skills />

                    </div>
                </div>

                <div className="w-1/2 h-full overflow-y-auto bg-slate-200 p-8 flex justify-center custom-scrollbar">
                    
                    <div className="w-full max-w-[800px] h-[1056px] bg-white shadow-2xl rounded-sm border border-gray-200 flex flex-col items-center justify-center text-gray-400">
                        <p className="text-lg">Live Preview</p>
                        <ResumePreview />
                    </div>

                </div>
                
            </div>
        </div>
    );
}

export default ResumeEditor;