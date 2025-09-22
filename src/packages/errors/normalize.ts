export const normalizeError = (err: any): Error => {
    if(err instanceof Error){
        return err
    }
    return new Error("Unknown error")
}