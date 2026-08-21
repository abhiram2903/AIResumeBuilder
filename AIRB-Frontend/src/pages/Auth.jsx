import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; 
import Input from '../components/common/Input'; 
import Button from '../components/common/Button'; 
import Loader from '../components/common/Loader';

function Auth() {
    const location = useLocation(); 
    const navigate = useNavigate(); 
    
    // Tracks whether the user is on the Login or Register tab
    const [isLogin, setIsLogin] = useState(location.state?.isLogin ?? true);
    const [loading, setLoading] = useState(false);

    // The Fake Login Function
    const handleSubmit = (e) => {
        e.preventDefault(); 
        setLoading(true);   
        
        setTimeout(() => {
            setLoading(false);
            navigate('/dashboard'); 
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">        
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        {isLogin ? 'Welcome Back' : 'Create an Account'}
                    </h2>
                    <p className="text-gray-600">
                        {isLogin 
                            ? 'Enter your credentials to access your account.' 
                            : 'Join today and build your AI-powered resume.'}
                    </p>
                </div>

                {/* The Sliding Toggle Button */}
                <div className="relative flex w-full p-1 bg-gray-100 rounded-xl mb-8">
                    <div 
                        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm transition-transform duration-300 ease-in-out ${
                            isLogin ? 'translate-x-0' : 'translate-x-full'
                        }`}
                    ></div>        
                    <button 
                        type="button"
                        onClick={() => setIsLogin(true)}
                        className={`relative w-1/2 py-2.5 text-sm font-semibold rounded-lg z-10 transition-colors duration-300 ${
                            isLogin ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Login
                    </button>   
                    <button 
                        type="button"
                        onClick={() => setIsLogin(false)}
                        className={`relative w-1/2 py-2.5 text-sm font-semibold rounded-lg z-10 transition-colors duration-300 ${
                            !isLogin ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Register
                    </button>
                </div>

                {/* The Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {!isLogin && (
                        <div className="animate-fade-in">
                            <Input 
                                label="Full Name"
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                required={true}
                            />
                        </div>
                    )}
                    
                    <Input 
                        label="Email Address"
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        required={true}
                    />
                    
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                                Password
                            </label>
                            {isLogin && (
                                <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                                    Forgot password?
                                </a>
                            )}
                        </div>
                        <Input 
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            required={true}
                        />
                    </div>
                    
                    <Button 
                        type="submit" 
                        variant="primary" 
                        className="w-full mt-4"
                        disabled={loading}
                    >
                        {loading ? <Loader size="sm" /> : (isLogin ? 'Sign In' : 'Create Account')}
                    </Button>
                </form>
                
            </div>
        </div>
    );
}

export default Auth;