import { Link } from 'react-router-dom';
import Button from '../common/Button';
function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-sm border-b border-gray-100 z-50">
            <div className="mx-auto px-4 py-3 flex justify-between items-center">
                <div className="logo">
                    <h1 className="text-2xl font-bold text-blue-600">AI Resume Builder</h1>
                </div>
                <ul className="hidden md:flex space-x-8 items-center">
                    <li className="cursor-pointer font-medium text-gray-700 transition duration-300 hover:text-blue-600">
                        <a href="#features">Features</a>
                    </li>
                    <li className="cursor-pointer font-medium text-gray-700 transition duration-300 hover:text-blue-600">
                        <a href="#templates">Templates</a>
                    </li>
                    <li className="cursor-pointer font-medium text-gray-700 transition duration-300 hover:text-blue-600">
                        <a href="#how-it-works">How it Works</a>
                    </li>
                    <li className="cursor-pointer font-medium text-gray-700 transition duration-300 hover:text-blue-600">
                        <a href="#faq">FAQ</a>
                    </li>
                </ul>
                <div className="flex space-x-4 items-center">
                    <Link to="/auth" state={{ isLogin: true }} className="text-gray-700 font-medium transition duration-300 hover:text-blue-600 px-4 py-2">
                        Login
                    </Link>
                    <Link to="/auth" state={{ isLogin: false }}>
                        <Button variant="primary" className="px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-300 shadow-sm">
                            Get Started
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;