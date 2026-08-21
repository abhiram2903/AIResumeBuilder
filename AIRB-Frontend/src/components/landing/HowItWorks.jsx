import React from 'react';
function HowItWorks() {
    const steps=[
        {
            number:"1",
            title:"Upload Data",
            description: "Start by entering your basic contact info, education, and rough experience bullet points into our secure editor."
        },
        {
            number:"2",
            title:"AI-Powered Enhancement",
            description: "Our AI analyzes your input and transforms it into polished, metric-driven bullet points that highlight your achievements."
        },
        {
            number:"3",
            title:"Choose Template & Download",
            description: "Select from a variety of ATS-friendly templates, preview your resume in real-time, and download it in PDF format."
        }
    ];
    return (
        <section id="how-it-works" className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
                    How It Works
                </h2>
                <p className="text-lg text-gray-600 mb-16 text-center">
                    Creating a standout resume has never been easier. Follow these simple steps to get started.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-blue-100 z-0"></div>
                    {steps.map((step, index) => (
                        <div key={index} className="text-center relative z-10">
                            <div className="w-24 h-24 mx-auto rounded-full bg-white border-4 border-blue-50 flex items-center justify-center mb-6 shadow-sm">
                                <span className="text-3xl font-extrabold text-blue-600">
                                    {step.number}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                {step.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
export default HowItWorks;