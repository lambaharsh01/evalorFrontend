import type { checklistCreation } from "./types";

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
