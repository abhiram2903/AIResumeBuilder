import React from 'react';
import Input from '../common/Input';
import useResume from '../../hooks/useResume'; 

function PersonalInfo() {
    
    const data = useResume((state) => state.resumeData.personalInfo);
    const updatePersonalInfo = useResume((state) => state.updatePersonalInfo);

    const handleChange = (e) => {
        const { id, value } = e.target;
        updatePersonalInfo(id, value);
    };

    return (
        <div className="p-6 border border-gray-100 shadow-sm rounded-xl space-y-4 bg-white">
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4">
                Personal Info
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                    label="First Name" 
                    id="firstName" 
                    value={data.firstName || ''} 
                    onChange={handleChange} 
                    placeholder="John" 
                />
                <Input 
                    label="Last Name" 
                    id="lastName" 
                    value={data.lastName || ''} 
                    onChange={handleChange} 
                    placeholder="Doe" 
                />
            </div>
            
            <Input 
                label="Professional Title" 
                id="title" 
                value={data.title || ''} 
                onChange={handleChange} 
                placeholder="e.g. Senior Software Engineer" 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                    label="Email Address" 
                    id="email" 
                    type="email" 
                    value={data.email || ''} 
                    onChange={handleChange} 
                    placeholder="john@example.com" 
                />
                <Input 
                    label="Phone Number" 
                    id="phone" 
                    type="tel" 
                    value={data.phone || ''} 
                    onChange={handleChange} 
                    placeholder="(555) 123-4567" 
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                    label="Location" 
                    id="location" 
                    value={data.location || ''} 
                    onChange={handleChange} 
                    placeholder="San Francisco, CA" 
                />
                <Input 
                    label="LinkedIn / Portfolio" 
                    id="portfolio" 
                    type="url" 
                    value={data.portfolio || ''} 
                    onChange={handleChange} 
                    placeholder="linkedin.com/in/johndoe" 
                />
            </div>
        </div>
    );
}

export default PersonalInfo;