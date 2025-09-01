import React, { useEffect, useState } from "react";
import {
    CustomTableWrapper,
    CustomTable,
    CustomThead,
    CustomTh,
    CustomTd,
    CustomTr,
    NavigatePagination,
    SmartSearchPagination,
} from "@/components/table"
import Sidebar from "@/components/sidebar";


type EVR = {
    id: number;
    evrName: string;
    evrCode: string;
    totalScore: number;
    status: string;
    createdBy: string;
    createdAt: string;
};

const dummyData: EVR[] = [
    {
        id: 1,
        evrName: "Energy Audit EVR",
        evrCode: "EVR001",
        totalScore: 85,
        status: "Active",
        createdBy: "Harsh",
        createdAt: "2025-08-20T10:00:00Z",
    },
    {
        id: 2,
        evrName: "Safety Compliance EVR",
        evrCode: "EVR002",
        totalScore: 92,
        status: "Inactive",
        createdBy: "Admin",
        createdAt: "2025-08-18T14:30:00Z",
    },
    {
        id: 3,
        evrName: "Performance Review EVR",
        evrCode: "EVR003",
        totalScore: 76,
        status: "Draft",
        createdBy: "Riya",
        createdAt: "2025-08-15T09:15:00Z",
    },
    {
        id: 4,
        evrName: "Annual Report EVR",
        evrCode: "EVR004",
        totalScore: 88,
        status: "Active",
        createdBy: "Karan",
        createdAt: "2025-08-10T08:00:00Z",
    },
];

const EVRManual: React.FC = () => {
    const [data, setData] = useState<EVR[]>([]);
    const [search] = useState("");
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [total, setTotal] = useState(0);

    const fetchEVRs = async () => {
        // 🔹 Replace this block later with your backend API call
        const filtered = dummyData.filter((d) =>
            d.evrName.toLowerCase().includes(search.toLowerCase())
        );

        setTotal(filtered.length);
        const paginated = filtered.slice(offset, offset + limit);
        setData(paginated);
    };

    useEffect(() => {
        fetchEVRs();
    }, [search, limit, offset]);


    return (
        <Sidebar
            title="EVR"
        >
            <CustomTableWrapper
                title="EVR Manuals"
                headerContent={<SmartSearchPagination
                    onSearch={(str) => { alert(str) }}
                />}
                footerContent={<NavigatePagination
                    offset={offset}
                    limit={limit}
                    total={total}
                    setLimit={setLimit}
                    setOffset={setOffset}
                />}
            >
                {/* 🧾 Table */}
                <CustomTable>
                    <CustomThead>
                        <tr>
                            <CustomTh sticky>EVR Name</CustomTh>
                            <CustomTh>EVR Code</CustomTh>
                            <CustomTh>Total Score</CustomTh>
                            <CustomTh>Status</CustomTh>
                            <CustomTh>Created By</CustomTh>
                            <CustomTh>Created At</CustomTh>
                            <CustomTh>Action</CustomTh>
                        </tr>
                    </CustomThead>
                    <tbody>
                        {data.map((row, i) => (
                            <CustomTr key={row.id} index={i}>
                                <CustomTd sticky bold>{row.evrName}</CustomTd>
                                <CustomTd>{row.evrCode}</CustomTd>
                                <CustomTd>{row.totalScore}</CustomTd>
                                <CustomTd>{row.status}</CustomTd>
                                <CustomTd>{row.createdBy}</CustomTd>
                                <CustomTd>{new Date(row.createdAt).toLocaleString()}</CustomTd>
                                <CustomTd>
                                    <button className="text-blue-600 hover:underline">View</button>
                                </CustomTd>
                            </CustomTr>
                        ))}
                    </tbody>
                </CustomTable>
            </CustomTableWrapper>

        </Sidebar>
    );
};

export default EVRManual;
