import React from 'react';

// 1. Import your custom PNG icons
import sparklesIcon from '../../assets/images/icons/star.png';
import documentIcon from '../../assets/images/icons/document.png';
import splitScreenIcon from '../../assets/images/icons/split-screen.png';
import targetIcon from '../../assets/images/icons/target.png';

function Features() {
    // 2. Updated Feature Data Array
    const featureData = [
        {
            title: "Instant AI Bullet Points",
            description: "Paste your raw experience and let our AI rewrite it into powerful, metric-driven bullet points using the STAR method.",
            icon: sparklesIcon
        },
        {
            title: "ATS-Friendly Templates",
            description: "Choose from a library of clean, professional templates specifically designed to parse flawlessly through Applicant Tracking Systems.",
            icon: documentIcon
        },
        {
            title: "Real-Time Preview",
            description: "Experience a seamless split-screen UI. As you update your information on the left, your perfectly formatted resume updates instantly on the right.",
            icon: splitScreenIcon
        },
        {
            title: "Smart ATS Scoring",
            description: "Upload your resume and paste your target job description. Our AI analyzes your text for missing keywords to maximize your match rate.",
            icon: targetIcon
        }
    ];

    return (
        <section id="features" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Everything you need to land the interview
                    </h2>
                    <p className="text-lg text-gray-600">
                        Stop struggling with formatting and writer's block. Our AI tools handle the heavy lifting so you can focus on applying.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-8xl mx-auto">
                    {featureData.map((feature, index) => (
                        <div 
                            key={index} 
                            className="bg-white p-8 rounded-2xl border border-gray-100 text-center transition-all duration-300 hover:border-blue-100 hover:shadow-sm"
                        >
                            <div className="w-12 h-12 mx-auto rounded-full bg-blue-50 flex items-center justify-center mb-6">
                                <img 
                                    src={feature.icon} 
                                    alt={`${feature.title} icon`} 
                                    className="w-6 h-6 object-contain" 
                                />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default Features;