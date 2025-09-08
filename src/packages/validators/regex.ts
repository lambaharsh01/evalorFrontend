export const isNumber = (str: string): boolean => {
    if(!str) return true 
    return /^[0-9]+$/.test(str);
}