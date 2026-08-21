import React from 'react';
import useResume from '../../hooks/useResume';
import Input from '../common/Input';
import Button from '../common/Button';

function Experience() {
    // 1. Grab the array and the actions directly from the Zustand Brain
    const experience = useResume((state) => state.resumeData.experience);
    const addExperience = useResume((state) => state.addExperience);
    const updateExperience = useResume((state) => state.updateExperience);

    return (
        <div className="p-6 border border-gray-100 shadow-sm rounded-xl space-y-6 bg-white mt-6">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                <h3 className="text-lg font-bold text-gray-900">Work Experience</h3>
                {/* 2. Button to add a new blank job to the array */}
                <Button variant="primary" onClick={addExperience} className="text-sm px-4 py-1.5">
                    + Add Job
                </Button>
            </div>

            {experience.length === 0 && (
                <p className="text-gray-500 text-sm italic">No experience added yet. Click "+ Add Job" to start.</p>
            )}

            {/* 3. Loop through every job in the array and render a form for it */}
            {experience.map((job, index) => (
                <div key={job.id} className="space-y-4 p-5 border border-gray-200 rounded-lg bg-gray-50/50 relative">
                    <h4 className="font-semibold text-gray-700">Job {index + 1}</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Company"
                            id="company"
                            value={job.company || ''}
                            // 4. Send the ID, the field name, and the typed value to Zustand
                            onChange={(e) => updateExperience(job.id, 'company', e.target.value)}
                            placeholder="Google"
                        />
                        <Input
                            label="Role"
                            id="role"
                            value={job.role || ''}
                            onChange={(e) => updateExperience(job.id, 'role', e.target.value)}
                            placeholder="Frontend Developer"
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Start Date"
                            id="startDate"
                            type="month"
                            value={job.startDate || ''}
                            onChange={(e) => updateExperience(job.id, 'startDate', e.target.value)}
                        />
                        <Input
                            label="End Date"
                            id="endDate"
                            type="month"
                            value={job.endDate || ''}
                            onChange={(e) => updateExperience(job.id, 'endDate', e.target.value)}
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none transition-shadow"
                            rows="4"
                            value={job.description || ''}
                            onChange={(e) => updateExperience(job.id, 'description', e.target.value)}
                            placeholder="Describe your key achievements..."
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Experience;