import Sidebar from '@/components/sidebar';
import { useState } from 'react';

import type { checklist, checklistOptions } from '@/components/evr/types';
import Loading from '@/components/loading';
import { CustomInput, CustomNumberInput, CustomTextarea } from '@/components/form';
import { Button } from '@/components/button';
import { ChevronDown, ChevronUp, Upload } from 'lucide-react';



export interface checklistCreation {
    id: number
    name: string
    total: number;
    idealRequirement: string
    scoringCriterion: string[]
    imageSample?: string
    evidences: null[]
    evidenceMandate: true
    evidenceType: string
    options: checklistOptions[]
    expand: boolean,
    liveCapture: boolean,
}


export interface parameterCreation {
    id?: number;
    name: string;
    total: number;
    checklists: checklistCreation[],
}

const EvrFormCreation: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false)

    const ch1: checklistCreation = {
        id: 3,
        name: "Politeness & courtesy",
        total: 5,
        idealRequirement: `The service provider must demonstrate professional behavior, 
        maintain courtesy in all interactions, and ensure timely communication with stakeholders throughout the project lifecycle.`,
        scoringCriterion: [
            "Professional communication maintained in all project correspondence",
            "Timely responses to queries and requests (within 24 hours)",
            "Respectful behavior demonstrated during meetings and interactions",
        ],
        imageSample: "https://c7.alamy.com/comp/2XXE0DN/shoe-variety-for-sale-at-shopping-mall-shop-from-flat-angle-image-is-taken-at-zudio-shopping-mall-jodhpur-rajasthan-india-on-july-20-2024-2XXE0DN.jpg",
        evidences: [null, null, null],
        evidenceMandate: true,
        evidenceType: "image/*",
        options: [{ key: "No", value: 0 }, { key: "Yes", value: 5 }],


        expand: false,
        liveCapture: true,
    }

    const arr = []
    for (let i = 0; i <= 10; i++) {
        arr.push({ ...ch1 })
    }



    const evrTotal: number = 100

    const [parameters, setParameters] = useState<parameterCreation[]>([
        { id: 1, name: 'XYZ', total: 10, checklists: [{ ...ch1 }] },
        { id: 1, name: 'AAAAAAAAAA BBBBBBBBB CCCCCCCCCC', total: 10, checklists: [] },
        { id: 1, name: 'SSSSSSSSSSS QQQQQQQQQ', total: 10, checklists: [] },
        { id: 1, name: 'WWWWWWWWWWWW FFFFFFFFFFF', total: 10, checklists: [{ ...ch1 }, { ...ch1 }] },
        { id: 1, name: 'VVVVVVVVVVVVV DDDDDDDDDD', total: 10, checklists: [] }
    ]);
    const parameterTotal: number = parameters.reduce((prev, curr) => prev + curr.total, 0)


    const handleParameterChange = (e: React.ChangeEvent<HTMLTextAreaElement>, paraIdx: number) => {
        setParameters(prev => {
            prev[paraIdx].name = e.target.value
            return [...prev]
        })
    }

    const handleParameterTotalChange = (e: React.ChangeEvent<HTMLInputElement>, paraIdx: number) => {
        setParameters(prev => {
            prev[paraIdx].total = Number(e.target.value)
            return [...prev]
        })
    }

    // CHECKLIST FUNC

    const activeParameterIndex: number = 3

    const disabledBorder: string = "border border-slate-700"
    const disabledText: string = "text-slate-800"

    const handleChecklistExpand = (checklistIdx: number) => {

        setParameters(prev => {
            prev[activeParameterIndex].checklists[checklistIdx].expand = !prev[activeParameterIndex].checklists[checklistIdx].expand
            return [...prev]
        })
    }

    const handleChecklistChange = (e: React.ChangeEvent<HTMLInputElement>, checklistIdx: number) => {
        setParameters(prev => {
            prev[activeParameterIndex].checklists[checklistIdx].name = e.target.value
            return [...prev]
        })
    }

    const handleChecklistTotalChange = (e: React.ChangeEvent<HTMLInputElement>, checklistIdx: number) => {
        setParameters(prev => {
            prev[activeParameterIndex].checklists[checklistIdx].total = Number(e.target.value)
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
                        className='rounded-sm'
                    >
                        Add Parameter
                    </Button>

                </div>
            </div>
            <div className="w-full overflow-x-auto">

                <div className="flex shadow-sm">
                    {parameters.map((parameter, idx) => {
                        const parameterChecklistTotal: number = parameter.checklists.reduce((prev, curr) => prev + curr.total, 0)
                        return <div
                            key={`parameter_${idx}`}
                            className="relative px-4 pt-6 pb-12 text-center text-black border-r border-gray-100 last:border-r-0 min-w-[190px] max-w-[220px] overflow-hidden"
                            style={
                                !parameterChecklistTotal ? { // IF CHECKLIST SCORE IS 0
                                    borderLeftWidth: '4px',
                                    borderLeftColor: '#cbd5e1',
                                    backgroundColor: 'white',
                                } : parameterChecklistTotal === parameter.total ? { // IF CHECKLIST SCORE MATCHED TOTAL
                                    backgroundColor: '#f8fffb',
                                    borderLeftWidth: '4px',
                                    borderLeftColor: '#10b981',
                                } : parameterChecklistTotal > parameter.total ? { // IF CHECKLIST SCORE IS MORE THAN TOTAL
                                    backgroundColor: '#fef2f2',
                                    borderLeftWidth: '4px',
                                    borderLeftColor: '#ef4444',
                                } : { // IS CHECKLIST SCORE IS NOT 0 BUT NOT EQUAL TO THE TOTAL (PENDING)
                                    backgroundColor: '#fffbeb',
                                    borderLeftWidth: '4px',
                                    borderLeftColor: '#f59e0b',
                                }
                            }
                        >
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



            <div className='w-full flex justify-end py-4'>
                <Button
                    size="xs"
                    className='rounded-sm'
                >
                    Add Checklist
                </Button>
            </div>



            {parameters?.[activeParameterIndex].checklists.map((checklist, idx) => (
                <div
                    className="bg-white rounded-sm border border-[#cbd5e1] text-xs shadow-md mb-2"
                    key={`checklist_${idx}`}
                >
                    {/* Header */}
                    <div className="p-2 border-b border-[#cbd5e1] flex items-center justify-between cursor-pointer"
                        onClick={() => handleChecklistExpand(idx)}
                        style={
                            // checklist.completed ? {
                            //     backgroundColor: '#f8fffb',
                            //     borderLeftWidth: '4px',
                            //     borderLeftColor: '#10b981',
                            // } :
                            {
                                borderLeftWidth: '4px',
                                borderLeftColor: '#cbd5e1',
                            }
                        }
                    >
                        <div className="flex items-center gap-2 w-9/12 md:w-10/12 lg:w-11/12">
                            <h2 className={`text-[13.5px] ${disabledText}`}>{activeParameterIndex + 1}.{idx + 1}</h2>
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
                            <div className="p-4 space-y-4"
                                style={
                                    // checklist.completed ? {
                                    //     borderLeftWidth: '4px',
                                    //     borderLeftColor: '#10b981',
                                    // } : 
                                    {
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
                                                            <Upload
                                                                className="w-4 h-4"
                                                            // onClick={() => }
                                                            />


                                                            {/* < input
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
                                                            /> */}
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
                                            // value={checklist.recived}
                                            // onChange={handleScoreChange}
                                            // disabled={checklist.disabled}
                                            >
                                                <option value="">Select</option>
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
                                                        // disabled={checklist.disabled}
                                                        type="checkbox"
                                                        // checked={checklist.isImprovementPoint}
                                                        // onChange={handleAddImprovement}
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
                                            className={disabledBorder}
                                            // disabled={checklist.disabled}
                                            placeholder="Enter remarks..."
                                        // value={remark}
                                        // onChange={handleRemarkChange}
                                        // onBlur={handleRemarkChangeDone}
                                        />
                                    </div>
                                </div>

                            </div>
                        )
                    }
                </div>

            ))
            }
        </Sidebar >
    );
};

export default EvrFormCreation;