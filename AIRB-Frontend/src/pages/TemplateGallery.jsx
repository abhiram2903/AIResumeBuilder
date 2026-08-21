import React from 'react';
import { useNavigate } from 'react-router-dom';
import useResume from '../hooks/useResume';

function TemplateGallery() {
    const navigate = useNavigate();
    const setTemplate = useResume((state) => state.setTemplate);

    const handleSelectTemplate = (templateId) => {
        setTemplate(templateId);
        navigate('/resume-editor'); // Send them to the editor after choosing!
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 font-sans">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
                        Choose Your Template
                    </h1>
                    <p className="text-lg text-gray-600">
                        Select a design to start building your AI-powered resume. You can always change this later.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                    
                    <div 
                        onClick={() => handleSelectTemplate('classic')}
                        className="group cursor-pointer bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border-2 border-transparent hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1"
                    >
                        {/* Miniature CSS Wireframe of the Classic Template */}
                        <div className="w-full aspect-[8.5/11] bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6 shadow-inner flex flex-col">
                            <div className="w-2/3 h-4 bg-gray-300 rounded mb-2"></div>
                            <div className="w-1/3 h-3 bg-gray-200 rounded mb-4"></div>
                            <div className="w-full h-px bg-gray-300 mb-4"></div>
                            <div className="w-1/4 h-3 bg-gray-300 rounded mb-2"></div>
                            <div className="w-full h-2 bg-gray-200 rounded mb-1"></div>
                            <div className="w-5/6 h-2 bg-gray-200 rounded mb-4"></div>
                            <div className="w-1/4 h-3 bg-gray-300 rounded mb-2"></div>
                            <div className="w-full h-2 bg-gray-200 rounded mb-1"></div>
                            <div className="w-4/5 h-2 bg-gray-200 rounded"></div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">The Classic</h3>
                        <p className="text-sm text-gray-500 font-medium">ATS-Optimized • Traditional • Clean</p>
                    </div>

                    <div 
                        onClick={() => handleSelectTemplate('modern')}
                        className="group cursor-pointer bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border-2 border-transparent hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1"
                    >
                        {/* Miniature CSS Wireframe of the Modern Template */}
                        <div className="w-full aspect-[8.5/11] bg-white border border-gray-200 rounded-lg mb-6 shadow-inner flex overflow-hidden">
                            {/* Left Sidebar Wireframe */}
                            <div className="w-1/3 bg-slate-800 p-4 flex flex-col">
                                <div className="w-full h-3 bg-slate-600 rounded mb-2"></div>
                                <div className="w-2/3 h-2 bg-slate-500 rounded mb-4"></div>
                                <div className="w-full h-1 bg-slate-700 mb-4"></div>
                                <div className="w-1/2 h-2 bg-slate-600 rounded mb-2"></div>
                                <div className="w-full h-1.5 bg-slate-700 rounded mb-1"></div>
                            </div>
                            {/* Right Main Content Wireframe */}
                            <div className="w-2/3 p-4 flex flex-col bg-gray-50">
                                <div className="w-1/3 h-3 bg-gray-300 rounded mb-3"></div>
                                <div className="w-1/2 h-2 bg-blue-300 rounded mb-2"></div>
                                <div className="w-full h-1.5 bg-gray-200 rounded mb-1"></div>
                                <div className="w-5/6 h-1.5 bg-gray-200 rounded mb-4"></div>
                                <div className="w-1/2 h-2 bg-blue-300 rounded mb-2"></div>
                                <div className="w-full h-1.5 bg-gray-200 rounded mb-1"></div>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">The Modern</h3>
                        <p className="text-sm text-gray-500 font-medium">Creative • Two-Column • Bold</p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default TemplateGallery;