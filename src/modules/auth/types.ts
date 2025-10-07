
export type Step = 'userCode' | 'contact' | 'otp' | 'password' | 'success';
export type UserType = 'employee' | 'entity' | '';

export interface LoginFormData {
    userType: UserType;
    userCode: string;
    password: string;
    captcha: string;
    otp: string;
    contactOptions?: AuthUserContacts
}

export interface ContactOption {
    type: 'email' | 'sms';
    masked: string;
    icon: React.ReactNode;
}

export interface ForgotPasswordData {
    userType: UserType;
    userCode: string;
    otp: string;
    captcha: string;
    newPassword: string;
    confirmPassword: string;
}

export interface AuthUserDetails {
    userCode: string
    userName: string
    role: string
    phoneNo: string
    emailID: string
    passwordExpDate: string
    status: string
}

export interface AuthUserContacts {
    phoneNo: string 
    emailID: string 
}

export interface AuthSuccessResponse {
    accessToken?: string
    mfa?: boolean
    userDetails?: AuthUserDetails
    userContacts?: AuthUserContacts
}