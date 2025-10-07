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
import { GetAllEVRForm } from "@/services/evr/evrManual";
import type { EVRManuals } from "../types";
import { toast } from "sonner";
import Loading from "@/components/loading";
import { formatDate } from "@/packages/utils/date";
import { useNavigate } from "react-router-dom";



const EVRManual: React.FC = () => {

    const navigate = useNavigate()

    const [loading, setLoading] = useState<boolean>(true)
    const [data, setData] = useState<EVRManuals[]>([]);
    const [search] = useState("");
    const [limit, setLimit] = useState(8);
    const [offset, setOffset] = useState(0);
    const [total, setTotal] = useState(0);

    const fetchEVRs = async () => {

        setLoading(true)
        GetAllEVRForm({ offset, limit, search }).then(([d, t, err]) => {
            if (err) {
                toast.error(err.message)
                return
            }
            setData(d)
            setTotal(t)
        }).finally(() => {
            setLoading(false)
        })
    };

    useEffect(() => {
        fetchEVRs();
    }, [search, limit, offset]);


    if (loading) return <Loading />

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
                                <CustomTd sticky bold>{row.name}</CustomTd>
                                <CustomTd>{row.code ?? "-"}</CustomTd>
                                <CustomTd>{row.totalScore}</CustomTd>
                                <CustomTd>{row.status}</CustomTd>
                                <CustomTd>{row.empName}</CustomTd>
                                <CustomTd>{formatDate(row.createdAt)}</CustomTd>
                                <CustomTd>
                                    <button
                                        className="text-blue-600 hover:underline cursor-pointer"
                                        onClick={() => { navigate(`/evr-form-creation/${row.id}`) }}
                                    >View</button>
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
