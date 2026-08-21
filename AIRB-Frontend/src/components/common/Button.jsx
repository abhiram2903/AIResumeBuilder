import React from 'react';

function Button({ 
    children, 
    onClick, 
    type = 'button', 
    variant = 'primary', 
    className = '',
    disabled = false 
}) {
    const baseClasses = "inline-flex justify-center items-center font-bold px-6 py-3 rounded-lg transition-all duration-300 shadow-sm";
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 shadow-md shadow-blue-200",
        secondary: "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 hover:border-gray-300",
        outline: "bg-transparent text-blue-600 border-2 border-blue-600 hover:bg-blue-50"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        >
            {children}
        </button>
    );
}

export default Button;