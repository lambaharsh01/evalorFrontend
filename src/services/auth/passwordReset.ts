import type { AuthUserContacts, ForgotPasswordData } from "@/modules/auth/types"
import { normalizeError, normalizeErrorCode } from "@/packages/errors/normalize"
import http from "@/packages/http/http"
import { reqInterceptor } from "@/packages/http/interceptor"
import { encryptPassword } from "@/packages/utils/encoding"


export const ForgotPasswordUserContact = async(data: ForgotPasswordData): Promise<[number, AuthUserContacts | null, Error | null]> => {

    const {userType, userCode} = data

    try {
        const res = await reqInterceptor({
            method: "GET",
            url: `/auth/user-contacts?userType=${userType}&userCode=${userCode}`,
        })

        return [http.StatusOK, res.contacts as AuthUserContacts, null]
    }catch(err){
        return [normalizeErrorCode(err), null, normalizeError(err)]
    }
}

export const SendResetPasswordOTP = async(data: ForgotPasswordData, sendAt: 'email'| 'sms'): Promise<[number, Error | null]> => {

    const {userType, userCode} = data

    try {
        await reqInterceptor({
            method: "POST",
            url: `/auth/send-reset-password-otp`,
            data:{userType, userCode, sendAt},
        })

        return [http.StatusOK, null]
    }catch(err){
        return [normalizeErrorCode(err), normalizeError(err)]
    }
}

export const CheckResetPasswordOTP = async(data: ForgotPasswordData): Promise<[number, Error | null]> => {

    const {userType, userCode, otp} = data

    try {
        await reqInterceptor({
            method: "POST",
            url: `/auth/check-reset-password-otp`,
            data:{userType, userCode, otp},
        })

        return [http.StatusOK, null]
    }catch(err){
        return [normalizeErrorCode(err), normalizeError(err)]
    }
}


export const UpdatePasswordWithOTP = async(data: ForgotPasswordData): Promise<[number, Error | null]> => {

    const {userType, userCode, otp, newPassword} = data
    const password = encryptPassword(newPassword)

    try {
        await reqInterceptor({
            method: "PUT",
            url: `/auth/update-password-with-otp`,
            data:{userType, userCode, otp, password},
        })

        return [http.StatusOK, null]
    }catch(err){
        return [normalizeErrorCode(err), normalizeError(err)]
    }
}
