// components/CustomTable.tsx
import React from "react";
import clsx from "clsx";
import type { CustomTableProp, CustomTableWrapperProp, CustomTdProp, CustomTheadProp, CustomThProp, CustomTrProp } from "./types";

export const CustomTableWrapper: React.FC<CustomTableWrapperProp> = ({
    title,
    children,
    footer,
    className,
}) => (
    <div
        className={clsx(
            "bg-white rounded-lg shadow-sm border border-[#dce1e6] overflow-hidden",
            className
        )}
    >
        {/* Title */}
        <div
            className="table-title text-white"
            style={{ backgroundColor: "#003366" }}
        >
            <h1>
                {title}
            </h1>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">{children}</div>

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
            "text-left text-gray-900 border-b border-[#dce1e6]",
            sticky && "sticky left-0 bg-[#f6f7f9] z-10 shadow-sm",
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
            sticky && "sticky left-0 bg-white z-10 shadow-sm",
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