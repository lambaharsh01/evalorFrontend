import type { RenderOtpStepProps } from "./types";

const RenderOtpStep: React.FC<RenderOtpStepProps> = ({
    selectedContact,
    otp,
    handleVerifyOtp,
    otpTimer,
    handleResendOtp,
    handleInputChange,
}) => (
    <>
        <div className="text-center">
            <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                Enter Verification Code
            </h2>
            <p className="text-gray-600 text-sm">
                We sent a 6-digit code to {selectedContact?.masked}
            </p>
        </div>

        <div className="bg-white py-8 px-6 shadow-sm border border-gray-200 rounded-lg">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Verification Code
                    </label>
                    <input
                        name="otp"
                        type="text"
                        maxLength={6}
                        value={otp}
                        onChange={handleInputChange}
                        className={`block w-full px-3 py-3 border rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent text-gray-900 text-sm text-center tracking-widest`}
                        placeholder="Enter 6-digit code"
                    />
                </div>

                <button
                    onClick={handleVerifyOtp}
                    className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
                >
                    Verify Code
                </button>

                <div className="text-center">
                    {otpTimer > 0 ? (
                        <p className="text-sm text-gray-600">
                            Resend code in {otpTimer}s
                        </p>
                    ) : (
                        <button
                            onClick={handleResendOtp}
                            className="text-sm text-blue-900 hover:text-blue-800 font-medium cursor-pointer"
                        >
                            Resend verification code
                        </button>
                    )}
                </div>
            </div>
        </div>
    </>
);

export default RenderOtpStep;