import type { ForwardRefExoticComponent, RefAttributes, SVGProps, ReactNode } from "react";
import type { TextareaAutosizeProps } from "react-textarea-autosize";

// SIDEBAR

export type LucideIcon = ForwardRefExoticComponent<
  Omit<SVGProps<SVGSVGElement>, "ref"> & RefAttributes<SVGSVGElement>
>;

export interface SidebarProp {
    children: ReactNode;
    title?: string;
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
    title?: string;
    headerContent?: React.ReactNode;
    children: React.ReactNode;
    footerContent?: React.ReactNode;
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

// PAGINATION PROPS 


export interface SmartSearchPaginationProp {
    onSearch:(value: string) => void;
}

export interface NavigatePaginationProp {
    offset: number
    limit: number
    total: number
    setLimit: React.Dispatch<React.SetStateAction<number>>
    setOffset: React.Dispatch<React.SetStateAction<number>>
}
// PAGINATION PROPS END

// CALENDER
export interface CalendarProp {
    financialYear: string;
    month: string;
    events: Record<string, string[]>
}

// CALENDER END


// NOTIFICATION 

export interface NotificationProp {
    id: number
    message: string
    date: string   // ISO string or formatted string
    type?: "info" | "warning" | "success" | "error" // optional
}

export interface NotificationListProps {
  notifications: NotificationProp[]
}
// NOTIFICATION END


// FORM
export interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export interface CustomTextareaProps extends TextareaAutosizeProps {
    className?: string;
    minRows?: number;
    maxRows?: number;
}

// FORM END

