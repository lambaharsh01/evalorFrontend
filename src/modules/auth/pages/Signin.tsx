import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LoginFormData {
    userCode: string;
    password: string;
    rememberMe: boolean;
}

const Signin: React.FC = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState<LoginFormData>({
        userCode: '',
        password: '',
        rememberMe: false
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            console.log('Login attempt:', formData);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">

                    <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                        Sign In
                    </h2>
                    <p className="text-gray-600 text-sm">
                        Access your enterprise dashboard
                    </p>
                </div>

                {/* Login Form */}
                <div className="bg-white py-8 px-6 shadow-sm border border-gray-200 rounded-lg">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                User Code

                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name='userCode'
                                        autoComplete="off"
                                        required
                                        value={formData.userCode}
                                        onChange={handleInputChange}
                                        className="gray-bg block w-full pl-10 pr-3 py-3 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent text-gray-900 text-sm"
                                        placeholder="Enter your User Code"
                                    />
                                </div>
                            </label>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password

                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        required
                                        name='password'
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="gray-bg block w-full pl-10 pr-10 py-3 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent text-gray-900 text-sm"
                                        placeholder="Enter your password"
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="text-gray-400 hover:text-gray-600 focus:outline-none"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5" />
                                            ) : (
                                                <Eye className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </label>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="rememberMe"
                                    name="rememberMe"
                                    type="checkbox"
                                    checked={formData.rememberMe}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-blue-900 focus:ring-blue-900 border-gray-300 rounded"
                                />
                                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>
                            <div>
                                <a className="text-sm text-blue-900 hover:text-blue-800 font-medium cursor-pointer"
                                    onClick={() => navigate("/password-reset")}>
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="button"
                                disabled={isLoading}
                                onClick={handleSubmit}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                                Sign In
                            </button>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Need help?</span>
                            </div>
                        </div>
                    </div>

                    {/* Help Links */}
                    <div className="mt-6 flex justify-center space-x-6">
                        <a className="text-sm text-gray-600 hover:text-gray-900">
                            Contact Support
                        </a>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center">
                    <p className="text-xs text-gray-500">
                        © 2025 Enterprise Solutions. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signin;