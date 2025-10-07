import type { pagination } from "@/modules/dashboard/types/pagination"
import type { EVRManuals } from "@/modules/evr/manualCreation/types"
import { normalizeError } from "@/packages/errors/normalize"
import { reqInterceptor } from "@/packages/http/interceptor"

// export const AddEVRManual = async(payload:FormData): Promise<[string, Error | null]> => {
//     try {
//         const res = await reqInterceptor({
//             method: "POST",
//             url: `/private/evr/manual/save-evr-manual-form`,
//             data: payload,
//         })
//         return [res.message as string, null]
//     }catch(err){
//         return ["", normalizeError(err)]
//     }
// }

export const GetAllEVRForm = async(query: pagination): Promise<[EVRManuals[], number, Error | null]> => {
    try {
        const res = await reqInterceptor({
            method: "GET",
            url: `/private/evr/manual/get-all-evr`,
            query,
        })
        return [res.data, res.total, null]
    }catch(err){
        return [[], 0, normalizeError(err)]
    }
}