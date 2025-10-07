import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mail, Phone, Eye, EyeOff, Info, User } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import type { ContactOption, ForgotPasswordData, Step } from '../types';
import RenderContactStep from '@/components/auth/renderContactStep';
import RenderOtpStep from '@/components/auth/renderOtp';
import { generateCaptcha } from '@/packages/utils/captcha';
import { validatePassword } from '@/packages/validators/password';
import { CheckResetPasswordOTP, ForgotPasswordUserContact, SendResetPasswordOTP, UpdatePasswordWithOTP } from '@/services/auth/passwordReset';
import http from '@/packages/http/http';
import Loading from '@/components/loading';
import { PasswordRules } from '@/modules/evr/manualCreation/validator';

const ForgotPasswordFlow: React.FC = () => {

    const navigate = useNavigate()

    const steps: Step[] = ['userCode', 'contact', 'otp', 'password', 'success']

    const [loading, setLoading] = useState<boolean>(false)
    const [currentStep, setCurrentStep] = useState<Step>('userCode');
    const [selectedContact, setSelectedContact] = useState<ContactOption | null>(null);

    const emptyFormData: ForgotPasswordData = {
        userType: '',
        userCode: '',
        otp: '',
        captcha: '',
        newPassword: '',
        confirmPassword: ''
    }

    const [formData, setFormData] = useState<ForgotPasswordData>({ ...emptyFormData });
    const [captchaString, setCaptchaString] = useState<string>("")
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [otpTimer, setOtpTimer] = useState<number>(0);

    const [contactOptions, setContactOptions] = useState<ContactOption[]>([]);

    const resetCaptcha = () => {
        setCaptchaString(generateCaptcha())
    }

    // CAPTCHA RESET
    useEffect(() => {
        resetCaptcha()
    }, [])

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

    };

    const handleUserCodeSubmit = async () => {
        if (!formData.userType) {
            toast.error('User type is required')
            return;
        }

        if (!formData.userCode) {
            toast.error('User code is required')
            return;
        }

        setLoading(true)
        ForgotPasswordUserContact(formData).then(([statusCode, contact, err]) => {
            if (err || !contact) {
                toast.error(err?.message ?? "Something went wrong")

                if (statusCode === http.StatusForbidden) {
                    setTimeout(() => { window.location.href = "/" }, 3000)
                }
                return
            }

            setContactOptions([
                {
                    type: 'email',
                    masked: contact?.emailID ?? "Not Available",
                    icon: <Mail className="h-5 w-5" />
                },
                {
                    type: 'sms',
                    masked: contact?.phoneNo ?? "Not Available",
                    icon: <Phone className="h-5 w-5" />
                }
            ])

            setCurrentStep('contact');

        }).finally(() => {
            setLoading(false)
        })
    };

    const handleSendOtp = async () => {
        if (!selectedContact) return;

        if (formData.captcha !== captchaString) {
            toast.error("Captcha mismatch")
            return
        }

        setLoading(true)
        SendResetPasswordOTP(formData, selectedContact.type).then(([statusCode, err]) => {
            if (err) {
                toast.error(err.message)

                if (statusCode === http.StatusForbidden) {
                    setTimeout(() => { window.location.href = "/" }, 3000)
                }
                return
            }

            setCurrentStep('otp');
            setOtpTimer(30);

        }).finally(() => {
            setLoading(false)
        })

    };

    const handleVerifyOtp = async () => {
        if (!formData.otp || formData.otp.length !== 6) {
            toast.error("Please enter a valid 6-digit OTP")
            return;
        }


        setLoading(true)
        CheckResetPasswordOTP(formData).then(([statusCode, err]) => {
            if (err) {
                toast.error(err.message)

                if (statusCode === http.StatusForbidden) {
                    setTimeout(() => { window.location.href = "/" }, 3000)
                }
                return
            }

            setCurrentStep('password');
        }).finally(() => {
            setLoading(false)
        })


    };

    const handlePasswordReset = async () => {

        const passwordErrors = validatePassword(formData.newPassword);
        if (passwordErrors.length > 0) {
            for (const err of passwordErrors.reverse()) {
                toast.error(err)
            }
            return
        }

        if (formData.newPassword !== formData.confirmPassword) {
            toast.error('Passwords do not match')
            return
        }


        setLoading(true)
        UpdatePasswordWithOTP(formData).then(([statusCode, err]) => {
            if (err) {
                toast.error(err.message)

                if (statusCode === http.StatusForbidden) {
                    setTimeout(() => { window.location.href = "/" }, 3000)
                }
                return
            }
            setCurrentStep('success');
        }).finally(() => {
            setLoading(false)
        })


    };

    const renderUserCodeStep = () => (
        <>
            <div className="text-center">
                <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                    Forgot Password
                </h2>
                <p className="text-gray-600 text-sm">
                    Enter your user code address to reset your password
                </p>
            </div>

            <div className="bg-white py-8 px-6 shadow-sm border border-gray-200 rounded-lg">
                <div className="space-y-6">

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
                                value={formData.userCode}
                                autoComplete='off'
                                onChange={handleInputChange}
                                className={`input-block text-sm`}
                                placeholder="Enter your user code"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleUserCodeSubmit}
                        className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </>
    );

    const renderContactStep = () => (
        <RenderContactStep
            handleSendOtp={handleSendOtp}
            contactOptions={contactOptions}
            selectedContact={selectedContact}
            setSelectedContact={setSelectedContact}
            captchaString={captchaString}
            captcha={formData.captcha}
            handleInputChange={handleInputChange}
            refreshCaptcha={() => resetCaptcha()}
        />
    );

    const renderOtpStep = () => (
        <RenderOtpStep
            selectedContact={selectedContact}
            otp={formData.otp}
            handleVerifyOtp={handleVerifyOtp}
            otpTimer={otpTimer}
            handleResendOtp={handleSendOtp}
            handleInputChange={handleInputChange}
        />
    );

    const renderPasswordStep = () => (
        <>
            <div className="text-center">
                <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                    Reset Password
                </h2>
                <p className="text-gray-600 text-sm">
                    Enter your new password below
                </p>
            </div>

            <div className="bg-white py-8 px-6 shadow-sm border border-gray-200 rounded-lg">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            New Password
                        </label>

                        <div className="relative">
                            <input
                                name="newPassword"
                                type={showNewPassword ? 'text' : 'password'}
                                autoComplete='off'
                                value={formData.newPassword}
                                onChange={handleInputChange}
                                className={`block w-full pr-10 py-3 px-3 border rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent text-gray-900 text-sm`}
                                placeholder="Enter new password"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                                >
                                    {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm Password
                        </label>

                        <div className="relative">
                            <input
                                name="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                autoComplete='off'
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className={`block w-full pr-10 py-3 px-3 border rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent text-gray-900 text-sm`}
                                placeholder="Confirm new password"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                                >
                                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="relative inline-block w-full">
                        <div className="flex justify-end">
                            <div className="group relative inline-flex items-center">
                                <Info className="h-5 w-5 text-gray-500 cursor-pointer hover:text-blue-400" />

                                {/* Tooltip positioned relative to the group wrapper */}
                                <div className="absolute right-10 -top-10 hidden w-64 rounded-md bg-gray-50 p-3 text-[10px] text-gray-600 shadow-lg group-hover:block hover:block z-50">
                                    <p className="font-medium mb-1">Password requirements:</p>
                                    <ul className="space-y-1">
                                        {PasswordRules.map((r) => (<li>• {r}</li>))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>


                    <button
                        onClick={handlePasswordReset}
                        className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
                    >
                        Reset Password
                    </button>
                </div>
            </div>
        </>
    );

    const renderSuccessStep = () => (
        <>
            <div className="text-center">

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
                            setFormData({ ...emptyFormData });
                            setSelectedContact(null);
                            navigate(-1)
                        }}
                        className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-200 cursor-pointer"
                    >
                        Back to Sign In
                    </button>
                </div>
            </div>
        </>
    );

    if (loading) return <Loading />

    return (
        <div className='rainbow-bg'>
            <div className="absolute top-0 left-0 w-full z-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">

                {(() => {
                    const currentIndex = steps.indexOf(currentStep)

                    if (currentIndex >= steps.length - 2) return null

                    const handleBackClick = () => {
                        if (currentIndex == 0) {
                            navigate(-1)
                            return
                        }

                        setCurrentStep(steps[currentIndex - 1])
                    }


                    return (
                        <div className="max-w-md w-full space-y-8 pt-3">
                            <button
                                onClick={handleBackClick}
                                className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4 cursor-pointer"
                            >
                                <ArrowLeft className="h-4 w-4 mr-1" />
                                Back
                            </button>
                        </div>
                    )
                }
                )()}
            </div>

            <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">

                <div className="max-w-md w-full space-y-8 pt-9">
                    {currentStep === 'userCode' && renderUserCodeStep()}
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
        </div>
    );
};

export default ForgotPasswordFlow;