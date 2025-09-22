import type { checklistOptions } from "@/components/evr/types";

export interface checklistCreation {
    id?: number
    name: string
    total: number
    idealRequirement: null | string
    scoringCriterion: null | string[]
    imageFile?: File
    imageSample: null | string
    imageSamplePrevUrl: null | string
    evidenceUpload: boolean
    evidenceMandate: boolean
    evidenceCount: number
    evidenceType: null | string
    showControls: boolean
    options: checklistOptions[]
    optionsType: "Boolean" | "Custom"
    expand: boolean
    evidenceLiveCapture: boolean
}

export interface parameterCreation {
    name: string
    total: number
    showControls: boolean
    checklists: checklistCreation[]
}

export interface evrCreation {
    id: number;
    name: string;
    code: null | string
    total: number
    status: 'Draft' | 'Completed' | 'Active'
    useParameters: boolean
    useManpower: boolean
    parametersCompleted: boolean
    manpowerCompleted: boolean
    parameters: parameterCreation[];
}

export interface payloadChecklist {
    name: string
    total: number
    idealRequirement: null | string
    scoringCriterion: null | string[]
    imageSampleKey: null | string
    imageSamplePrevUrl: null | string
    evidenceUpload: boolean
    evidenceMandate: boolean
    evidenceCount: number
    evidenceType: null | string
    showControls: boolean
    options: checklistOptions[]
    optionsType: "Boolean" | "Custom"
    evidenceLiveCapture: boolean
}

export interface payloadParameter {
    name: string
    total: number
    checklists: payloadChecklist[]
}
