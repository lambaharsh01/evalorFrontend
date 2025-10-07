import type { ContactOption } from "@/modules/auth/types";
import type { Dispatch, SetStateAction } from "react";

export interface RenderContactStepProps {
    contactOptions: ContactOption[];
    selectedContact: ContactOption | null;
    setSelectedContact: Dispatch<SetStateAction<ContactOption | null>>;
    handleSendOtp: () => void;
    // CAPTCHA
    captchaString: string;
    captcha: string;
    refreshCaptcha: () => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


export interface CaptchaCanvasProps {
    captcha: string;
}

export interface RenderOtpStepProps {
    selectedContact: ContactOption | null;
    otp: string;
    handleVerifyOtp: () => void;
    otpTimer: number;
    handleResendOtp: () => void
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}