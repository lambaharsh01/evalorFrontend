// components/Button.tsx
import React from "react";
import clsx from "clsx";

type ButtonProps = {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "danger" | "ghost";
    size?: "lg" | "md" | "sm" | "xs";
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
};

export function Button({
    children,
    variant = "primary",
    size = "md",
    type = "button",
    onClick,
    disabled = false,
    className,
}: ButtonProps) {
    const baseStyles =
        "rounded-md font-medium transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

    const variantStyles = {
        primary: "bg-[#003366] text-white hover:bg-[#002244]",
        secondary:
            "bg-white text-[#003366] border border-[#003366] hover:bg-[#f0f4f8]",
        danger: "bg-red-600 text-white hover:bg-red-700",
        ghost: "bg-transparent text-[#003366] hover:bg-gray-100",
    };

    const sizeStyles = {
        lg: "px-6 py-3 text-lg",
        md: "px-4 py-2 text-base",
        sm: "px-3 py-1.5 text-sm",
        xs: "px-2 py-1 text-xs",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={clsx(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        >
            {children}
        </button>
    );
}
