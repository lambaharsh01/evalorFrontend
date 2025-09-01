export const fileTypes:Record<string, string> = {
    "image/*":"Image",
    "image/jpeg": "Image",
    "image/png": "Image",

    "application/pdf": "PDF Document",
    "application/msword": "Word Document (.doc)",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "Word Document (.docx)",
    "application/vnd.ms-excel": "Excel Spreadsheet (.xls)",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "Excel Spreadsheet (.xlsx)",

    "text/plain": "Text File",
    "text/csv": "CSV File",
    "application/json": "JSON File",
    "application/zip": "ZIP Archive",
}

export const isImage = (imageType:string): boolean => {
    return imageType === "image/*"
}

export const isAcceptableFileType = (uft: string, rft: string): [boolean, string, string] => {
    const uploadedTypeRequire:string = fileTypes[uft]
    const requiredFileType:string = fileTypes[rft]

    return [uploadedTypeRequire === requiredFileType , requiredFileType, uploadedTypeRequire]
}
