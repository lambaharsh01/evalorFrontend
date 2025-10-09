import type { pagination } from "@/modules/dashboard/types/pagination"
import type { EVRManuals, InitEvr } from "@/modules/evr/manualCreation/types"
import { normalizeError } from "@/packages/errors/normalize"
import { reqInterceptor } from "@/packages/http/interceptor"

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

export const UpsertEVRForm = async(data: InitEvr, evrID: number): Promise<[Error | null]> => {
    try {

        data.totalScore = Number(data.totalScore)

        let url: string = `/private/evr/manual/add-evr-manual`
        let method: string = "POST"

        if(evrID){
            url = `/private/evr/manual/edit-evr-manual/${evrID}`
            method = "PUT"
        }

        await reqInterceptor({method, url, data})

        return [null]
    }catch(err){
        return [normalizeError(err)]
    }
}

export const DeleteEVR = async(evrID: number): Promise<[Error | null]> => {
    try {
        await reqInterceptor({
            method: "DELETE", 
            url:`/private/evr/manual/delete-evr-manual/${evrID}`,
        })

        return [null]
    }catch(err){
        return [normalizeError(err)]
    }
}