import clsx from "clsx";
import type { CustomInputProps, CustomTextareaProps, SwitchProps } from "./types";
import TextareaAutosize from "react-textarea-autosize";



export const CustomInput: React.FC<CustomInputProps> = ({ label, className, ...props }) => (
    <div className="flex flex-col gap-1">
        {Boolean(label) && <label className="text-sm font-medium text-gray-700">{label}</label>}
        <input
            autoComplete="off"
            {...props}
            className={clsx(
                "w-full",
                "text-gray-900",
                "border border-[#dce1e6] rounded-sm",
                "focus:outline-none focus:border-[#003366]",
                "placeholder-slate-400",
                "disabled:bg-slate-50 disabled:text-slate-400 disabled:border-slate-200 disabled:cursor-not-allowed",
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
            autoComplete="off"
            type="number"
            {...props}
            className={clsx(
                "w-full text-gray-900 border border-[#dce1e6] rounded-sm",
                "focus:outline-none focus:border-[#003366]",
                "placeholder-slate-400 ",
                "appearance-none",
                "disabled:bg-slate-50 disabled:text-slate-400 disabled:border-slate-200 disabled:cursor-not-allowed",
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
            "disabled:bg-slate-50 disabled:text-slate-400 disabled:border-slate-200 disabled:cursor-not-allowed",
            className,
        )}
    />
);




export const Switch: React.FC<SwitchProps> = ({ checked, disabled, onChange }) => {
    return (
        <button
            type="button"
            onClick={() => !disabled && onChange(!checked)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 cursor-pointer
        ${disabled ? "bg-gray-300 cursor-not-allowed" : checked ? "bg-[#003366]" : "bg-gray-400"}
      `}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300
          ${checked ? "translate-x-6" : "translate-x-1"}
        `}
            />
        </button>
    );
};
