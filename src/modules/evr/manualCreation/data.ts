import type { checklistCreation, parameterCreation } from "./types"

export const emptyParameter: parameterCreation = {
    name: "",
    total: 0,
    showControls: false,
    checklists: []
}
    
export const emptyChecklist: checklistCreation = {
    name: "",
    total: 0,
    idealRequirement: "",
    scoringCriterion: null,

    imageSample: null,
    // imageSample: null,
    imageSampleRawURI: null,

    evidenceUpload: false,
    evidenceMandate: true,
    evidenceCount: 0,
    evidenceType: null,
    showControls: false,
    options: [],
    optionsType: "Custom",
    expand: true,
    evidenceLiveCapture: true,
}