import type { AuthSuccessResponse, LoginFormData } from "@/modules/auth/types"
import { normalizeError, normalizeErrorCode } from "@/packages/errors/normalize"
import { initFetchFcmAndDeviceID } from "@/packages/firebase/config"
import http from "@/packages/http/http"
import { reqInterceptor } from "@/packages/http/interceptor"
import { getGeolocation } from "@/packages/location/config"
import { encryptPassword } from "@/packages/utils/encoding"

export const AuthSignIn = async(data: LoginFormData): Promise<[AuthSuccessResponse | null, Error | null]> => {

    const {userType, userCode} = data
    const password = encryptPassword(data.password)

    try {
        const res = await reqInterceptor({
            method: "POST",
            url: `/auth/sign-in`,
            data: {userType, userCode, password},
        })
        return [res as AuthSuccessResponse, null]
    }catch(err){
        return [null, normalizeError(err)]
    }
}

export const MFASendOTP = async(data: LoginFormData, sendAt: 'email'| 'sms'): Promise<[number, Error | null]> => {

    const {userType, userCode} = data
    const password = encryptPassword(data.password)

    try {
        await reqInterceptor({
            method: "POST",
            url: `/auth/mfa-send-otp`,
            data: {userType, userCode, password, sendAt},
        })
        return [http.StatusOK, null]
    }catch(err){
        return [normalizeErrorCode(err), normalizeError(err)]
    }
}

export const MFACheckAndSignIn = async(data: LoginFormData): Promise<[number, AuthSuccessResponse | null, Error | null]> => {

    const {userType, userCode, otp} = data
    const password = encryptPassword(data.password)

    try {
        const res = await reqInterceptor({
            method: "POST",
            url: `/auth/mfa-check-and-sign-in`,
            data: {userType, userCode, password, otp},
        })
        return [http.StatusOK, res as AuthSuccessResponse, null]
    }catch(err){
        return [normalizeErrorCode(err), null, normalizeError(err)]
    }
}



export const getPermissionsAndSync = async() => {

    await getGeolocation()

    const [fcmToken, deviceID] = await initFetchFcmAndDeviceID()
    if(!fcmToken || !deviceID) return

    try {
    await reqInterceptor({
        method: "post",
        url: "/private/post-auth/update-fcm",
        data: {fcmToken, deviceID},
    })
    
    } catch(err: any){
        console.error(normalizeError(err));
    }
} 