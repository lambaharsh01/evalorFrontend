import Sidebar from '@/components/sidebar';
import { useState } from 'react';

import ChecklistView from '@/components/evr/checklistView';
import type { checklist } from '@/components/evr/types';
import Loading from '@/components/loading';
export interface parameter {
    id: number;
    name: string;
    total: number;
    recived: number;
    percentage: number;
    totalQuestions: number;
    completedQuestions: number;
}

const EvrForm: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false)

    const evid = {
        evidence: "https://c7.alamy.com/comp/2XXE0DN/shoe-variety-for-sale-at-shopping-mall-shop-from-flat-angle-image-is-taken-at-zudio-shopping-mall-jodhpur-rajasthan-india-on-july-20-2024-2XXE0DN.jpg",
        uploadedAt: "abc xyz abc",
        uploadedBy: "Area manager",
    }

    const checklist1: checklist = {
        evrId: 1,
        parameterId: 2,
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
        evidences: [null, evid, null],
        evidenceMandate: true,
        evidenceType: "image/*",
        options: [{ key: "No", value: 0 }, { key: "Yes", value: 5 }],

        recived: 3,
        isImprovementPoint: false,
        remark: "",

        expand: false,
        completed: true,
        disabled: false,
        liveCapture: true,
    }

    const arr = []
    for (let i = 0; i <= 10; i++) {
        arr.push({ ...checklist1 })
    }




    const [parameters] = useState<parameter[]>([
        { id: 1, name: 'XYZ', total: 10, recived: 8, totalQuestions: 5, completedQuestions: 5, percentage: 80 },
        { id: 1, name: 'AAAAAAAAAA BBBBBBBBB CCCCCCCCCC', total: 10, recived: 8, totalQuestions: 5, completedQuestions: 5, percentage: 80 },
        { id: 1, name: 'SSSSSSSSSSS QQQQQQQQQ', total: 10, recived: 8, totalQuestions: 5, completedQuestions: 3, percentage: 100 },
        { id: 1, name: 'WWWWWWWWWWWW FFFFFFFFFFF', total: 10, recived: 8, totalQuestions: 5, completedQuestions: 1, percentage: 75 },
        { id: 1, name: 'VVVVVVVVVVVVV DDDDDDDDDD', total: 10, recived: 8, totalQuestions: 5, completedQuestions: 0, percentage: 97 }
    ]);

    const [checklists, setChecklists] = useState(arr)

    const handleChecklistChange = (checklist: checklist, idx: number) => {
        setChecklists(prev => {
            prev[idx] = checklist
            return [...prev]
        })
    }

    if (loading) return <Loading />

    return (
        <Sidebar>
            <div className="w-full overflow-x-auto mb-4">
                <div className="flex shadow-sm">
                    {parameters.map((parameter, idx) => (
                        <div
                            key={`parameter_${idx}`}
                            className="relative px-4 pt-6 pb-12 text-center text-black border-r border-gray-100 last:border-r-0 min-w-[180px] max-w-[220px]"
                            style={
                                parameter.completedQuestions === 0
                                    ? {
                                        borderLeftWidth: '4px',
                                        borderLeftColor: '#cbd5e1',
                                        backgroundColor: 'white',
                                    }
                                    : parameter.completedQuestions === parameter.totalQuestions
                                        ? {
                                            backgroundColor: '#f8fffb', // green-50
                                            borderLeftWidth: '4px',
                                            borderLeftColor: '#10b981',
                                        }
                                        : {
                                            backgroundColor: '#fffbeb',
                                            borderLeftWidth: '4px',
                                            borderLeftColor: '#f59e0b',
                                        }
                            }
                        >
                            {/* Top text */}
                            <div className="text-[14px] mb-2 font-medium tracking-wide">
                                {parameter.name}
                            </div>

                            {/* Bottom progress (absolute) */}
                            <div className="absolute bottom-0 left-0 w-full px-4 pb-3">
                                <div className="w-full bg-gray-200 h-1.5 mb-1">
                                    <div
                                        className="h-1.5 transition-all duration-300"
                                        style={{
                                            width: `${parameter.percentage}%`,
                                            backgroundColor: '#003366',
                                        }}
                                    />
                                </div>
                                <div className="text-[13.5px] text-slate-500 font-bold">
                                    {parameter.recived} / {parameter.total}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {
                checklists.map((checklist, idx) => (
                    <ChecklistView
                        key={idx}
                        idx={idx}
                        checklist={checklist}
                        setLoading={setLoading}
                        setChecklist={handleChecklistChange}
                    />

                ))
            }
        </Sidebar >
    );
};

export default EvrForm;