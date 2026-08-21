import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

function Hero() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
            
            <div className="absolute inset-0 z-0 opacity-40">
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
                    Land Your Dream Job with <br className="hidden md:block" />
                    <span className="text-blue-600">AI-Powered Resumes</span>
                </h1>
                
                <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                    Our AI Resume Builder helps you create professional resumes in minutes, 
                    tailored to your skills and experience to beat the ATS.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">

                    <Link to="/auth" state={{ isLogin: false }}>
                        <Button variant="primary" className="w-full sm:w-auto px-8 py-4 text-lg">
                            Get Started Free
                        </Button>
                    </Link>
                    
                    <Link to="/resume-editor">
                        <Button variant="secondary" className="w-full sm:w-auto px-8 py-4 text-lg">
                            Try Editor Demo
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Hero;