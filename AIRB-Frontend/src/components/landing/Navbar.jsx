import { Link } from 'react-router-dom';
import Button from '../common/Button';
function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-sm border-b border-gray-100 z-50">
            <div className="mx-auto px-4 py-3 flex justify-between items-center">
                <div className="logo">
                    <h1 className="text-2xl font-bold text-blue-600">AI Resume Builder</h1>
                </div>
                <ul className="hidden md:flex space-x-6 items-center">
                    <li className="cursor-pointer font-medium text-gray-700 transition duration-300 hover:text-blue-600 text-sm">
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="cursor-pointer font-medium text-gray-700 transition duration-300 hover:text-blue-600 text-sm">
                        <Link to="/analyzer">spaCy Analyzer</Link>
                    </li>
                    <li className="cursor-pointer font-medium text-gray-700 transition duration-300 hover:text-indigo-600 text-sm">
                        <Link to="/job-matcher">Job Matcher</Link>
                    </li>
                    <li className="cursor-pointer font-medium text-gray-700 transition duration-300 hover:text-blue-600 text-sm">
                        <Link to="/resume-editor">Editor</Link>
                    </li>
                    <li className="cursor-pointer font-medium text-gray-700 transition duration-300 hover:text-blue-600 text-sm">
                        <Link to="/template-gallery">Templates</Link>
                    </li>
                </ul>
                <div className="flex space-x-3 items-center">
                    <Link to="/dashboard" className="text-gray-700 font-semibold text-sm transition duration-300 hover:text-blue-600 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-blue-400">
                        Workspace
                    </Link>
                    <Link to="/resume-editor">
                        <Button variant="primary" className="px-4 py-2 text-sm rounded-lg hover:bg-blue-700 transition duration-300 shadow-sm">
                            Create Resume
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;