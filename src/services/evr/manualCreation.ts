import type { evrCreation } from "@/modules/evr/manualCreation/types"
import { normalizeError } from "@/packages/errors/normalize"
import { reqInterceptor } from "@/packages/http/interceptor"

export const SaveEvrForm = async(payload:FormData): Promise<[string, Error | null]> => {
    try {
        const res = await reqInterceptor({
            method: "POST",
            url: `/private/evr/manual/save-evr-manual-form`,
            data: payload,
        })
        return [res.message as string, null]
    }catch(err){
        return ["", normalizeError(err)]
    }
}

export const GetEVRForm = async(evrID: number): Promise<[evrCreation | null, Error | null]> => {
    try {
        const res = await reqInterceptor({
            method: "GET",
            url: `/private/evr/manual/get-evr-manual-form/${evrID}`,
        })
        return [res.data as evrCreation, null]
    }catch(err){
        return [null, normalizeError(err)]
    }
}