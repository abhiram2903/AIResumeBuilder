import React from 'react';

function Input({ 
    label, 
    id, 
    type = 'text', 
    placeholder, 
    value, 
    onChange, 
    required = false,
    className = ''
}) {
    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label 
                    className="block text-sm font-medium text-gray-700 mb-2" 
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            
            <input 
                type={type}
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-gray-900 bg-white"
            />
        </div>
    );
}

export default Input;