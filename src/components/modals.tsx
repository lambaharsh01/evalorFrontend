import { useEffect } from "react";

interface ModalProps {
    isVisible: boolean;
    children: React.ReactNode;
    size?: "sm" | "md" | "lg" | "xl";
    header: React.ReactNode;
    footer?: React.ReactNode;
}

interface ModalHeaderProps {
    title: string;
    onClose: () => void;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ title, onClose }) => {
    return (
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-black">{title}</h2>
            <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-800 text-2xl font-bold leading-none"
            >
                &times;
            </button>
        </div>
    );
};

const Modal: React.FC<ModalProps> = ({
    isVisible,
    children,
    size = "md",
    header,
    footer,
}) => {
    // Prevent background scroll when modal is open
    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isVisible]);

    if (!isVisible) return null;

    const sizeClasses: Record<typeof size, string> = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-3xl"
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-sm">
            <div
                className={`bg-white thin-scrollbar shadow-lg w-11/12 ${sizeClasses[size]} relative max-h-[75vh] flex flex-col`}
            >

                {header}
                <div className="p-4 overflow-y-auto flex-1 thin-scrollbar">{children}</div>

                {/* Footer */}
                {footer && (
                    <div
                        className="p-4 border-t border-gray-200 sticky bottom-0 bg-white rounded-b-sm"
                    >
                        {footer}
                    </div>
                )}
            </div>
        </div >
    );
};

export default Modal;