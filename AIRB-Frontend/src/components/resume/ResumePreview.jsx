import React from 'react';
import useResume from '../../hooks/useResume';

const ClassicTemplate = ({ data }) => {
    const { personalInfo, experience, education, projects, skills } = data;
    
    return (
        <div className="w-full h-full p-12 bg-white text-gray-900 font-sans">
            {/* Header */}
            <header className="border-b-2 border-gray-900 pb-4 mb-6 text-center">
                <h1 className="text-4xl font-bold uppercase tracking-wider mb-1">
                    {personalInfo.firstName || 'First'} {personalInfo.lastName || 'Last'}
                </h1>
                <p className="text-xl text-gray-700 mb-3">{personalInfo.title || 'Professional Title'}</p>
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm font-medium text-gray-600">
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>• {personalInfo.phone}</span>}
                    {personalInfo.location && <span>• {personalInfo.location}</span>}
                    {personalInfo.portfolio && <span>• {personalInfo.portfolio}</span>}
                </div>
            </header>
            
            {/* Experience */}
            {experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-3 text-gray-800">Experience</h2>
                    {experience.map(job => (
                        <div key={job.id} className="mb-4">
                            <div className="flex justify-between font-bold text-gray-900">
                                <span>{job.role || 'Job Title'}</span>
                                <span>{job.startDate} {job.startDate && job.endDate ? '—' : ''} {job.endDate}</span>
                            </div>
                            <p className="font-semibold text-gray-700 mb-1">{job.company || 'Company Name'}</p>
                            <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                                {job.description || 'Describe your achievements and responsibilities here.'}
                            </p>
                        </div>
                    ))}
                </section>
            )}

            {/* Education */}
            {education && education.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-3 text-gray-800">Education</h2>
                    {education.map(edu => (
                        <div key={edu.id} className="mb-3">
                            <div className="flex justify-between font-bold text-gray-900">
                                <span>{edu.school || 'University Name'}</span>
                                <span>{edu.startDate} {edu.startDate && edu.endDate ? '—' : ''} {edu.endDate}</span>
                            </div>
                            <p className="text-sm text-gray-700">{edu.degree || 'Degree and Major'}</p>
                        </div>
                    ))}
                </section>
            )}
            
            {/* Skills */}
            {skills.length > 0 && (
                <section>
                    <h2 className="text-lg font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-3 text-gray-800">Skills</h2>
                    <p className="text-sm font-medium leading-relaxed">{skills.join('  •  ')}</p>
                </section>
            )}
        </div>
    );
};

const ModernTemplate = ({ data }) => {
    const { personalInfo, experience, education, projects, skills } = data;
    
    return (
        <div className="w-full h-full flex bg-white font-sans text-gray-900">
            {/* Left Sidebar (Dark) */}
            <div className="w-1/3 bg-slate-800 text-white p-8 flex flex-col">
                <h1 className="text-3xl font-bold uppercase tracking-wide mb-2 leading-tight">
                    {personalInfo.firstName || 'First'}<br/><span className="text-blue-400">{personalInfo.lastName || 'Last'}</span>
                </h1>
                <p className="text-sm font-medium text-slate-300 mb-8 pb-8 border-b border-slate-600">
                    {personalInfo.title || 'Professional Title'}
                </p>
                
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Contact</h2>
                <div className="text-sm space-y-3 mb-8 text-slate-200">
                    <p>{personalInfo.email || 'Email Address'}</p>
                    <p>{personalInfo.phone || 'Phone Number'}</p>
                    <p>{personalInfo.location || 'Location'}</p>
                    {personalInfo.portfolio && <p className="truncate">{personalInfo.portfolio}</p>}
                </div>

                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Skills</h2>
                <div className="flex flex-wrap gap-2 text-xs">
                    {skills.length > 0 ? skills.map((skill, i) => (
                        <span key={i} className="bg-slate-700 px-2 py-1 rounded text-white">{skill}</span>
                    )) : <span className="text-slate-500">Add some skills...</span>}
                </div>
            </div>

            {/* Right Main Content (Light) */}
            <div className="w-2/3 p-8">
                {/* Experience */}
                {experience.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-xl font-black uppercase tracking-wider text-gray-900 border-b-2 border-gray-200 pb-2 mb-4">Experience</h2>
                        {experience.map(job => (
                            <div key={job.id} className="mb-6 relative">
                                <div className="absolute -left-2 top-2 w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                <div className="pl-4 border-l-2 border-gray-200">
                                    <h3 className="font-bold text-gray-900 text-lg">{job.role || 'Job Title'}</h3>
                                    <p className="text-sm font-bold text-blue-600 mb-2">
                                        {job.company || 'Company'} <span className="text-gray-400 font-normal ml-2">{job.startDate} — {job.endDate}</span>
                                    </p>
                                    <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{job.description || 'Describe your achievements...'}</p>
                                </div>
                            </div>
                        ))}
                    </section>
                )}

                {/* Education */}
                {education && education.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-xl font-black uppercase tracking-wider text-gray-900 border-b-2 border-gray-200 pb-2 mb-4">Education</h2>
                        {education.map(edu => (
                            <div key={edu.id} className="mb-4 pl-4 border-l-2 border-gray-200">
                                <h3 className="font-bold text-gray-900">{edu.school || 'School Name'}</h3>
                                <p className="text-sm font-medium text-gray-700">{edu.degree || 'Degree'}</p>
                                <p className="text-xs text-gray-500 mt-1">{edu.startDate} — {edu.endDate}</p>
                            </div>
                        ))}
                    </section>
                )}
            </div>
        </div>
    );
};

function ResumePreview() {
    const selectedTemplate = useResume((state) => state.selectedTemplate);
    const resumeData = useResume((state) => state.resumeData);

    return (
        <div className="w-full max-w-[800px] h-[1056px] shadow-2xl bg-white border border-gray-200 overflow-hidden transform scale-100 origin-top">
            {selectedTemplate === 'classic' && <ClassicTemplate data={resumeData} />}
            {selectedTemplate === 'modern' && <ModernTemplate data={resumeData} />}
            {!['classic', 'modern'].includes(selectedTemplate) && <ClassicTemplate data={resumeData} />}
        </div>
    );
}

export default ResumePreview;