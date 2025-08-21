import React, { useState, useEffect } from 'react';
import { ArrowLeft, Building2, Mail, Phone, Eye, EyeOff, Check, Shield } from 'lucide-react';

interface ContactOption {
    id: string;
    type: 'email' | 'sms';
    value: string;
    masked: string;
    icon: React.ReactNode;
}

interface FormData {
    email: string;
    otp: string;
    newPassword: string;
    confirmPassword: string;
}

type Step = 'contact' | 'otp' | 'password' | 'success';

const ForgotPasswordFlow: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<Step>('contact');
    const [selectedContact, setSelectedContact] = useState<ContactOption | null>(null);
    const [formData, setFormData] = useState<FormData>({
        email: '',
        otp: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [otpTimer, setOtpTimer] = useState<number>(0);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Mock contact options - in real app, these would come from API after email verification
    const contactOptions: ContactOption[] = [
        {
            id: '1',
            type: 'email',
            value: 'john.doe@company.com',
            masked: 'j***@company.com',
            icon: <Mail className="h-5 w-5" />
        },
        {
            id: '2',
            type: 'sms',
            value: '+1234567890',
            masked: '+1***-***-7890',
            icon: <Phone className="h-5 w-5" />
        }
    ];

    // OTP Timer effect
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (otpTimer > 0) {
            interval = setInterval(() => {
                setOtpTimer(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [otpTimer]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string): string[] => {
        const errors = [];
        if (password.length < 8) errors.push('At least 8 characters');
        if (!/[A-Z]/.test(password)) errors.push('One uppercase letter');
        if (!/[a-z]/.test(password)) errors.push('One lowercase letter');
        if (!/\d/.test(password)) errors.push('One number');
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('One special character');
        return errors;
    };

    const handleEmailSubmit = async () => {
        if (!formData.email) {
            setErrors({ email: 'Email is required' });
            return;
        }
        if (!validateEmail(formData.email)) {
            setErrors({ email: 'Please enter a valid email address' });
            return;
        }

        setIsLoading(true);
        // Simulate API call to verify email and get contact options
        setTimeout(() => {
            setIsLoading(false);
            setCurrentStep('contact');
        }, 1500);
    };

    const handleSendOtp = async () => {
        if (!selectedContact) return;

        setIsLoading(true);
        // Simulate OTP sending
        setTimeout(() => {
            setIsLoading(false);
            setCurrentStep('otp');
            setOtpTimer(60); // 60 second timer
        }, 1000);
    };

    const handleVerifyOtp = async () => {
        if (!formData.otp || formData.otp.length !== 6) {
            setErrors({ otp: 'Please enter a valid 6-digit OTP' });
            return;
        }

        setIsLoading(true);
        // Simulate OTP verification
        setTimeout(() => {
            setIsLoading(false);
            setCurrentStep('password');
        }, 1000);
    };

    const handlePasswordReset = async () => {
        const newErrors: { [key: string]: string } = {};

        const passwordErrors = validatePassword(formData.newPassword);
        if (passwordErrors.length > 0) {
            newErrors.newPassword = passwordErrors.join(', ');
        }

        if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        // Simulate password reset
        setTimeout(() => {
            setIsLoading(false);
            setCurrentStep('success');
        }, 1500);
    };

    const handleResendOtp = () => {
        setOtpTimer(60);
        // Simulate resending OTP
        console.log('Resending OTP to:', selectedContact?.masked);
    };

    const renderEmailStep = () => (
        <>
            <div className="text-center">
                <div className="flex justify-center mb-6">
                    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                        <Building2 className="h-8 w-8 text-blue-900" />
                    </div>
                </div>
                <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                    Forgot Password
                </h2>
                <p className="text-gray-600 text-sm">
                    Enter your email address to reset your password
                </p>
            </div>

            <div className="bg-white py-8 px-6 shadow-sm border border-gray-200 rounded-lg">
                <div className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`block w-full pl-10 pr-3 py-3 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent text-gray-900 text-sm ${errors.email ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                placeholder="Enter your email address"
                            />
                        </div>
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                    </div>

                    <button
                        onClick={handleEmailSubmit}
                        disabled={isLoading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                        {isLoading ? (
                            <div className="flex items-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Verifying...
                            </div>
                        ) : (
                            'Continue'
                        )}
                    </button>
                </div>
            </div>
        </>
    );

    const renderContactStep = () => (
        <>
            <div className="text-center">
                <button
                    onClick={() => setCurrentStep('contact')}
                    className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
                >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back
                </button>
                <div className="flex justify-center mb-6">
                    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                        <Shield className="h-8 w-8 text-blue-900" />
                    </div>
                </div>
                <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                    Verify Identity
                </h2>
                <p className="text-gray-600 text-sm">
                    Choose how you'd like to receive your verification code
                </p>
            </div>

            <div className="bg-white py-8 px-6 shadow-sm border border-gray-200 rounded-lg">
                <div className="space-y-4">
                    {contactOptions.map((option) => (
                        <div
                            key={option.id}
                            onClick={() => setSelectedContact(option)}
                            className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${selectedContact?.id === option.id
                                    ? 'border-blue-900 bg-blue-50'
                                    : 'border-gray-300 hover:border-gray-400'
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className={`p-2 rounded-lg mr-3 ${selectedContact?.id === option.id
                                            ? 'bg-blue-900 text-white'
                                            : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        {option.icon}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">
                                            {option.type === 'email' ? 'Email' : 'SMS'}
                                        </p>
                                        <p className="text-sm text-gray-600">{option.masked}</p>
                                    </div>
                                </div>
                                <div className={`w-5 h-5 rounded-full border-2 ${selectedContact?.id === option.id
                                        ? 'border-blue-900 bg-blue-900'
                                        : 'border-gray-300'
                                    }`}>
                                    {selectedContact?.id === option.id && (
                                        <Check className="w-3 h-3 text-white m-0.5" />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={handleSendOtp}
                        disabled={!selectedContact || isLoading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 mt-6"
                    >
                        {isLoading ? (
                            <div className="flex items-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Sending...
                            </div>
                        ) : (
                            'Send Verification Code'
                        )}
                    </button>
                </div>
            </div>
        </>
    );

    const renderOtpStep = () => (
        <>
            <div className="text-center">
                <button
                    onClick={() => setCurrentStep('contact')}
                    className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
                >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back
                </button>
                <div className="flex justify-center mb-6">
                    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                        <Shield className="h-8 w-8 text-blue-900" />
                    </div>
                </div>
                <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                    Enter Verification Code
                </h2>
                <p className="text-gray-600 text-sm">
                    We sent a 6-digit code to {selectedContact?.masked}
                </p>
            </div>

            <div className="bg-white py-8 px-6 shadow-sm border border-gray-200 rounded-lg">
                <div className="space-y-6">
                    <div>
                        <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                            Verification Code
                        </label>
                        <input
                            id="otp"
                            name="otp"
                            type="text"
                            maxLength={6}
                            value={formData.otp}
                            onChange={handleInputChange}
                            className={`block w-full px-3 py-3 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent text-gray-900 text-sm text-center tracking-widest ${errors.otp ? 'border-red-300' : 'border-gray-300'
                                }`}
                            placeholder="Enter 6-digit code"
                        />
                        {errors.otp && (
                            <p className="mt-1 text-sm text-red-600">{errors.otp}</p>
                        )}
                    </div>

                    <button
                        onClick={handleVerifyOtp}
                        disabled={isLoading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                        {isLoading ? (
                            <div className="flex items-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Verifying...
                            </div>
                        ) : (
                            'Verify Code'
                        )}
                    </button>

                    <div className="text-center">
                        {otpTimer > 0 ? (
                            <p className="text-sm text-gray-600">
                                Resend code in {otpTimer}s
                            </p>
                        ) : (
                            <button
                                onClick={handleResendOtp}
                                className="text-sm text-blue-900 hover:text-blue-800 font-medium"
                            >
                                Resend verification code
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );

    const renderPasswordStep = () => (
        <>
            <div className="text-center">
                <div className="flex justify-center mb-6">
                    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                        <Shield className="h-8 w-8 text-blue-900" />
                    </div>
                </div>
                <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                    Reset Password
                </h2>
                <p className="text-gray-600 text-sm">
                    Enter your new password below
                </p>
            </div>

            <div className="bg-white py-8 px-6 shadow-sm border border-gray-200 rounded-lg">
                <div className="space-y-6">
                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                id="newPassword"
                                name="newPassword"
                                type={showNewPassword ? 'text' : 'password'}
                                value={formData.newPassword}
                                onChange={handleInputChange}
                                className={`block w-full pr-10 py-3 px-3 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent text-gray-900 text-sm ${errors.newPassword ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                placeholder="Enter new password"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                                >
                                    {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>
                        {errors.newPassword && (
                            <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className={`block w-full pr-10 py-3 px-3 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent text-gray-900 text-sm ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                placeholder="Confirm new password"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                                >
                                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>
                        {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                        )}
                    </div>

                    <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded-md">
                        <p className="font-medium mb-1">Password requirements:</p>
                        <ul className="space-y-1">
                            <li>• At least 8 characters long</li>
                            <li>• One uppercase and one lowercase letter</li>
                            <li>• One number and one special character</li>
                        </ul>
                    </div>

                    <button
                        onClick={handlePasswordReset}
                        disabled={isLoading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                        {isLoading ? (
                            <div className="flex items-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Resetting Password...
                            </div>
                        ) : (
                            'Reset Password'
                        )}
                    </button>
                </div>
            </div>
        </>
    );

    const renderSuccessStep = () => (
        <>
            <div className="text-center">
                <div className="flex justify-center mb-6">
                    <div className="bg-green-100 p-3 rounded-lg">
                        <Check className="h-8 w-8 text-green-600" />
                    </div>
                </div>
                <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                    Password Reset Successful
                </h2>
                <p className="text-gray-600 text-sm">
                    Your password has been successfully reset
                </p>
            </div>

            <div className="bg-white py-8 px-6 shadow-sm border border-gray-200 rounded-lg">
                <div className="text-center space-y-4">
                    <p className="text-gray-700">
                        You can now sign in with your new password.
                    </p>

                    <button
                        onClick={() => {
                            // Reset form and go back to login
                            setCurrentStep('contact');
                            setFormData({ email: '', otp: '', newPassword: '', confirmPassword: '' });
                            setSelectedContact(null);
                            setErrors({});
                        }}
                        className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-200"
                    >
                        Back to Sign In
                    </button>
                </div>
            </div>
        </>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {currentStep === 'contact' && renderEmailStep()}
                {currentStep === 'contact' && renderContactStep()}
                {currentStep === 'otp' && renderOtpStep()}
                {currentStep === 'password' && renderPasswordStep()}
                {currentStep === 'success' && renderSuccessStep()}

                <div className="text-center">
                    <p className="text-xs text-gray-500">
                        © 2025 Enterprise Solutions. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordFlow;