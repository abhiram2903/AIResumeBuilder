import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import ResumeEditor from '../pages/ResumeEditor';
import LandingPage from '../pages/LandingPage';
import Auth from '../pages/Auth';
import TemplateGallery from '../pages/TemplateGallery';
import Dashboard from '../pages/Dashboard';
function AppRoutes() {
    return(
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/resume-editor" element={<ResumeEditor />} />
            <Route path="/template-gallery" element={<TemplateGallery />} />

        </Routes>
    )
}

export default AppRoutes;