import type { checklistOptions } from "@/components/evr/types";

export interface checklistCreation {
    id?: number
    name: string
    total: number;
    idealRequirement: null | string
    scoringCriterion: null | string[]
    imageSample: null | string
    imageSampleRawURI: null | string,
    evidenceUpload: boolean
    evidenceMandate: boolean
    evidenceCount: number
    evidenceType: null | string
    showControls: boolean
    options: checklistOptions[]
    optionsType: "Boolean" | "Custom"
    expand: boolean,
    evidenceLiveCapture: boolean,
}

export interface parameterCreation {
    id?: number;
    name: string;
    total: number;
    showControls: boolean,
    checklists: checklistCreation[],
}