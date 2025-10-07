import { CheckLine, RotateCcw, ShieldCheck } from "lucide-react";
import type { CaptchaCanvasProps, RenderContactStepProps } from "./types";
import { useEffect, useRef } from "react";
import type { ContactOption } from "@/modules/auth/types";

const RenderContactStep: React.FC<RenderContactStepProps> = ({
    contactOptions,
    selectedContact,
    setSelectedContact,
    handleSendOtp,
    captchaString,
    captcha,
    refreshCaptcha,
    handleInputChange,

}) => {

    const isSelected = (option: ContactOption): boolean => selectedContact?.type === option.type

    return (<>
        <div className="text-center">

            <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                Verify Identity
            </h2>
            <p className="text-gray-600 text-sm">
                Choose how you'd like to receive your verification code
            </p>
        </div>

        <div className="bg-white py-8 px-6 shadow-sm border border-gray-200 rounded-lg">
            <div className="space-y-4">
                {contactOptions.map((option) => (
                    <div
                        key={option.type}
                        onClick={() => setSelectedContact(option)}
                        className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${isSelected(option)
                            ? 'border-blue-900 bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400'
                            }`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className={`p-2 rounded-lg mr-3 ${isSelected(option)
                                    ? 'bg-blue-900 text-white'
                                    : 'bg-gray-100 text-gray-600'
                                    }`}>
                                    {option.icon}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">
                                        {option.type === 'email' ? 'Email' : 'SMS'}
                                    </p>
                                    <p className="text-sm text-gray-600">{option.masked}</p>
                                </div>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 ${isSelected(option)
                                ? 'border-blue-900 bg-blue-900'
                                : 'border-gray-300'
                                }`}>
                                {isSelected(option) && (
                                    <CheckLine className="w-3 h-3 text-white m-0.5" />
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                <div className="flex items-center justify-between mt-6">
                    <CaptchaCanvas captcha={captchaString} />

                    <button
                        type="button"
                        onClick={refreshCaptcha}
                        className="ml-4 p-2 rounded bg-[#f5f5f5] hover:bg-gray-200 transition-colors flex justify-center items-center"
                        title="Reload Captcha"
                        style={{ width: 50, height: 54 }}
                    >
                        <RotateCcw className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Captcha
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <ShieldCheck className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            name='captcha'
                            value={captcha}
                            autoComplete='off'
                            onChange={handleInputChange}
                            className={`block w-full pl-10 pr-3 py-3 border rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent text-gray-900 text-sm`}
                            placeholder="Enter captcha"
                        />
                    </div>
                </div>

                <button
                    onClick={handleSendOtp}
                    disabled={!selectedContact}
                    className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 mt-6 cursor-pointer"
                >
                    Send Verification Code
                </button>
            </div>
        </div>
    </>
    )
};

const CaptchaCanvas: React.FC<CaptchaCanvasProps> = ({ captcha }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // background
        ctx.fillStyle = "#f5f5f5";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const fontSize = 28;
        ctx.font = `${fontSize}px Arial`;

        // draw captcha text
        for (let i = 0; i < captcha.length; i++) {
            const x = 20 + i * 22;
            const y = 35 + Math.random() * 5;
            ctx.save();
            ctx.fillStyle = `hsl(${Math.random() * 360}, 80%, 30%)`;
            ctx.translate(x, y);
            ctx.rotate((Math.random() - 0.5) * 0.4);
            ctx.fillText(captcha[i], 0, 0);
            ctx.restore();
        }

        // lines
        for (let i = 0; i < 4; i++) {
            ctx.beginPath();
            ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.strokeStyle = "rgba(0,0,0,0.2)";
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // dots
        for (let i = 0; i < 30; i++) {
            ctx.fillStyle = "rgba(0,0,0,0.3)";
            ctx.beginPath();
            ctx.arc(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                1,
                0,
                Math.PI * 2
            );
            ctx.fill();
        }
    }, [captcha]);

    return (
        <canvas
            ref={canvasRef}
            width={300}
            height={50}
            style={{ width: "100%", height: "auto", borderRadius: 5 }}
        />
    );
};

export default RenderContactStep;

