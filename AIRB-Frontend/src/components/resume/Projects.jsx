import React from 'react';
import useResume from '../../hooks/useResume';
import Input from '../common/Input';
import Button from '../common/Button';

function Projects() {
    const projects = useResume((state) => state.resumeData.projects);
    const addProject = useResume((state) => state.addProject);
    const updateProject = useResume((state) => state.updateProject);

    return (
        <div className="p-6 border border-gray-100 shadow-sm rounded-xl space-y-6 bg-white mt-6">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                <h3 className="text-lg font-bold text-gray-900">Projects</h3>
                <Button variant="primary" onClick={addProject} className="text-sm px-4 py-1.5">
                    + Add Project
                </Button>
            </div>

            {projects.length === 0 && (
                <p className="text-gray-500 text-sm italic">No projects added yet. Click "+ Add Project" to start.</p>
            )}

            {projects.map((proj, index) => (
                <div key={proj.id} className="space-y-4 p-5 border border-gray-200 rounded-lg bg-gray-50/50">
                    <h4 className="font-semibold text-gray-700">Project {index + 1}</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Project Title"
                            id="title"
                            value={proj.title || ''}
                            onChange={(e) => updateProject(proj.id, 'title', e.target.value)}
                            placeholder="AI Resume Builder"
                        />
                        <Input
                            label="Link / Live URL"
                            id="link"
                            type="url"
                            value={proj.link || ''}
                            onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                            placeholder="https://github.com/..."
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description & Tech Stack</label>
                        <textarea
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none transition-shadow"
                            rows="3"
                            value={proj.description || ''}
                            onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                            placeholder="Built a full-stack React app using Tailwind and Zustand..."
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Projects;