// components/CustomTable.tsx
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import type { CustomTableProp, CustomTableWrapperProp, CustomTdProp, CustomTheadProp, CustomThProp, CustomTrProp, NavigatePaginationProp, SmartSearchPaginationProp } from "./types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CustomInput } from "./form";
import { isMdOrMore } from "@/packages/utils/screen";

export const CustomTableWrapper: React.FC<CustomTableWrapperProp> = ({
    title,
    headerContent,
    children,
    footer,
    footerContent,
    className,
}) => (
    <div
        className={clsx(
            "bg-white rounded-lg shadow-sm border border-[#dce1e6] overflow-hidden",
            className
        )}
    >
        {/* Title */}
        {Boolean(title) && (
            <div
                className="header-title-padding text-white bg-[#003366]"
            >
                <h1>
                    {title}
                </h1>
            </div>
        )}

        {Boolean(headerContent) && headerContent}

        {/* Table */}
        <div className="overflow-x-auto">{children}</div>


        {Boolean(footerContent) && footerContent}

        {/* Footer */}
        {Boolean(footer) && (
            <div
                // TEXT SIZE 
                className="table-footer-div font-medium text-[#B8860B]"
                style={{ backgroundColor: "#f6f7f9" }}
            >
                {footer}
            </div>
        )}
    </div>
);

export const CustomTable: React.FC<CustomTableProp> = ({
    children,
    className,
}) => (
    <table className={clsx("min-w-full border-collapse", className)}>
        {children}
    </table>
);

export const CustomThead: React.FC<CustomTheadProp> = ({
    children,
    className,
}) => (
    <thead className={clsx(className)} style={{ backgroundColor: "#f6f7f9" }}>
        {children}
    </thead>
);

export const CustomTh: React.FC<CustomThProp> = ({
    children,
    className,
    sticky = false,
    partition = true,
}) => (
    <th
        className={clsx(
            "text-left text-gray-900 border-b border-t border-[#dce1e6]",
            sticky && "sticky bg-[#fcfcfd] left-0 z-10 shadow-sm",
            partition && "border-r border-[#dce1e6]",
            (partition ? "after:content-[''] after:absolute after:top-0 after:right-0 after:h-full after:w-px after:bg-[#dce1e6]" : ""),
            className
        )}
    >
        {children}
    </th>
);

export const CustomTd: React.FC<CustomTdProp> = ({
    children,
    className,
    sticky = false,
    partition = true,
    bold = false,
    colSpan = 1,
}) => (
    <td
        colSpan={colSpan}
        className={clsx(
            "text-gray-700 border-b border-[#dce1e6]",
            sticky && "sticky bg-[#fcfcfd] left-0 z-10 shadow-sm",
            partition && "border-r border-[#dce1e6]",
            (partition ? "after:content-[''] after:absolute after:top-0 after:right-0 after:h-full after:w-px after:bg-[#dce1e6]" : ""),
            bold && "font-semibold",
            className
        )}
    >
        {children}
    </td >
);

export const CustomTr: React.FC<CustomTrProp> = ({
    children,
    index,
    className,
}) => (
    <tr
        className={clsx(
            index !== undefined && index % 2 === 0 ? "bg-white" : "bg-[#f9fafb]",
            className
        )}
    >
        {children}
    </tr>
);

export const SmartSearchPagination: React.FC<SmartSearchPaginationProp> = ({
    onSearch,
}) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [hasTyped, setHasTyped] = useState(false);

    useEffect(() => {
        if (!hasTyped) return;

        const handler = setTimeout(() => {
            onSearch(inputValue.trim());
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [inputValue, hasTyped, onSearch]);

    return (
        <div className="pagination-navigation-padding flex justify-end gap-2 items-center ">

            <div className="smart-search-w">
                <CustomInput
                    type="text"
                    placeholder="Smart search"
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        setHasTyped(true);
                    }}
                />
            </div>
        </div>
    );
};

export const NavigatePagination: React.FC<NavigatePaginationProp> = ({ offset, limit, total, setLimit, setOffset }) => {


    const isMdScreen = isMdOrMore()
    const totalPages = Math.ceil(total / limit);

    return (<div className="flex justify-end items-center gap-3 pagination-navigation-padding">

        <div className="flex items-center gap-2">
            <button
                disabled={offset === 0}
                onClick={() => setOffset((prev) => Math.max(prev - limit, 0))}
                className="pagination-navigation-text-padding border rounded-full disabled:opacity-50 hover:bg-gray-100"
                title="Previous"
            >
                <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="pagination-navigation-text">
                {isMdScreen && "Page"}

                {Math.floor(offset / limit) + 1} of {totalPages || 1}
            </span>

            <button
                disabled={offset + limit >= total}
                onClick={() => setOffset((prev) => prev + limit)}
                className="pagination-navigation-text-padding border rounded-full disabled:opacity-50 hover:bg-gray-100"
                title="Next"
            >
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>

        <div className="flex items-center gap-3 ps-3">

            {isMdScreen && (
                <label className="pagination-navigation-text">
                    Showing
                </label>
            )}
            <select
                value={limit}
                onChange={(e) => {
                    setLimit(Number(e.target.value));
                    setOffset(0);
                }}
                className="pagination-navigation-text pagination-navigation-text-padding cursor-pointer rounded-sm border text-gray-800 
                    transition-all duration-200 ease-in-out
                    hover:border-[#003366] hover:shadow-md 
                    focus:outline-none focus:border-[#003366]"
            >
                {[2, 5, 10].map((l) => (
                    <option key={l} value={l}>
                        {l}
                    </option>
                ))}
            </select>
            <label className="pagination-navigation-text">
                Rows
            </label>
        </div>
    </div>)
}