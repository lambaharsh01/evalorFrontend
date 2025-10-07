import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { LoginFormData } from '../types';
import { toast } from 'sonner';
import { AuthSignIn, getPermissionsAndSync } from '@/services/auth/signInAndMfa';
import Loading from '@/components/loading';
import { setStorage } from '@/packages/utils/storage';

const Signin: React.FC = () => {

    const navigate = useNavigate()

    const [loading, setLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState<LoginFormData>({
        userType: '',
        userCode: '',
        password: '',
        captcha: '',
        otp: '',
    });

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSignIn = () => {

        if (!formData.userType) {
            toast.error('User type is required')
            return;
        }

        if (!formData.userCode) {
            toast.error('User code is required')
            return;
        }

        if (!formData.password) {
            toast.error('User code is required')
            return;
        }

        setLoading(true)
        AuthSignIn(formData).then(([res, err]) => {
            if (err || !res) {
                toast.error(err?.message ?? "Something went wrong")
                setLoading(false)
                return
            }

            if (res.mfa) {
                const data = { ...formData, contactOptions: res.userContacts }
                navigate("/mfa", { state: data })
                setLoading(false)
                return
            }
            // NO MFA

            if (!res.accessToken || !res.userDetails) {
                toast.error("Something went wrong")
                setLoading(false)
                return
            }

            setStorage(res.accessToken, res.userDetails)

            getPermissionsAndSync().finally(() => {
                setLoading(false)
                navigate("/main-dashboard")
            })
        })


    };

    if (loading) return <Loading />

    return (
        <div className="min-h-screen rainbow-bg flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 pt-9">
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
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                User Type
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <select
                                    name="userType"
                                    required
                                    value={formData.userType}
                                    onChange={handleInputChange}
                                    autoComplete="on"
                                    className="input-block text-sm"
                                >
                                    <option value="">Select User Type</option>
                                    <option value="employee">Employee</option>
                                    <option value="entity">Entity</option>
                                </select>
                            </div>
                        </div>


                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                User Code
                            </label>
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
                                    className="input-block text-sm"
                                    placeholder="Enter your user code"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="off"
                                    required
                                    name='password'
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="input-block text-sm"
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
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-end">

                            <div>
                                <a className="text-sm text-blue-900 hover:text-blue-800 font-medium cursor-pointer"
                                    onClick={() => navigate("/password-reset")}>
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="button"
                                onClick={handleSignIn}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
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
                        <a className="text-sm text-blue-900 hover:text-blue-800 font-medium cursor-pointer"
                            onClick={() => navigate("/password-reset")}>
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