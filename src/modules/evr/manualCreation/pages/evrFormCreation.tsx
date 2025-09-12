import Sidebar from '@/components/sidebar';
import { useState, useRef } from 'react';

import type { checklistOptions } from '@/components/evr/types';
import Loading from '@/components/loading';
import { CustomInput, CustomNumberInput, CustomTextarea } from '@/components/form';
import { Button } from '@/components/button';
import { ChevronDown, ChevronUp, Plus, Upload, X, MoreHorizontal, Trash2 } from 'lucide-react';
import Modal, { ModalHeader } from '@/components/modals';
import { CustomTable, CustomTableWrapper, CustomTd, CustomTh, CustomThead, CustomTr } from '@/components/table';
import { isNumber } from '@/packages/validators/regex';
import { showSwitchWarningAlert, showChecklistDeleteWarningAlert, showParameterDeleteWarningAlert } from '@/components/alerts';
import { toast } from 'sonner';
import { fileTypes, imageFileType, isAcceptableFileType } from '@/packages/utils/fileTypes';
import type { checklistCreation, parameterCreation } from '../types';
import { emptyChecklist, emptyParameter } from '../data';
import { checklistValidation } from '../validator';


const EvrFormCreation: React.FC = () => {

    const allFileTypes: string[] = Object.keys(fileTypes)
    const refs = useRef<(HTMLInputElement | null)[][]>([])
    const [loading] = useState<boolean>(false)

    const evrTotal: number = 100
    const [parameters, setParameters] = useState<parameterCreation[]>([]);
    const [activeParaIdx, setActiveParaIdx] = useState<number>(0)
    const [imgSampleChecklistIdx, setImgSampleChecklistIdx] = useState<null | number>(null)
    const [scoringChecklistIdx, setScoringChecklistIdx] = useState<null | number>(null)

    const handleActiveParameterChange = (idx: number) => {
        setActiveParaIdx(idx)
    }

    const handleShowParameterControls = (idx: number, force?: boolean): void => {

        if (force !== undefined) {
            setParameters(prev => {
                prev[idx].showControls = force
                return [...prev]
            })
            return
        }
        setParameters(prev => {
            prev[idx].showControls = !prev[idx].showControls
            return [...prev]
        })
    }

    const handleDeleteParameter = async (idx: number) => {
        const { total, name, checklists } = parameters[idx]

        if (total || name || checklists.length) {
            const confirmed: boolean = await showParameterDeleteWarningAlert()
            if (!confirmed) return
        }

        setParameters(prev => {
            prev.splice(idx, 1)
            return [...prev]
        })

        if (idx > 0) {
            setActiveParaIdx(idx - 1)
        }
    }



    const parameterTotal: number = parameters.reduce((prev, curr) => prev + curr.total, 0)

    const handleAddParameter = () => {
        setParameters(prev => {
            prev.push(structuredClone(emptyParameter))
            setActiveParaIdx(prev.length - 1)
            return [...prev]
        })

    }

    const handleParameterChange = (e: React.ChangeEvent<HTMLTextAreaElement>, idx: number) => {
        setParameters(prev => {
            prev[idx].name = e.target.value
            return [...prev]
        })
    }

    const handleParameterTotalChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        if (!isNumber(e.target.value)) return
        setParameters(prev => {
            prev[idx].total = Number(e.target.value)
            return [...prev]
        })
    }

    // CHECKLIST FUNC

    const handleAddChecklist = () => {
        setParameters(prev => {
            prev[activeParaIdx].checklists.push(structuredClone(emptyChecklist))
            return [...prev]
        })
    }


    const handleChecklistDelete = async (idx: number) => {

        const { notStarted } = checklistValidation(parameters[activeParaIdx].checklists[idx])


        if (!notStarted) { // not not started = started
            const confirmed: boolean = await showChecklistDeleteWarningAlert()
            if (!confirmed) return
        }

        setParameters(prev => {
            prev[activeParaIdx].checklists.splice(idx, 1)
            return [...prev]
        })
    }



    const disabledBorder: string = "border border-slate-700"
    const disabledText: string = "text-slate-800"

    const handleChecklistExpand = (checklistIdx: number) => {

        setParameters(prev => {
            prev[activeParaIdx].checklists[checklistIdx].expand = !prev[activeParaIdx].checklists[checklistIdx].expand
            return [...prev]
        })
    }

    const handleChecklistChange = (e: React.ChangeEvent<HTMLInputElement>, checklistIdx: number) => {
        setParameters(prev => {
            prev[activeParaIdx].checklists[checklistIdx].name = e.target.value
            return [...prev]
        })
    }

    const handleChecklistTotalChange = (e: React.ChangeEvent<HTMLInputElement>, checklistIdx: number) => {
        if (!isNumber(e.target.value)) return
        setParameters(prev => {
            prev[activeParaIdx].checklists[checklistIdx].total = Number(e.target.value)
            return [...prev]
        })
    }

    const handleShowChecklistControls = (idx: number, force?: boolean) => {

        if (force !== undefined) {
            setParameters(prev => {
                prev[activeParaIdx].checklists[idx].showControls = force
                return [...prev]
            })
            return
        }

        setParameters(prev => {
            prev[activeParaIdx].checklists[idx].showControls = !prev[activeParaIdx].checklists[idx].showControls
            return [...prev]
        })
    }

    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number, option: "scoringCriterion" | "imageSample" | "evidenceUpload") => {

        const checked: boolean = e.target.checked

        setParameters(prev => {

            switch (option) {
                case "scoringCriterion":
                    prev[activeParaIdx].checklists[idx].scoringCriterion = checked ? [""] : null
                    break
                case "imageSample":
                    prev[activeParaIdx].checklists[idx].imageSample = checked ? "" : null
                    break
                case "evidenceUpload":
                    prev[activeParaIdx].checklists[idx].evidenceUpload = checked
            }

            return [...prev]
        })

    }

    const handleAddScoringCriterion = (idx: number) => {
        setParameters(prev => {
            if (prev[activeParaIdx].checklists[idx].scoringCriterion) {
                prev[activeParaIdx].checklists[idx].scoringCriterion.push("")
            }
            return [...prev]
        })
    }

    const handleIdealRequirementChange = (idx: number, idealRequirement: string) => {
        setParameters(prev => {
            prev[activeParaIdx].checklists[idx].idealRequirement = idealRequirement
            return [...prev]
        })
    }

    const handleRemoveScoringCriterion = (idx: number, idxx: number) => {
        setParameters(prev => {
            if (prev[activeParaIdx].checklists[idx].scoringCriterion) {
                prev[activeParaIdx].checklists[idx].scoringCriterion.splice(idxx, 1)
            }
            return [...prev]
        })
    }

    const handleChangeScoringCriterion = (e: React.ChangeEvent<HTMLInputElement>, idx: number, idxx: number) => {
        setParameters(prev => {
            if (prev[activeParaIdx].checklists[idx].scoringCriterion) {
                prev[activeParaIdx].checklists[idx].scoringCriterion[idxx] = e.target.value
            }
            return [...prev]
        })
    }
    const handleChangeSampleInputSrc = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {

        const file = e.target.files?.[0];
        if (file) {
            const [ok, requiredFileType] = isAcceptableFileType(file.type, imageFileType)

            if (!ok) {
                toast.warning(`Please upload ${requiredFileType} file`);
                return
            }

            const url = URL.createObjectURL(file);

            // Save to checklist (depends on how you're managing state)
            // Example if checklist is stateful:

            setParameters(prev => {
                prev[activeParaIdx].checklists[idx].imageSample = url
                return [...prev]
            })
        }
    }

    const handleChecklistEvidenceCountChange = (e: React.ChangeEvent<HTMLSelectElement>, idx: number) => {
        setParameters(prev => {
            prev[activeParaIdx].checklists[idx].evidenceCount = Number(e.target.value)
            return [...prev]
        })
    }

    const handleChecklistEvidenceTypeChange = (e: React.ChangeEvent<HTMLSelectElement>, idx: number) => {
        setParameters(prev => {
            prev[activeParaIdx].checklists[idx].evidenceType = e.target.value
            return [...prev]
        })
    }

    const handleChecklistEvidenceMandateChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        setParameters(prev => {
            prev[activeParaIdx].checklists[idx].evidenceMandate = e.target.checked
            return [...prev]
        })
    }
    const handleChecklistEvidenceLiveCaptureChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        setParameters(prev => {
            prev[activeParaIdx].checklists[idx].evidenceLiveCapture = e.target.checked
            return [...prev]
        })
    }

    const handleSetChecklistScoring = (checklistIdx: number) => {
        setScoringChecklistIdx(checklistIdx)
    }

    const setChecklistOptionsType = async (type: "Boolean" | "Custom") => {

        const checklistIdx: number = scoringChecklistIdx ?? -1

        if (checklistIdx < 0) return

        if (parameters[activeParaIdx].checklists[checklistIdx].optionsType !== "Boolean"
            && parameters[activeParaIdx].checklists[checklistIdx].options.length > 0
        ) {

            const confirmed: boolean = await showSwitchWarningAlert()
            if (!confirmed) return
        }

        setParameters(prev => {

            let options: checklistOptions[] = []

            if (type === "Boolean") {
                options = [{
                    key: "Yes",
                    value: prev[activeParaIdx].checklists[checklistIdx].total
                },
                {
                    key: "No",
                    value: 0
                }]

            }
            prev[activeParaIdx].checklists[checklistIdx].optionsType = type
            prev[activeParaIdx].checklists[checklistIdx].options = options
            return [...prev]
        })
    }



    const handelChecklistScoringAddOption = () => {
        const checklistIdx: number = scoringChecklistIdx ?? -1
        if (checklistIdx < 0) return

        setParameters(prev => {
            prev[activeParaIdx].checklists[checklistIdx].options.push({ key: "", value: 0 })
            return [...prev]
        })
    }


    const handelChecklistScoringRemove = (idx: number) => {
        const checklistIdx: number = scoringChecklistIdx ?? -1
        if (checklistIdx < 0) return

        setParameters(prev => {
            prev[activeParaIdx].checklists[checklistIdx].options.splice(idx, 1)
            return [...prev]
        })
    }

    const handelChecklistScoringKeyChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        const checklistIdx: number = scoringChecklistIdx ?? -1
        if (checklistIdx < 0) return

        setParameters(prev => {
            prev[activeParaIdx].checklists[checklistIdx].options[idx].key = e.target.value
            return [...prev]
        })
    }

    const handelChecklistScoringValueChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        const checklistIdx: number = scoringChecklistIdx ?? -1
        if (checklistIdx < 0 || !isNumber(e.target.value)) return

        const optionScore: number = Number(e.target.value)

        if (optionScore > parameters[activeParaIdx].checklists[checklistIdx].total) {
            toast.warning("Options value can not be more than checklist total score")
            return
        }

        setParameters(prev => {
            prev[activeParaIdx].checklists[checklistIdx].options[idx].value = optionScore
            return [...prev]
        })
    }

    if (loading) return <Loading />

    return (
        <Sidebar>
            <div className='w-full flex justify-between text-black pt-3 pb-4'>

                <div className="flex text-slate-500 text-base font-medium p-2 min-w-[190px] max-w-[220px]"
                    style={
                        !parameterTotal ? { // IF PARAMETER SCORE IS 0
                            borderLeftWidth: '4px',
                            borderLeftColor: '#cbd5e1',
                            backgroundColor: 'white',
                        } : parameterTotal === evrTotal ? { // IF PARAMETER SCORE MATCHED TOTAL
                            backgroundColor: '#f8fffb',
                            borderLeftWidth: '4px',
                            borderLeftColor: '#10b981',
                        } : parameterTotal > evrTotal ? { // IF PARAMETER SCORE IS MORE THAN TOTAL
                            backgroundColor: '#fef2f2',
                            borderLeftWidth: '4px',
                            borderLeftColor: '#ef4444',
                        } : { // IS PARAMETER SCORE IS NOT 0 BUT NOT EQUAL TO THE TOTAL (PENDING)
                            backgroundColor: '#fffbeb',
                            borderLeftWidth: '4px',
                            borderLeftColor: '#f59e0b',
                        }
                    }>
                    <span className='me-4 font-bold'>EVR From</span>
                    <span>
                        {parameterTotal}
                    </span>
                    <span className='mx-2'>/</span>
                    <span className='font-bold'>
                        {evrTotal}
                    </span>
                </div>

                <div>

                    <Button
                        size="sm"
                        className='rounded-sm flex items-center'
                        onClick={handleAddParameter}
                    >
                        <Plus className='me-1' size={21} />
                        Add Parameter ( {parameters.length} )
                    </Button>

                </div>
            </div>
            <div className="w-full overflow-x-auto">
                <div className="flex shadow-sm">
                    {parameters.map((parameter, idx) => {
                        const parameterChecklistTotal: number = parameter.checklists.reduce((prev, curr) => prev + curr.total, 0)

                        const parameterStatusStyle = !parameterChecklistTotal ? { // IF CHECKLIST SCORE IS 0
                            borderLeftColor: '#cbd5e1',
                            backgroundColor: 'white',
                        } : parameterChecklistTotal === parameter.total && parameter.name ? { // IF CHECKLIST SCORE MATCHED TOTAL
                            backgroundColor: '#f8fffb',
                            borderLeftColor: '#10b981',
                        } : { // IS CHECKLIST SCORE IS NOT 0 BUT NOT EQUAL TO THE TOTAL (PENDING)
                            backgroundColor: '#fffbeb',
                            borderLeftColor: '#f59e0b',
                        }

                        const parameterActiveClass = parameterChecklistTotal > parameter.total ? { // IF CHECKLIST SCORE IS MORE THAN TOTAL
                            backgroundColor: '#fef2f2',
                            borderLeftColor: '#ef4444',
                        } : activeParaIdx === idx ? {
                            borderLeftColor: '#0ea5e9',   // sky-500
                            backgroundColor: '#f7fcff',
                        } : {}

                        return <div
                            key={`parameter_${idx}`}
                            className="relative px-4 pb-12 text-center text-black border-r border-gray-100 last:border-r-0 min-w-[190px] max-w-[220px] overflow-hidden cursor-pointer"
                            style={{ ...parameterStatusStyle, borderLeftWidth: '4px', ...parameterActiveClass }}
                            onClick={() => {
                                handleActiveParameterChange(idx)
                                handleShowParameterControls(idx, false)
                            }}
                        >

                            <div className='relative w-full mb-1'>

                                <div className='w-full flex justify-between items-center'>
                                    <MoreHorizontal
                                        className='cursor-pointer'
                                        onClick={e => {
                                            e.stopPropagation()
                                            handleShowParameterControls(idx)
                                        }}
                                    />
                                    <span className='text-xs font-semibold'>({parameters[idx].checklists.length})</span>
                                </div>

                                {parameter.showControls && (
                                    <div
                                        className="absolute right-0 mt-2 w-40 rounded-xs border bg-white shadow-lg p-3 z-50 text-xs"
                                        onClick={e => e.stopPropagation()}
                                    >

                                        <div className='w-full -mt-3 mb-2.5 flex justify-between items-center'>
                                            <span className='font-bold mt-1'>Parameter Control</span>
                                            <button
                                                type="button"
                                                className="text-gray-500 hover:text-red-500 font-bold text-lg cursor-pointer"
                                                onClick={() => handleShowParameterControls(idx)}
                                            >
                                                ×
                                            </button>
                                        </div>

                                        <button
                                            type="button"
                                            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold rounded flex justify-center items-center gap-2 mt-2 py-2 cursor-pointer"
                                            onClick={() => handleDeleteParameter(idx)}
                                        >
                                            <Trash2 size={14} />
                                            Delete Parameter
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Top text */}
                            < div className="text-[14px] mb-2 font-medium tracking-wide" >
                                <CustomTextarea
                                    style={{ borderRadius: "0.125rem" }}
                                    className="border border-slate-700"
                                    placeholder="Enter parameter..."
                                    value={parameter.name}
                                    onChange={e => handleParameterChange(e, idx)}
                                />
                            </div>


                            {/* Bottom progress (absolute) */}
                            <div className="absolute bottom-0 left-0 w-full px-4 pb-3">
                                <div className="w-full bg-gray-200 h-1.5 mb-1">
                                    <div
                                        className="h-1.5 transition-all duration-300"
                                        style={{
                                            width: `${(parameterChecklistTotal / parameter.total) * 100}%`,
                                            backgroundColor: '#003366',
                                        }}
                                    />
                                </div>
                                <div className="flex justify-center align-center text-sm text-slate-500 font-medium">

                                    <span className='mt-1'>
                                        {parameterChecklistTotal}
                                    </span>
                                    <span className='mt-1 mx-2'>/</span>
                                    <div className='w-11'>
                                        <CustomNumberInput
                                            type="number"
                                            placeholder='total...'
                                            className='border border-slate-700 rounded-xs font-bold'
                                            value={parameter.total || ""}
                                            onChange={e => handleParameterTotalChange(e, idx)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div >

            {Boolean(parameters[activeParaIdx]) && (

                <div className='w-full flex justify-end py-4'>
                    <Button
                        size="xs"
                        className='rounded-sm flex items-center'
                        onClick={handleAddChecklist}
                    >
                        <Plus className='me-1' size={18} />
                        Add Checklist ({parameters[activeParaIdx].checklists.length})
                    </Button>
                </div>
            )}

            {parameters[activeParaIdx]?.checklists?.map((checklist, idx) => {

                const { notStarted, isCompleted, maxOptions, total } = checklistValidation(checklist)


                const checklistStatusStyle = notStarted ? { // IF CHECKLIST SCORE IS 0
                    borderLeftColor: '#cbd5e1',
                } : isCompleted ? { // IF CHECKLIST SCORE MATCHED TOTAL
                    borderLeftColor: '#10b981',
                } : maxOptions > total ? { // IF CHECKLIST SCORE IS MORE THAN TOTAL
                    borderLeftColor: '#ef4444',
                } : { // IS CHECKLIST SCORE IS NOT 0 BUT NOT EQUAL TO THE TOTAL (PENDING)
                    borderLeftColor: '#f59e0b',
                }

                return (<div
                    className="bg-white rounded-sm border border-[#cbd5e1] text-xs shadow-md mb-2"
                    key={`checklist_${idx}`}
                    onClick={() => handleShowChecklistControls(idx, false)}
                >
                    {/* Header */}
                    <div className="p-2 border-b border-[#cbd5e1] flex items-center justify-between cursor-pointer"
                        onClick={() => handleChecklistExpand(idx)}
                        style={{ ...checklistStatusStyle, borderLeftWidth: '4px' }}
                    >
                        <div className="flex items-center gap-2 w-9/12 md:w-10/12 lg:w-11/12">
                            <h2 className={`text-[13.5px] ${disabledText}`}>{activeParaIdx + 1}.{idx + 1}</h2>
                            <div
                                className='w-full'
                                onClick={e => e.stopPropagation()}
                            >
                                <CustomInput
                                    type='text'
                                    className='w-full border border-slate-700 rounded-xs'
                                    value={checklist.name}
                                    onChange={(e) => handleChecklistChange(e, idx)}
                                />
                            </div>
                        </div>

                        <div className='flex w-3/12 md:w-2/12 lg:w-1/12'>

                            <div
                                className="flex items-center gap-2 px-2 py-1"
                                onClick={e => e.stopPropagation()}
                            >
                                <CustomNumberInput
                                    type="number"
                                    placeholder='total...'
                                    className='border border-slate-700 rounded-xs font-medium'
                                    value={checklist.total || ""}
                                    onChange={(e) => handleChecklistTotalChange(e, idx)}
                                />
                            </div>
                            <div className={`flex items-center gap-1 px-2 py-1 ${disabledText}`}>
                                {checklist.expand ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </div>
                        </div>
                    </div>

                    {
                        checklist.expand && (
                            <div
                                className="p-4 space-y-4"
                                style={{ ...checklistStatusStyle, borderLeftWidth: '4px' }}
                            >

                                <div className='relative w-full text-black -my-1 flex justify-end'>
                                    <MoreHorizontal
                                        className='cursor-pointer'
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleShowChecklistControls(idx)
                                        }}
                                    />
                                    {checklist.showControls && (
                                        <div className="absolute right-0 w-48 rounded-xs border bg-white shadow-lg p-3 z-50"
                                            onClick={e => e.stopPropagation()}
                                        >

                                            <div className='w-full -mt-3 mb-2.5 flex justify-between items-center'>
                                                <span className='font-bold mt-1'>Checklist Control</span>
                                                <button
                                                    type="button"
                                                    className="text-gray-500 hover:text-red-500 font-bold text-lg cursor-pointer"
                                                    onClick={() => handleShowChecklistControls(idx)}
                                                >
                                                    ×
                                                </button>
                                            </div>

                                            <div className='flex w-full justify-between'>

                                                <label className="flex items-center space-x-2 ">
                                                    <input
                                                        type="checkbox"
                                                        className='w-4 h-4 rounded-sm border-2 accent-[#1e293b] cursor-pointer'
                                                        onChange={(e) => handleOptionChange(e, idx, "scoringCriterion")}
                                                        checked={checklist.scoringCriterion !== null}
                                                    />
                                                    <span>Scoring Criterion</span>
                                                </label>
                                                <button
                                                    type="button"
                                                    className="text-gray-500 hover:text-blue-500 text-lg font-bold cursor-pointer"
                                                    onClick={() => handleAddScoringCriterion(idx)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <label className="flex items-center space-x-2 mt-1.5">
                                                <input
                                                    type="checkbox"
                                                    className='w-4 h-4 rounded-sm border-2 accent-[#1e293b] cursor-pointer'
                                                    onChange={(e) => handleOptionChange(e, idx, "imageSample")}
                                                    checked={checklist.imageSample !== null}
                                                />
                                                <span>Sample Image</span>
                                            </label>
                                            <label className="flex items-center space-x-2 mt-3">
                                                <input
                                                    type="checkbox"
                                                    className='w-4 h-4 rounded-sm border-2 accent-[#1e293b] cursor-pointer'
                                                    onChange={(e) => handleOptionChange(e, idx, "evidenceUpload")}
                                                    checked={checklist.evidenceUpload}
                                                />
                                                <span>Evidence Upload</span>
                                            </label>

                                            <button
                                                type="button"
                                                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold rounded flex justify-center items-center gap-2 mt-2 py-2 cursor-pointer"
                                                onClick={() => handleChecklistDelete(idx)}
                                            >
                                                <Trash2 size={14} />
                                                Delete Checklist
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Requirement & Criteria */}
                                <div className={`grid gap-4 items-stretch ${checklist.idealRequirement !== null && checklist.scoringCriterion !== null
                                    ? "grid-cols-1 md:grid-cols-2"
                                    : "grid-cols-1"
                                    }`}
                                >

                                    <div className="flex flex-col space-y-2">
                                        <h3 className={`font-medium text-[13.5px] ${disabledText}`}>
                                            Ideal Requirement:
                                        </h3>
                                        <div
                                            contentEditable={true} // Makes the div editable
                                            className={`rounded-sm p-3 text-xs overflow-y-auto flex-1 leading-relaxed bg-gradient-to-br from-slate-50 to-slate-100 text-slate-600 border border-[#cbd5e1]`}
                                            data-placeholder="Enter Ideal Requirement for the checklist.." // Optional, custom implementation needed for placeholder
                                            onInput={(e) => handleIdealRequirementChange(idx, e.currentTarget.textContent)}
                                        ></div>
                                    </div>


                                    {Boolean(checklist.scoringCriterion !== null) && (
                                        <div className="flex flex-col space-y-2">
                                            <h3 className={`font-medium text-[13.5px] ${disabledText}`}>Scoring Criteria:</h3>
                                            <div className={`rounded-sm p-3 text-xs overflow-y-auto flex-1 leading-relaxed bg-gradient-to-br from-slate-50 to-slate-100 text-slate-600 border border-[#cbd5e1]`}>

                                                <ul className="pl-0 space-y-2 w-full">
                                                    {checklist.scoringCriterion?.map((sc, idxx) => (
                                                        <li
                                                            key={`sc_${idx}_${idxx}`}
                                                            className="w-full bg-gradient-to-br from-slate-50 to-slate-100 rounded grid grid-cols-[auto_1fr] items-center gap-2"
                                                        >
                                                            {/* Cross button */}
                                                            <button
                                                                type="button"
                                                                className="text-gray-500 hover:text-red-500 text-lg font-bold cursor-pointer"
                                                                onClick={() => handleRemoveScoringCriterion(idx, idxx)}
                                                            >
                                                                ×
                                                            </button>

                                                            {/* CustomInput */}
                                                            <CustomInput
                                                                type="text"
                                                                className="w-full bg-white border border-slate-700 rounded-xs px-2 py-1 text-xs"
                                                                value={sc}
                                                                onChange={(e) => handleChangeScoringCriterion(e, idx, idxx)}
                                                            />
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-wrap -mx-2">
                                    {/* negative margin to offset inner padding */}

                                    {checklist.imageSample !== null && (
                                        <div className="px-2 w-1/2 md:w-1/2 lg:w-1/4 space-y-2 mb-2.5">
                                            <h3 className={`font-medium text-[13.5px] ${disabledText}`}>Sample Image</h3>
                                            <div className={`p-2 rounded-sm bg-gradient-to-br from-white to-slate-50 ${disabledBorder}`}>

                                                <div className={`h-10 flex items-center gap-2 text-xs cursor-pointer transition-colors ${disabledText}`}>
                                                    <div className="w-10 h-10 border border-[#cbd5e1] rounded flex items-center justify-center text-xs text-slate-600 cursor-pointer transition-colors">
                                                        {(!checklist.imageSample) ? (
                                                            <Upload className="w-4 h-4"
                                                                onClick={() => refs.current[activeParaIdx][idx]?.click()}
                                                            />
                                                        ) : (<img
                                                            className='w-full h-full rounded'
                                                            onClick={() => setImgSampleChecklistIdx(idx)}
                                                            src={checklist.imageSample || undefined}
                                                        />)}
                                                    </div>

                                                    <input
                                                        type="file"
                                                        className='hidden'
                                                        accept='image/*'
                                                        ref={(ref) => {
                                                            if (!refs.current[activeParaIdx]) {
                                                                refs.current[activeParaIdx] = []
                                                            }
                                                            refs.current[activeParaIdx][idx] = ref
                                                        }}
                                                        onChange={e => handleChangeSampleInputSrc(e, idx)}
                                                    />

                                                    Upload Sample
                                                </div>
                                            </div>



                                            {/* 
                                            <div className={`flex p-2 rounded items-center gap-3 bg-gradient-to-br from-white to-slate-50 ${disabledBorder}`}>

                                           

                                                <h3 className={`font-base text-xs ${disabledText}`}></h3>
                                            </div> */}
                                        </div>
                                    )}

                                    {checklist.evidenceUpload && (
                                        <div className="px-2 w-1/2 md:w-1/2 lg:w-1/4 space-y-2 mb-2.5">
                                            <h3 className={`font-medium text-[13.5px] ${disabledText}`}>Evidence Count</h3>
                                            <select
                                                className={`w-full h-14 px-3 py-2 rounded-sm text-xs focus:outline-none transition-all bg-white bg-gradient-to-br from-white to-slate-50 ${disabledBorder} ${disabledText}`}
                                                value={checklist.evidenceCount || ""}
                                                onChange={e => handleChecklistEvidenceCountChange(e, idx)}
                                            >
                                                <option value="">Select</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>
                                        </div>
                                    )}

                                    {checklist.evidenceUpload && (
                                        <div className="px-2 w-1/2 md:w-1/2 lg:w-1/4 space-y-2 mb-2.5">
                                            <h3 className={`font-medium text-[13.5px] ${disabledText}`}>Evidence Type</h3>
                                            <select
                                                className={`w-full h-14 px-3 py-2 rounded-sm text-xs focus:outline-none transition-all bg-white bg-gradient-to-br from-white to-slate-50 ${disabledBorder} ${disabledText}`}
                                                value={checklist.evidenceType || ""}
                                                onChange={e => handleChecklistEvidenceTypeChange(e, idx)}
                                            >
                                                <option value="">Select</option>
                                                {allFileTypes.map((typ, idxx) => (
                                                    <option value={typ} key={`fileType_${idx}_${idxx}`}>{typ}</option>
                                                ))}
                                            </select>
                                        </div>
                                    )}


                                    {checklist.evidenceUpload && (
                                        <div className="px-2 w-1/2 md:w-1/2 lg:w-1/4 space-y-2 mb-2.5">
                                            <h3 className={`font-medium text-[13.5px] ${disabledText}`}>Evidence Mandatory:</h3>
                                            <div className={`p-2 rounded-sm bg-gradient-to-br from-white to-slate-50 ${disabledBorder}`}>
                                                <label className={`h-10 flex items-center gap-2 text-xs cursor-pointer transition-colors ${disabledText}`}>
                                                    <input
                                                        type="checkbox"
                                                        className="w-4 h-4 rounded-sm border-2 accent-[#1e293b] cursor-pointer"
                                                        checked={checklist.evidenceMandate}
                                                        onChange={e => handleChecklistEvidenceMandateChange(e, idx)}
                                                    />
                                                    *If Required
                                                </label>
                                            </div>
                                        </div>
                                    )}

                                    {checklist.evidenceUpload && (
                                        <div className="px-2 w-1/2 md:w-1/2 lg:w-1/4 space-y-2 mb-2.5">
                                            <h3 className={`font-medium text-[13.5px] ${disabledText}`}>Evidence Live Capture:</h3>
                                            <div className={`p-2 rounded-sm bg-gradient-to-br from-white to-slate-50 ${disabledBorder}`}>
                                                <label className={`h-10 flex items-center gap-2 text-xs cursor-pointer transition-colors ${disabledText}`}>
                                                    <input
                                                        type="checkbox"
                                                        className="w-4 h-4 rounded-sm border-2 accent-[#1e293b] cursor-pointer"
                                                        checked={checklist.evidenceLiveCapture}
                                                        onChange={e => handleChecklistEvidenceLiveCaptureChange(e, idx)}
                                                    />
                                                    *Restrict Gallery Upload
                                                </label>
                                            </div>
                                        </div>
                                    )}



                                    <div className="px-2 w-full md:w-full lg:w-1/2 space-y-2 mb-2.5">
                                        <h3 className={`font-medium text-[13.5px] ${disabledText}`}>Score:</h3>
                                        <div className="flex h-14">
                                            <div className="w-5/6">
                                                <select
                                                    className={`w-full h-full px-3 py-2 rounded-l-sm text-xs focus:outline-none transition-all bg-white bg-gradient-to-br from-white to-slate-50 ${disabledBorder} ${disabledText}`}
                                                >
                                                    <option value="">{checklist.optionsType} Select Options</option>
                                                    {checklist.options.map((opt, idx) => (
                                                        <option key={`option_${checklist.id}_${idx}`} value={opt.value}>
                                                            {opt.key}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <Button
                                                size="custom"
                                                className='rounded-none rounded-e-sm h-full px-3 text-sm'
                                                onClick={() => handleSetChecklistScoring(idx)}
                                            >
                                                Edit
                                            </Button>
                                        </div>
                                    </div>

                                </div>


                            </div>
                        )
                    }
                </div>)
            }) ?? null}


            {
                (() => {

                    if (!scoringChecklistIdx) return null

                    const checklist: checklistCreation = parameters[activeParaIdx].checklists[scoringChecklistIdx]

                    return <Modal
                        isVisible={true}
                        size="xl"
                        header={<ModalHeader
                            title={`${checklist.name} Scoring, Total Score: ${checklist.total}`}
                            onClose={() => setScoringChecklistIdx(null)}
                        />}
                    // footer={<button className="btn">Save</button>}
                    // stickyFooter
                    >

                        <div className="w-full mx-auto relative border-green-900 p-2 ">
                            <div className="relative flex rounded-md overflow-hidden bg-gray-100 p-1">
                                {/* Sliding active background */}
                                <div
                                    className={`absolute top-0 left-0 h-full w-1/2 bg-[#003366] rounded-sm shadow-lg
        transform transition-all duration-300 ease-in-out
        ${checklist.optionsType === "Custom" ? "translate-x-0" : "translate-x-full"}
      `}
                                />

                                {/* Custom button */}
                                <button
                                    onClick={() => setChecklistOptionsType("Custom")}
                                    className={`flex-1 py-3 font-medium relative z-10 text-center
        transition-colors duration-300 ease-in-out
        ${checklist.optionsType === "Custom" ? "text-white" : "text-gray-700"}
      `}
                                >
                                    Custom
                                </button>

                                {/* Boolean button */}
                                <button
                                    onClick={() => setChecklistOptionsType("Boolean")}
                                    className={`flex-1 py-3 font-medium relative z-10 text-center
        transition-colors duration-300 ease-in-out
        ${checklist.optionsType === "Boolean" ? "text-white" : "text-gray-700"}
      `}
                                >
                                    Boolean
                                </button>


                            </div>


                            <div className='w-full flex justify-end py-4'>
                                <Button
                                    size="xs"
                                    className='rounded-sm'
                                    onClick={handelChecklistScoringAddOption}
                                >
                                    Add Option
                                </Button>
                            </div>
                            <div className="w-full mx-auto space-y-3 text-black">

                                <CustomTableWrapper className='rounded-xs'>
                                    <CustomTable className='border-none shadow-none'>

                                        <CustomThead>
                                            <tr>
                                                <CustomTh partition={false}>Key</CustomTh>
                                                <CustomTh partition={false}>Value</CustomTh>
                                                <CustomTh partition={false} className="text-center">Action</CustomTh>
                                            </tr>
                                        </CustomThead>
                                        <tbody>
                                            {checklist.options.map((option, idx) => (
                                                <CustomTr key={idx} index={idx}>
                                                    <CustomTd partition={false}>
                                                        <CustomInput
                                                            type="text"
                                                            placeholder="Key"
                                                            value={option.key}
                                                            onChange={e => handelChecklistScoringKeyChange(e, idx)}
                                                        />

                                                    </CustomTd>
                                                    <CustomTd partition={false}>
                                                        <CustomNumberInput
                                                            type="text"
                                                            placeholder="Key"
                                                            value={option.value}
                                                            onChange={e => handelChecklistScoringValueChange(e, idx)}
                                                        />
                                                    </CustomTd>
                                                    <CustomTd partition={false} className="text-center">
                                                        <button
                                                            onClick={() => handelChecklistScoringRemove(idx)}
                                                            className="p-2 rounded-md hover:bg-red-100 text-red-600"
                                                        >
                                                            <X size={18} />
                                                        </button>
                                                    </CustomTd>
                                                </CustomTr>
                                            ))}
                                        </tbody>
                                    </CustomTable>
                                </CustomTableWrapper>

                            </div>
                        </div>
                    </Modal >
                })()
            }


            {
                (() => {
                    if (!imgSampleChecklistIdx) return null

                    const checklist = parameters[activeParaIdx].checklists[imgSampleChecklistIdx]


                    return <Modal
                        isVisible={true}
                        size="xl"
                        header={<ModalHeader
                            title={`${checklist.name} Sample Preview`}
                            onClose={() => setImgSampleChecklistIdx(null)}
                        />}
                    >
                        hello world

                    </Modal >
                })()
            }

        </Sidebar >
    );
};

export default EvrFormCreation;