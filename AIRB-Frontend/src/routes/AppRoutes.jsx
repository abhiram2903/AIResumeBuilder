
import { Routes, Route } from 'react-router-dom';
import ResumeEditor from '../pages/ResumeEditor';
import LandingPage from '../pages/LandingPage';
import Auth from '../pages/Auth';
import TemplateGallery from '../pages/TemplateGallery';
import Dashboard from '../pages/Dashboard';
import ResumeAnalyzer from '../pages/ResumeAnalyzer';
import JobMatcher from '../pages/JobMatcher';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/resume-editor" element={<ResumeEditor />} />
            <Route path="/template-gallery" element={<TemplateGallery />} />
            <Route path="/analyzer" element={<ResumeAnalyzer />} />
            <Route path="/job-matcher" element={<JobMatcher />} />
        </Routes>
    );
}

export default AppRoutes;
