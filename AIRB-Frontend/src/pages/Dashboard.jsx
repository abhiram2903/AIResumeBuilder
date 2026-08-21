import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();

    // Mock data for resumes since we don't have a backend database yet!
    const savedResumes = [
        { id: 1, title: 'Software Engineer Role', lastEdited: '2 hours ago', template: 'Modern' },
        { id: 2, title: 'Product Manager Application', lastEdited: '3 days ago', template: 'Classic' }
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            
            <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                        AI
                    </div>
                    <h1 className="text-xl font-bold text-gray-900">ResumeBuilder</h1>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-600">John Doe</span>
                    <div className="w-10 h-10 bg-gray-200 rounded-full border-2 border-white shadow-sm overflow-hidden">
                        {/* Placeholder Avatar */}
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="Avatar" />
                    </div>
                </div>
            </header>

            {/* --- MAIN CONTENT --- */}
            <main className="max-w-6xl mx-auto px-8 py-12">
                <div className="mb-10 flex justify-between items-end">
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">My Workspace</h2>
                        <p className="text-gray-600">Manage your resumes and create new ones tailored to your next role.</p>
                    </div>
                </div>

                {/* --- RESUME GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* 1. The "Create New" Action Card */}
                    <div 
                        onClick={() => navigate('/template-gallery')}
                        className="group flex flex-col items-center justify-center h-64 bg-blue-50 border-2 border-blue-200 border-dashed rounded-2xl cursor-pointer hover:bg-blue-100 hover:border-blue-400 transition-all duration-300"
                    >
                        <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-light mb-4 group-hover:scale-110 transition-transform">
                            +
                        </div>
                        <h3 className="text-lg font-bold text-blue-900">Create New Resume</h3>
                        <p className="text-sm text-blue-600 mt-1">Start from a template</p>
                    </div>

                    {/* 2. The Saved Resume Cards */}
                    {savedResumes.map((resume) => (
                        <div key={resume.id} className="h-64 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden group cursor-pointer">
                            {/* Card Top / Visual Placeholder */}
                            <div className="flex-1 bg-slate-100 p-4 relative border-b border-gray-100">
                                <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded text-xs font-bold text-gray-500 shadow-sm uppercase tracking-wider">
                                    {resume.template}
                                </div>
                                {/* Miniature document visual */}
                                <div className="w-2/3 h-full mx-auto bg-white shadow-sm border border-gray-200 rounded-t-md p-2">
                                    <div className="w-full h-2 bg-gray-200 rounded mb-2"></div>
                                    <div className="w-3/4 h-2 bg-gray-200 rounded mb-1"></div>
                                    <div className="w-1/2 h-2 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                            
                            {/* Card Bottom / Info */}
                            <div className="p-5">
                                <h3 className="font-bold text-gray-900 truncate">{resume.title}</h3>
                                <div className="flex justify-between items-center mt-2">
                                    <p className="text-xs text-gray-500">Edited {resume.lastEdited}</p>
                                    <button 
                                        onClick={() => navigate('/resume-editor')}
                                        className="text-sm font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        Edit &rarr;
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