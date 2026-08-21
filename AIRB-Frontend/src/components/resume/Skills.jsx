import React, { useState } from 'react';
import useResume from '../../hooks/useResume';
import Button from '../common/Button';

function Skills() {
    // 1. Hook into Zustand
    const skills = useResume((state) => state.resumeData.skills);
    const addSkill = useResume((state) => state.addSkill);
    const removeSkill = useResume((state) => state.removeSkill);

    // 2. Local state just for the typing box
    const [currentSkill, setCurrentSkill] = useState('');

    const handleAdd = (e) => {
        e.preventDefault(); 
        if (currentSkill.trim() !== '') {
            addSkill(currentSkill.trim()); 
            setCurrentSkill('');           
        }
    };

    return (
        <div className="p-6 border border-gray-100 shadow-sm rounded-xl space-y-4 bg-white mt-6 mb-12">
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4">
                Skills
            </h3>
            
            <form onSubmit={handleAdd} className="flex gap-2">
                <input 
                    type="text"
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    placeholder="e.g. React, UI/UX, Leadership"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                />
                <Button type="submit" variant="primary">Add Skill</Button>
            </form>

            {/* Render the little blue tags for every skill in the array */}
            <div className="flex flex-wrap gap-2 mt-4">
                {skills.length === 0 && (
                    <p className="text-gray-500 text-sm italic">Add some skills to stand out.</p>
                )}
                {skills.map((skill, index) => (
                    <span 
                        key={index} 
                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2 border border-blue-100"
                    >
                        {skill}
                        <button 
                            type="button"
                            onClick={() => removeSkill(index)}
                            className="text-blue-400 hover:text-red-500 font-bold ml-1 focus:outline-none transition-colors"
                        >
                            &times;
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
}

export default Skills;