import Sidebar from '@/components/sidebar';
import { useState } from 'react';

import type { checklistOptions } from '@/components/evr/types';
import Loading from '@/components/loading';
import { CustomInput, CustomNumberInput, CustomTextarea } from '@/components/form';
import { Button } from '@/components/button';
import { ChevronDown, ChevronUp, Upload } from 'lucide-react';
import Modal, { ModalHeader } from '@/components/modals';



export interface checklistCreation {
    id?: number
    name: string
    total: number;
    idealRequirement: null | string
    scoringCriterion: null | string[]
    imageSample: null | string
    evidences: null | null[]
    evidenceMandate: true
    evidenceType: string
    options: checklistOptions[]
    optionsType: null | "bool" | "custom"
    expand: boolean,
    liveCapture: boolean,
}

export interface parameterCreation {
    id?: number;
    name: string;
    total: number;
    checklists: checklistCreation[],
}

export interface checklistCreationScoring {
    checklistIdx: number
    checklist: checklistCreation
}
const EvrFormCreation: React.FC = () => {

    const emptyParameter: parameterCreation = {
        name: 'XYZ',
        total: 10,
        checklists: []
    }
    const emptyChecklist: checklistCreation = {
        name: "",
        total: 0,
        idealRequirement: " ",
        scoringCriterion: null,
        imageSample: "",
        evidences: [null, null],
        evidenceMandate: true,
        evidenceType: "image/*",
        options: [{ key: "No", value: 0 }, { key: "Yes", value: 5 }],
        optionsType: null,


        expand: false,
        liveCapture: true,
    }

    const [loading] = useState<boolean>(false)

    const [checklistScoring, setChecklistScoring] = useState<null | checklistCreationScoring>(null)


    const ch1: checklistCreation = {
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
        { id: 0, name: 'XYZ', total: 10, checklists: [{ ...ch1 }] },
        { id: 0, name: 'AAAAAAAAAA BBBBBBBBB CCCCCCCCCC', total: 10, checklists: [] },
        { id: 0, name: 'SSSSSSSSSSS QQQQQQQQQ', total: 10, checklists: [] },
        { id: 0, name: 'WWWWWWWWWWWW FFFFFFFFFFF', total: 10, checklists: [{ ...ch1 }, { ...ch1 }] },
        { id: 0, name: 'VVVVVVVVVVVVV DDDDDDDDDD', total: 10, checklists: [] }
    ]);
    const parameterTotal: number = parameters.reduce((prev, curr) => prev + curr.total, 0)

    const handleAddParameter = () => {
        setParameters(prev => {
            prev.push(structuredClone(emptyParameter))
            return [...prev]
        })
    }

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

    const handleAddChecklist = () => {
        setParameters(prev => {
            prev[activeParaIdx].checklists.push(structuredClone(emptyChecklist))
            return [...prev]

        })

    }

    const activeParaIdx: number = 3

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
        setParameters(prev => {
            prev[activeParaIdx].checklists[checklistIdx].total = Number(e.target.value)
            return [...prev]
        })
    }

    const handleSetChecklistScoring = (checklistIdx: number) => {

        const activeChecklistCreation: checklistCreationScoring = {
            checklistIdx: checklistIdx,
            checklist: parameters[activeParaIdx].checklists[checklistIdx]
        }
        setChecklistScoring(activeChecklistCreation)
    }

    const setChecklistOptionsType = (checklistIdx: number, type: "bool" | "custom") => {
        setParameters(prev => {
            prev[activeParaIdx].checklists[checklistIdx].optionsType = type
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
                        onClick={handleAddParameter}
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
                    onClick={handleAddChecklist}
                >
                    Add Checklist
                </Button>
            </div>



            {parameters[activeParaIdx].checklists.map((checklist, idx) => (
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
                                <div className={`grid gap-4 items-stretch ${checklist.idealRequirement && checklist.scoringCriterion?.length
                                    ? "grid-cols-1 md:grid-cols-2"
                                    : "grid-cols-1"
                                    }`}
                                >
                                    {Boolean(checklist.idealRequirement) && (
                                        <div className="flex flex-col space-y-2">
                                            <h3 className={`font-medium text-[13.5px] ${disabledText}`}>
                                                Ideal Requirement:
                                            </h3>
                                            <div
                                                contentEditable={true} // Makes the div editable
                                                className={`rounded-sm p-3 text-xs overflow-y-auto flex-1 leading-relaxed bg-gradient-to-br from-slate-50 to-slate-100 text-slate-600 border border-[#cbd5e1]`}
                                                data-placeholder="Enter Ideal Requirement for the checklist.." // Optional, custom implementation needed for placeholder
                                                onInput={(e) => {
                                                    console.log(e.currentTarget.textContent); // Handle text changes
                                                }}
                                            ></div>
                                        </div>
                                    )}

                                    {Boolean(checklist.scoringCriterion?.length) && (
                                        <div className="flex flex-col space-y-2">
                                            <h3 className={`font-medium text-[13.5px] ${disabledText}`}>Scoring Criteria:</h3>
                                            <div className={`rounded-sm p-3 text-xs overflow-y-auto flex-1 leading-relaxed bg-gradient-to-br from-slate-50 to-slate-100 text-slate-600 border border-[#cbd5e1]`}>

                                                <ul className="pl-0 space-y-2 w-full">
                                                    {checklist.scoringCriterion?.map((c, i) => (
                                                        <li
                                                            key={i}
                                                            className="w-full bg-gradient-to-br from-slate-50 to-slate-100 rounded p-0.5 grid grid-cols-[auto_1fr] items-center gap-2"
                                                        >
                                                            {/* Cross button */}
                                                            <button
                                                                type="button"
                                                                className="text-gray-500 hover:text-red-500 font-bold"
                                                            // onClick={() => handleRemove(i)}
                                                            >
                                                                ×
                                                            </button>

                                                            {/* CustomInput */}
                                                            <CustomInput
                                                                type="text"
                                                                className="w-full bg-white border border-slate-700 rounded-xs px-2 py-1 text-xs"
                                                                value={c}
                                                            // onChange={(e) => handleChange(i, e.target.value)}
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

                                    <div className="px-2 w-1/2 md:w-1/2 lg:w-1/4 space-y-2">
                                        <h3 className={`font-medium text-[13.5px] ${disabledText}`}>Sample Image</h3>
                                        <div className={`flex justify-around p-2 rounded items-center gap-3 bg-gradient-to-br from-white to-slate-50 ${disabledBorder}`}>
                                            <div className="w-10 h-10 border border-[#cbd5e1] rounded flex items-center justify-center text-xs text-slate-600 cursor-pointer transition-colors">
                                                <Upload className="w-4 h-4" />
                                            </div>
                                            <h3 className={`font-base text-xs ${disabledText}`}>Upload Sample</h3>
                                        </div>
                                    </div>

                                    <div className="px-2 w-1/2 md:w-1/2 lg:w-1/4 space-y-2">
                                        <h3 className={`font-medium text-[13.5px] ${disabledText}`}>Evidence Count</h3>
                                        <select className={`w-full h-14 px-3 py-2 rounded-sm text-xs focus:outline-none transition-all bg-white bg-gradient-to-br from-white to-slate-50 ${disabledBorder} ${disabledText}`}>
                                            <option value="">Select</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </select>
                                    </div>

                                    <div className="px-2 w-1/2 md:w-1/2 lg:w-1/4 space-y-2">
                                        <h3 className={`font-medium text-[13.5px] ${disabledText}`}>Evidence Type</h3>
                                        <select className={`w-full h-14 px-3 py-2 rounded-sm text-xs focus:outline-none transition-all bg-white bg-gradient-to-br from-white to-slate-50 ${disabledBorder} ${disabledText}`}>
                                            <option value="">Select</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </select>
                                    </div>

                                    <div className="px-2 w-1/2 md:w-1/2 lg:w-1/4 space-y-2">
                                        <h3 className={`font-medium text-[13.5px] ${disabledText}`}>Evidence Mandatory:</h3>
                                        <div className={`p-2 rounded-sm bg-gradient-to-br from-white to-slate-50 ${disabledBorder}`}>
                                            <label className={`h-10 flex items-center gap-2 text-xs cursor-pointer transition-colors ${disabledText}`}>
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 rounded-sm border-2 accent-[#1e293b] cursor-pointer"
                                                />
                                                *If Required
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <h3 className={`font-medium text-[13.5px] ${disabledText}`}>Score:</h3>
                                        <div className="flex h-14">
                                            {/* Select box taking most width */}
                                            <div className="w-5/6">
                                                <select
                                                    className={`w-full h-full px-3 py-2 rounded-l-sm text-xs focus:outline-none transition-all bg-white bg-gradient-to-br from-white to-slate-50 ${disabledBorder} ${disabledText}`}
                                                // value={checklist.recived}
                                                // onChange={handleScoreChange}
                                                // disabled={checklist.disabled}
                                                >
                                                    <option value="">Select</option>
                                                    {checklist.options.map((opt, idx) => (
                                                        <option key={`option_${checklist.id}_${idx}`} value={opt.value}>
                                                            {opt.key}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Edit button / input */}
                                            <Button
                                                size="custom"
                                                className='rounded-none rounded-e-sm h-full px-3 text-sm'
                                                onClick={() => handleSetChecklistScoring(idx)}
                                            >
                                                Edit
                                            </Button>
                                            {/* <div className="w-1/6 flex items-center justify-center bg-gray-100 rounded-sm cursor-pointer">
                                                Edit
                                            </div> */}
                                        </div>
                                    </div>
                                </div>


                            </div>
                        )
                    }
                </div>

            ))
            }


            {checklistScoring &&
                (
                    <Modal
                        isVisible={true}
                        size="lg"
                        header={<ModalHeader
                            title={`${checklistScoring.checklist.name} Scoring`}
                            onClose={() => setChecklistScoring(null)}
                        />}
                    // footer={<button className="btn">Save</button>}
                    // stickyFooter
                    >
                        <div className="w-full max-w-md mx-auto mt-8 relative">
                            <div className="relative flex rounded-md overflow-hidden border border-gray-300 bg-gray-100 p-1">
                                {/* Sliding active background */}
                                <div
                                    className={`absolute top-0 left-0 h-full w-1/2 bg-[#003366] rounded-sm shadow-lg
        transform transition-all duration-300 ease-in-out
        ${checklistScoring.checklist.optionsType === "bool" ? "translate-x-0" : "translate-x-full"}
      `}
                                />

                                {/* Boolean button */}
                                <button
                                    onClick={() => setChecklistOptionsType(checklistScoring.checklistIdx, "bool")}
                                    className={`flex-1 py-3 font-medium relative z-10 text-center
        transition-colors duration-300 ease-in-out
        ${checklistScoring.checklist.optionsType === "bool" ? "text-white" : "text-gray-600"}
      `}
                                >
                                    Boolean
                                </button>

                                {/* Custom button */}
                                <button
                                    onClick={() => setChecklistOptionsType(checklistScoring.checklistIdx, "custom")}
                                    className={`flex-1 py-3 font-medium relative z-10 text-center
        transition-colors duration-300 ease-in-out
        ${checklistScoring.checklist.optionsType === "custom" ? "text-white" : "text-gray-600"}
      `}
                                >
                                    Custom
                                </button>
                            </div>
                        </div>

                    </Modal >)
            }

        </Sidebar >
    );
};

export default EvrFormCreation;




//     <div className="w-full">
//     <div className="flex rounded-md overflow-hidden border border-gray-300 bg-gray-100 p-1">
//         {/* Boolean button - active */}
//     <button
//         className="flex-1 py-3 bg-[#003366] text-white font-medium rounded-sm shadow-lg transform translate-y-0 hover:shadow-xl transition-all duration-200 z-10 relative"
//     >
//         Boolean
//     </button>

//     {/* Custom button - inactive */}
//     <button
//         className="flex-1 py-3 bg-gray-100 text-gray-400 font-medium transform translate-y-1 hover:bg-gray-100 hover:translate-y-0.5 transition-all duration-200"
//     >
//         Custom
//     </button>
// </div>
// </div> 