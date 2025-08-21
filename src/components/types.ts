import type { ForwardRefExoticComponent, RefAttributes, SVGProps, ReactNode } from "react";

// SIDEBAR

export type LucideIcon = ForwardRefExoticComponent<
  Omit<SVGProps<SVGSVGElement>, "ref"> & RefAttributes<SVGSVGElement>
>;

export interface SidebarProp {
    children: ReactNode;
}

export interface SidebarSubItem {
    label: string
    path: string
}

export interface SidebarItem {
    id: string
    icon: LucideIcon, 
    label: string
    path?: string 
    subItems: SidebarSubItem[]
}
// SIDEBAR END




// TABLE PROPS

export interface CustomTableWrapperProp {
    title: string;
    children: React.ReactNode;
    footer?: string;
    className?: string;
}

export interface CustomTableProp {
    children: React.ReactNode;
    className?: string;
}

export interface CustomTheadProp {
    children: React.ReactNode;
    className?: string;
}

export interface CustomThProp {
    children: React.ReactNode;
    className?: string;
    sticky?: boolean;
    partition?: boolean;
}

export interface CustomTdProp {
    children: React.ReactNode;
    className?: string;
    sticky?: boolean;
    partition?: boolean;
    bold?: boolean;
    colSpan?: number
}

export interface CustomTrProp {
    children: React.ReactNode;
    index?: number;
    className?: string;
}

// TABLE PROPS END


// CALENDER
export interface CalendarProp {
    financialYear: string;
    month: string;
    events: Record<string, string[]>
}

// CALENDER END