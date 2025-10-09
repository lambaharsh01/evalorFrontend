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
import { DeleteEVR, GetAllEVRForm, UpsertEVRForm } from "@/services/evr/evrManual";
import type { EVRManuals, InitEvr } from "../types";
import { toast } from "sonner";
import Loading from "@/components/loading";
import { formatDate } from "@/packages/utils/date";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { Button } from "@/components/button";
import { Modal, ModalHeader } from "@/components/modals";
import { CustomInput, CustomNumberInput, Switch } from "@/components/form";
import { evrManualCreationValidation } from "../validator";
import { emptyInitEVR } from "../data";
import { Eye, Delete, Pencil } from "lucide-react";
import { showEVRDeleteWarningAlert } from "@/components/alerts";


const EVRManual: React.FC = () => {

    const navigate = useNavigate()

    const [loading, setLoading] = useState<boolean>(true)
    const [data, setData] = useState<EVRManuals[]>([]);
    const [search, setSearch] = useState("");
    const [limit, setLimit] = useState(8);
    const [offset, setOffset] = useState(0);
    const [total, setTotal] = useState(0);

    const [showModal, setShowModal] = useState<boolean>(false)
    const [currentEVRID, setCurrentEVRID] = useState<number>(0)

    const [evr, setEvr] = useState<InitEvr>(emptyInitEVR)

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


    const handleAddEVRClick = () => {
        setShowModal(true)
        setCurrentEVRID(0)
    }

    const handleEVREditClick = (row: EVRManuals) => {
        setCurrentEVRID(row.id)
        setShowModal(true)
        setEvr({
            name: row.name,
            code: row.code ?? "",
            totalScore: row.totalScore,
            useParameters: row.useParameters,
            useManpower: row.useManpower,
        })
    }

    const handleEVRChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEvr(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleEVRSwitchChange = (v: boolean, name: string) => {
        setEvr(prev => ({
            ...prev,
            [name]: v,
        }));
    }

    const handleAddEVR = () => {

        const err = evrManualCreationValidation(evr)
        if (err) {
            toast.error(err)
            return
        }

        setLoading(true)
        UpsertEVRForm(evr, currentEVRID).then(([err]) => {
            if (err) {
                toast.error(err.message)
                return
            }

            setShowModal(false)
            setEvr(emptyInitEVR)

            toast.success("EVR Saved")
            fetchEVRs()

        }).finally(() => {
            setLoading(false)
        })
    }



    const handleEVRDeleteClick = async (id: number) => {
        const deleteEvr = await showEVRDeleteWarningAlert()
        if (!deleteEvr) {
            return
        }

        setLoading(true)
        DeleteEVR(id).then(([err]) => {
            if (err) {
                toast.error(err.message)
                return
            }

            toast.success("EVR Deleted")
            fetchEVRs()

        }).finally(() => {
            setLoading(false)
        })
    }



    if (loading) return <Loading />

    const headerContent = <div className="flex justify-end items-center">
        <SmartSearchPagination
            onSearch={(str) => { setSearch(str) }}
            val={search}
        />
        <div>
            <Button size="xs" className="py-1 me-3" onClick={handleAddEVRClick}>Add EVR</Button>
        </div>
    </div>

    return (
        <Sidebar>
            <CustomTableWrapper
                title="EVR Manuals"
                headerContent={headerContent}
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
                            <CustomTh className="flex justify-center">Status</CustomTh>
                            <CustomTh>Created By</CustomTh>
                            <CustomTh>Created At</CustomTh>
                            <CustomTh className="flex justify-center">Action</CustomTh>
                        </tr>
                    </CustomThead>
                    <tbody>
                        {data.map((row, i) => (
                            <CustomTr key={row.id} index={i}>
                                <CustomTd sticky bold>{row.name}</CustomTd>
                                <CustomTd>{row.code ?? "-"}</CustomTd>
                                <CustomTd>{row.totalScore}</CustomTd>
                                <CustomTd className="text-center">
                                    <button className={clsx(
                                        "rounded-full font-medium py-1 px-2",
                                        row.status === "Draft" && "bg-amber-100",
                                        row.status === "Completed" && "bg-green-100",
                                        row.status === "Active" && "bg-green-300",
                                    )}>
                                        {row.status}
                                    </button>
                                </CustomTd>
                                <CustomTd>{row.empName}</CustomTd>
                                <CustomTd>{formatDate(row.createdAt)}</CustomTd>
                                <CustomTd>
                                    <div className="w-full flex justify-between">

                                        <Eye
                                            size={18}
                                            className="text-blue-600 cursor-pointer mx-1 sm:mx-1.5"
                                            onClick={() => { navigate(`/evr-form-creation/${row.id}`) }}
                                        />
                                        {row.status === "Draft" && (
                                            <Pencil
                                                size={18}
                                                className="text-blue-600 cursor-pointer mx-1 sm:mx-1.5"
                                                onClick={() => handleEVREditClick(row)}
                                            />
                                        )}
                                        {row.status === "Draft" && (
                                            <Delete
                                                size={18}
                                                className="text-red-600 cursor-pointer mx-1 sm:mx-1.5"
                                                onClick={() => handleEVRDeleteClick(row.id)}
                                            />
                                        )}
                                    </div>
                                </CustomTd>
                            </CustomTr>
                        ))}
                    </tbody>
                </CustomTable>
            </CustomTableWrapper>


            {
                (() => {

                    if (!showModal) return null

                    return <Modal
                        isVisible={true}
                        size="md"
                        header={<ModalHeader
                            title={`${currentEVRID ? "Change" : "Add"} EVR`}
                            onClose={() => { setShowModal(prev => !prev) }}
                        />}
                    >

                        <div className="w-full mx-auto relative border-green-900  ">

                            <div className="mb-3">
                                <label className="block text-sm font-medium text-gray-700 mb-1">EVR Name</label>
                                <CustomInput
                                    type="text"
                                    name="name"
                                    value={evr.name}
                                    className="p-2"
                                    placeholder="Enter Name"
                                    onChange={handleEVRChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="block text-sm font-medium text-gray-700 mb-1">EVR Code</label>
                                <CustomInput
                                    type="text"
                                    name="code"
                                    value={evr.code}
                                    className="p-2"
                                    placeholder="Enter Code"
                                    onChange={handleEVRChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Total Score</label>
                                <CustomNumberInput
                                    type="number"
                                    name="totalScore"
                                    value={evr.totalScore || ""}
                                    className="p-2"
                                    placeholder="Enter Score"
                                    onChange={handleEVRChange}
                                />
                            </div>

                            <div className="flex items-center justify-between py-2">
                                <label className="text-sm font-medium text-gray-700">Use Parameters</label>
                                <Switch
                                    checked={evr.useParameters}
                                    onChange={(v) => handleEVRSwitchChange(v, "useParameters")}
                                />
                            </div>

                            {/* <div className="flex items-center justify-between py-2">
                                <label className="text-sm font-medium text-gray-700">Use Manpower</label>
                                <Switch
                                    checked={evr.useManpower}
                                    onChange={(v) => { }}
                                />
                            </div> */}

                            <div className="w-full mt-5">
                                <Button size="xs" className="w-full" onClick={handleAddEVR}>Save</Button>
                            </div>

                        </div>

                    </Modal >
                })()
            }


        </Sidebar >
    );
};

export default EVRManual;
