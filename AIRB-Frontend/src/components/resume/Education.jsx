import React from 'react';
import useResume from '../../hooks/useResume';
import Input from '../common/Input';
import Button from '../common/Button';

function Education() {
    const education = useResume((state) => state.resumeData.education);
    const addEducation = useResume((state) => state.addEducation);
    const updateEducation = useResume((state) => state.updateEducation);

    return (
        <div className="p-6 border border-gray-100 shadow-sm rounded-xl space-y-6 bg-white mt-6">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                <h3 className="text-lg font-bold text-gray-900">Education</h3>
                <Button variant="primary" onClick={addEducation} className="text-sm px-4 py-1.5">
                    + Add School
                </Button>
            </div>

            {education.length === 0 && (
                <p className="text-gray-500 text-sm italic">No education added yet. Click "+ Add School" to start.</p>
            )}

            {education.map((edu, index) => (
                <div key={edu.id} className="space-y-4 p-5 border border-gray-200 rounded-lg bg-gray-50/50">
                    <h4 className="font-semibold text-gray-700">School {index + 1}</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="School / University"
                            id="school"
                            value={edu.school || ''}
                            onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                            placeholder="Harvard University"
                        />
                        <Input
                            label="Degree / Major"
                            id="degree"
                            value={edu.degree || ''}
                            onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                            placeholder="B.S. Computer Science"
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Start Date"
                            id="startDate"
                            type="month"
                            value={edu.startDate || ''}
                            onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                        />
                        <Input
                            label="End Date (or Expected)"
                            id="endDate"
                            type="month"
                            value={edu.endDate || ''}
                            onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Education;