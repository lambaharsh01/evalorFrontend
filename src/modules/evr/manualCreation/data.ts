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

    imageSample: "https://s3.ca-east-006.backblazeb2.com/demo-bucket-1102/sample_profile_pic.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Checksum-Mode=ENABLED&X-Amz-Credential=00606daec65e1b40000000001%2F20250912%2Fca-east-006%2Fs3%2Faws4_request&X-Amz-Date=20250912T102347Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&x-id=GetObject&X-Amz-Signature=50e587579549d3b301d126296c0921043be451eafeaa35bc3ee744f712e8b3b1",
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