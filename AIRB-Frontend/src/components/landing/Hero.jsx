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
                    AI Resume <span className="text-blue-600">Intelligence Platform</span>
                </h1>

                <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
                    Create professional ATS resumes, extract skills using <strong>spaCy NLP</strong>, and match candidates to job descriptions with <strong>Sentence Transformers</strong> embeddings and cosine similarity.
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <Link to="/dashboard">
                        <Button variant="primary" className="w-full sm:w-auto px-8 py-3.5 text-base font-bold shadow-md hover:bg-blue-700">
                            Open Intelligence Workspace
                        </Button>
                    </Link>

                    <Link to="/analyzer">
                        <Button variant="secondary" className="w-full sm:w-auto px-6 py-3.5 text-base border-gray-300 hover:border-blue-500">
                            spaCy Resume Analyzer
                        </Button>
                    </Link>

                    <Link to="/job-matcher" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 px-4 py-2 rounded-lg bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition">
                        Job Matcher &rarr;
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Hero;