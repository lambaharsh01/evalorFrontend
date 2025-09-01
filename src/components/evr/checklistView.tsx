import { ChevronDown, ChevronUp, Upload, File } from "lucide-react"
import type { checklistViewProp } from "./types"
import { CustomTextarea } from "../form"
import React, { useState, useRef } from "react"
import { isAcceptableFileType, isImage } from "@/packages/utils/fileTypes"
import { isMdOrMore } from "@/packages/utils/screen"
import { toast } from "sonner"


const ChecklistView: React.FC<checklistViewProp> = ({
    idx,
    checklist,
    setChecklist,
    setLoading,
}) => {

    const refs = useRef<(HTMLInputElement | null)[]>([])
    const [remark, setRemark] = useState<string>(checklist.remark)

    const disabledBorder: string = checklist.disabled ? "border border-[#cbd5e1]" : "border border-slate-700"
    const disabledText: string = checklist.disabled ? "text-slate-500" : "text-slate-800"

    const handleExpand = () => {
        setChecklist({ ...checklist, expand: !checklist.expand }, idx)
    }

    const handleScoreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const recivedScore: number = Number(e.currentTarget.value)
        setChecklist({ ...checklist, recived: recivedScore }, idx)
    }

    const handleAddImprovement = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChecklist({ ...checklist, isImprovementPoint: e.currentTarget.checked }, idx)
    }


    const handleRemarkChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setRemark(e.target.value)
    }

    const handleRemarkChangeDone = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        setChecklist({ ...checklist, remark: e.currentTarget.value }, idx)
    }


    const isLargeDevice: boolean = isMdOrMore()

    const handleFileClick = (e: React.MouseEvent<HTMLInputElement>) => {
        if (checklist.liveCapture && isLargeDevice) {
            toast.warning("To be captured live")
            e.preventDefault()
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: File | null = e.target.files?.[0] || null

        if (!file) return;

        const [ok, requiredFileType] = isAcceptableFileType(file.type, checklist.evidenceType)

        if (!ok) {
            toast.warning(`Please upload ${requiredFileType} file`);
        }

        setLoading(true)

        setTimeout(() => { setLoading(false) }, 5000)

        // console.log("Selected file:", file)
        // console.log("File name:", file.name)
        // console.log("File size:", file.size, "bytes")
        // console.log("MIME type:", file.type)
    }

    return (<div className="bg-white rounded-sm border border-[#cbd5e1] text-xs shadow-md mb-2">
        {/* Header */}
        <div className="p-2 border-b border-[#cbd5e1] flex items-center justify-between cursor-pointer"
            onClick={handleExpand}
            style={
                checklist.completed ? {
                    backgroundColor: '#f8fffb',
                    borderLeftWidth: '4px',
                    borderLeftColor: '#10b981',
                } : {
                    borderLeftWidth: '4px',
                    borderLeftColor: '#cbd5e1',
                }
            }
        >
            <div className="flex items-center gap-2">
                <h2 className={`text-[13.5px] ${disabledText}`}>1.1 {checklist.name}</h2>
            </div>

            <div className='flex'>

                <div className="flex items-center gap-2 px-2 py-1 me-2">
                    <span className={`font-medium text-[13.5px] ${disabledText}`}>{checklist.recived}/{checklist.total}</span>
                </div>
                <div className={`flex items-center gap-2 px-2 py-1 ${disabledText}`}>
                    {checklist.expand ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </div>
            </div>
        </div>

        {
            checklist.expand && (
                <div className="p-4 space-y-4"
                    style={
                        checklist.completed ? {
                            borderLeftWidth: '4px',
                            borderLeftColor: '#10b981',
                        } : {
                            borderLeftWidth: '4px',
                            borderLeftColor: '#cbd5e1',
                        }
                    }>
                    {/* Requirement & Criteria */}
                    <div className={`grid gap-4 items-stretch ${checklist.idealRequirement && checklist.scoringCriterion.length
                        ? "grid-cols-1 md:grid-cols-2"
                        : "grid-cols-1"
                        }`}
                    >
                        {Boolean(checklist.idealRequirement) && (
                            <div className="flex flex-col space-y-2">
                                <h3 className={`font-medium text-[13.5px] ${disabledText}`}>Ideal Requirement:</h3>
                                <div className={`rounded-sm p-3 text-xs overflow-y-auto flex-1 leading-relaxed bg-gradient-to-br from-slate-50 to-slate-100 text-slate-600 border border-[#cbd5e1]`}>
                                    <p className="whitespace-pre-line">{checklist.idealRequirement}</p>
                                </div>
                            </div>
                        )}

                        {Boolean(checklist.scoringCriterion.length) && (
                            <div className="flex flex-col space-y-2">
                                <h3 className={`font-medium text-[13.5px] ${disabledText}`}>Scoring Criteria:</h3>
                                <div className={`rounded-sm p-3 text-xs overflow-y-auto flex-1 leading-relaxed bg-gradient-to-br from-slate-50 to-slate-100 text-slate-600 border border-[#cbd5e1]`}>
                                    <ul className="list-disc pl-4 space-y-1">
                                        {checklist.scoringCriterion.map((c, i) => (
                                            <li key={i} className="text-xs">{c}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Evidence & Score */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                        {(Boolean(checklist.imageSample) || Boolean(checklist.evidences.length)) && (
                            <div className="space-y-2">
                                <h3 className={`font-medium text-[13.5px] ${disabledText}`}>Sample Image & Evidence Upload:</h3>
                                <div className={`flex p-2 rounded items-center gap-3 bg-gradient-to-br from-white to-slate-50 ${disabledBorder}`}>

                                    {Boolean(checklist.imageSample) && (<>
                                        <div className="w-10 h-10 mx-2 border-[#cbd5e1] rounded flex items-center justify-center text-xs text-slate-500">
                                            <img
                                                className="h-full w-full rounded"
                                                src={checklist.imageSample ?? ""}
                                                loading="lazy"
                                                alt="Sample image"
                                            />
                                        </div>

                                        <div className="h-10 border border-[#cbd5e1] "></div>

                                    </>
                                    )}

                                    <div className="flex-1 flex justify-around items-center">
                                        {checklist.evidences.map((evd, idxx) => (
                                            <div
                                                key={`evidence_${checklist.id}_${idxx}`}
                                                className={`w-10 h-10 border border-[#cbd5e1] rounded flex items-center justify-center text-xs text-slate-600 cursor-pointer transition-colors`}
                                            >
                                                {evd && isImage(checklist.evidenceType) ? ( //IF evidence is uploaded and of type image
                                                    < img
                                                        className="h-full w-full rounded"
                                                        src={evd.evidence ?? ""}
                                                        loading="lazy"
                                                        alt="Sample image"
                                                    />
                                                ) : evd ? ( // ELSE IF evidence is uploaded and is not an image
                                                    <File
                                                        className="w-4 h-4"
                                                        onClick={() => refs.current[idxx]?.click()}
                                                    />
                                                ) : ( // ELSE evidence is not uploaded
                                                    <Upload
                                                        className="w-4 h-4"
                                                        onClick={() => refs.current[idxx]?.click()}
                                                    />
                                                )
                                                }

                                                < input
                                                    type="file"
                                                    accept={checklist.evidenceType}
                                                    disabled={checklist.disabled}
                                                    onClick={handleFileClick}
                                                    className="hidden"
                                                    capture={checklist.liveCapture ? "environment" : undefined}
                                                    ref={(inputRef) => {
                                                        refs.current[idxx] = inputRef
                                                    }}
                                                    onChange={handleFileChange}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <h3 className={`font-medium text-[13.5px] ${disabledText}`}>Score:</h3>
                                <select
                                    className={`w-full h-14 px-3 py-2 rounded-sm text-xs focus:outline-none transition-all bg-white bg-gradient-to-br from-white to-slate-50 ${disabledBorder} ${disabledText}`}
                                    value={checklist.recived}
                                    onChange={handleScoreChange}
                                    disabled={checklist.disabled}
                                >
                                    {checklist.recived === null && (
                                        <option value="">Select</option>
                                    )}
                                    {checklist.options.map((opt, idxx) => (
                                        <option key={`option_${checklist.id}_${idxx}`} value={opt.value}>{opt.key}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <h3 className={`font-medium text-[13.5px] ${disabledText}`}>Options:</h3>
                                <div className={`p-2 rounded-sm bg-gradient-to-br from-white to-slate-50 ${disabledBorder}`}>
                                    <label className={`h-10 flex items-center gap-2 text-xs cursor-pointer transition-colors ${disabledText}`}>
                                        <input
                                            disabled={checklist.disabled}
                                            type="checkbox"
                                            checked={checklist.isImprovementPoint}
                                            onChange={handleAddImprovement}
                                            className="w-4 h-4 rounded-sm border-2 accent-[#1e293b] cursor-pointer"
                                        />
                                        Need Improvement
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className={`space-y-2 ${(checklist.imageSample || checklist.evidences.length) ? "md:col-span-2" : ""}`}>
                            <h3 className={`font-medium text-[13.5px] ${disabledText}`}>Remarks:</h3>
                            <CustomTextarea
                                className={disabledBorder + " rounded-2xl"}
                                disabled={checklist.disabled}
                                placeholder="Enter remarks..."
                                value={remark}
                                onChange={handleRemarkChange}
                                onBlur={handleRemarkChangeDone}
                            />
                        </div>
                    </div>

                </div>
            )
        }
    </div>)
}
export default ChecklistView