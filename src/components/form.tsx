import clsx from "clsx";
import type { CustomInputProps, CustomTextareaProps } from "./types";
import TextareaAutosize from "react-textarea-autosize";



export const CustomInput: React.FC<CustomInputProps> = ({ label, className, ...props }) => (
    <div className="flex flex-col gap-1">
        {Boolean(label) && <label className="text-sm font-medium text-gray-700">{label}</label>}
        <input
            {...props}
            className={clsx(
                "w-full",
                "text-gray-900",
                "border border-[#dce1e6] rounded-sm",
                "focus:outline-none focus:border-[#003366]",
                "placeholder-gray-400",
                className
            )}
        />
    </div>
);


export const CustomNumberInput: React.FC<CustomInputProps> = ({
    label,
    className,
    ...props
}) => (
    <div className="flex flex-col gap-1">
        {Boolean(label) && <label className="text-sm font-medium text-gray-700">{label}</label>}
        <input
            type="number"
            {...props}
            className={clsx(
                "w-full text-gray-900 border border-[#dce1e6] rounded-sm",
                "focus:outline-none focus:border-[#003366]",
                "placeholder-gray-400 ",
                "appearance-none",
                className
            )}
            onWheel={(e) => (e.currentTarget as HTMLElement).blur()}
        />

        {/* 👇 styles scoped here for hiding spinners */}
        <style>
            {`
        /* Chrome, Safari, Edge, Opera */
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Firefox */
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}
        </style>
    </div>
);


export const CustomTextarea: React.FC<CustomTextareaProps> = ({
    className,
    minRows = 2,
    maxRows = 2,
    ...props
}) => (
    <TextareaAutosize
        style={{ borderRadius: "0.375rem" }}
        {...props}
        minRows={minRows}
        maxRows={maxRows}
        className={clsx(
            "w-full p-2 rounded-md text-xs leading-relaxed focus:outline-none  transition-all bg-gradient-to-br from-white to-slate-50 text-slate-800",
            "thin-scrollbar",
            className,
        )}
    />
);