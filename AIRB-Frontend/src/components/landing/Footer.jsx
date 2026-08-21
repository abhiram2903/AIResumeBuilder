import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0">
                        <Link to="/" className="text-2xl font-bold text-gray-900 tracking-tight">
                            AI Resume Builder
                        </Link>
                        <p className="text-sm text-gray-500 mt-2 text-center md:text-left">
                            Land your dream job faster.
                        </p>
                    </div>
                    <div className="flex space-x-8">
                        <a href="#" className="text-gray-500 hover:text-blue-600 font-medium transition-colors duration-300">
                            Privacy
                        </a>
                        <a href="#" className="text-gray-500 hover:text-blue-600 font-medium transition-colors duration-300">
                            Terms
                        </a>
                        <a href="#" className="text-gray-500 hover:text-blue-600 font-medium transition-colors duration-300">
                            Contact
                        </a>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-gray-400">
                        &copy; {new Date().getFullYear()} AI Resume Builder. All rights reserved.
                    </p>
                    <div className="mt-4 md:mt-0 flex space-x-6">
                        <span className="w-5 h-5 bg-gray-200 rounded-full inline-block opacity-50"></span>
                        <span className="w-5 h-5 bg-gray-200 rounded-full inline-block opacity-50"></span>
                        <span className="w-5 h-5 bg-gray-200 rounded-full inline-block opacity-50"></span>
                    </div>
                </div>

            </div>
        </footer>
    );
}

export default Footer;