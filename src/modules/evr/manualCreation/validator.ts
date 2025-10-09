import type { checklistCreation, InitEvr } from "./types";

export const checklistValidation = ({
    name,
    total,
    idealRequirement,
    scoringCriterion,
    imageSample,
    evidenceUpload,
    evidenceCount,
    evidenceType,
    options }: checklistCreation): {
        notStarted: boolean,
        isCompleted: boolean,
        maxOptions: number,
        total: number
    } => {

    const maxOptions: number = Math.max(...options.map(item => item.value)) || 0

    const notStarted: boolean = !name && !total && !idealRequirement

    const isCompleted: boolean =
        Boolean(name) &&
        Boolean(total) &&
        Boolean(idealRequirement) &&
        (scoringCriterion === null || !scoringCriterion.includes("")) &&
        (imageSample === null || Boolean(imageSample)) &&
        (!evidenceUpload || Boolean(evidenceCount)) &&
        (!evidenceUpload || Boolean(evidenceType)) &&
        Boolean(options.length) &&
        maxOptions === total;

    return { notStarted, isCompleted, maxOptions, total }

}

export const PasswordRules :string[] = [
    "At least 10 characters long",
    "Contains at least one uppercase letter (A-Z)",
    "Contains at least one lowercase letter (a-z)",
    "Contains at least one digit (0-9)",
    "Contains at least one special character (@$!%*?&)",
    "Must not contain your user ID",
    "Must not contain continuous numbers (e.g., 1234 or 4321)",
    "Must not contain common keyboard sequences (e.g., qwerty, asdf, zxcv, abcd, password)",
]

export const evrManualCreationValidation = ({name, totalScore}: InitEvr): string => {
    if(!name.trim()) return "Please enter EVR name"
    if(!totalScore) return "EVR Score has to be more than 0"
    return ""
}