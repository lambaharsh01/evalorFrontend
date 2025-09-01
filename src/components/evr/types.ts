export interface checklistEvidences {
    evidence: string
    uploadedAt: string
    uploadedBy: string
}

export interface checklistOptions {
    key: string
    value: number
}

export interface checklist {
    evrId: number;
    parameterId: number;
    id: number
    name: string
    total: number;
    idealRequirement: string
    scoringCriterion: string[]
    imageSample: string | null
    evidences: (checklistEvidences| null)[]
    evidenceMandate: true
    evidenceType: string
    options: checklistOptions[]
    recived: number
    isImprovementPoint: boolean
    remark: string
    expand: boolean,
    completed?: boolean
    disabled: boolean
    liveCapture: boolean,
}

export interface checklistViewProp {
    idx: number
    checklist: checklist
    setChecklist: (checklist:checklist, idx:number)=>void
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}