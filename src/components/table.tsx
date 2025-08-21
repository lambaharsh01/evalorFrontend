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
            className="px-6 py-4 text-white"
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
                className="text-sm md:text-base font-medium px-4 py-3 text-[#B8860B]"
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
            "px-3 sm:px-4 lg:px-2 py-3 text-left text-gray-900 border-b border-[#dce1e6]",
            sticky && "sticky left-0 bg-[#f6f7f9] z-10 shadow-sm",
            partition && "border-r border-[#dce1e6]",
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
            "px-3 sm:px-4 lg:px-2 py-2 text-gray-700 border-b border-[#dce1e6]",
            sticky && "sticky left-0 bg-white z-10 shadow-sm",
            partition && "border-r border-[#dce1e6]",
            bold && "font-semibold",
            className
        )}
    >
        {children}
    </td>
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