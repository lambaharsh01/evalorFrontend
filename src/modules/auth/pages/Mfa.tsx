import React, { useState, useEffect } from 'react';
import { Mail, Phone } from 'lucide-react';
import { toast } from 'sonner';
import { useLocation, useNavigate } from 'react-router-dom';
import type { ContactOption, LoginFormData, Step } from '../types';
import RenderContactStep from '@/components/auth/renderContactStep';
import { generateCaptcha } from '@/packages/utils/captcha';
import RenderOtpStep from '@/components/auth/renderOtp';
import { getPermissionsAndSync, MFACheckAndSignIn, MFASendOTP } from '@/services/auth/signInAndMfa';
import Loading from '@/components/loading';
import http from '@/packages/http/http';
import { setStorage } from '@/packages/utils/storage';

const MFA: React.FC = () => {

    const navigate = useNavigate()
    const location = useLocation();
    const formDataParent = location.state as LoginFormData;

    const [loading, setLoading] = useState<boolean>(false)
    const [currentStep, setCurrentStep] = useState<Step>('contact');
    const [selectedContact, setSelectedContact] = useState<ContactOption | null>(null);

    const [formData, setFormData] = useState<LoginFormData>({ ...formDataParent });
    const [captchaString, setCaptchaString] = useState<string>("")

    const [otpTimer, setOtpTimer] = useState<number>(0);
    const [contactOptions,] = useState<ContactOption[]>([
        {
            type: 'email',
            masked: formDataParent.contactOptions?.emailID ?? "Not Available",
            icon: <Mail className="h-5 w-5" />
        },
        {
            type: 'sms',
            masked: formDataParent.contactOptions?.phoneNo ?? "Not Available",
            icon: <Phone className="h-5 w-5" />
        }
    ]);

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSendOtp = async () => {
        if (!selectedContact) return;

        if (formData.captcha !== captchaString) {
            toast.error("Captcha mismatch")
            return
        }

        setLoading(true)
        MFASendOTP(formData, selectedContact.type).then(([statusCode, err]) => {
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
        MFACheckAndSignIn(formData).then(([statusCode, res, err]) => {
            if (err || !res) {
                toast.error(err?.message ?? "Something went wrong")

                if (statusCode === http.StatusForbidden) {
                    setTimeout(() => { window.location.href = "/" }, 3000)
                }
                setLoading(false)
                return
            }


            // setLoading(true)
            // getAndUpdateFCMService().finally(() => {
            //     // setLoading(false) if false there is a flash of login before landing on the dashboard

            //     toast.success(`Welcome Back ${userName}`)
            //     router.replace(routes.dashboard)
            // })


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

    if (loading) return <Loading />

    return (
        <div className='rainbow-bg'>
            <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 pt-9">
                    {currentStep === 'contact' && renderContactStep()}
                    {currentStep === 'otp' && renderOtpStep()}
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

export default MFA;