const Loading: React.FC = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <div className="relative w-16 h-16 animate-pulse">
                <svg
                    className="w-full h-full -rotate-90 animate-spin-smooth"
                    viewBox="0 0 50 50"
                >
                    <circle
                        cx="25"
                        cy="25"
                        r="20"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="4"
                        opacity="0.3"
                    />
                    <circle
                        cx="25"
                        cy="25"
                        r="20"
                        fill="none"
                        stroke="url(#spinnerGradient)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        className="spinner-circle"
                    />
                    <defs>
                        <linearGradient
                            id="spinnerGradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                        >
                            <stop offset="0%" stopColor="#bcdfff" />
                            <stop offset="32%" stopColor="#bbffd9" />
                            <stop offset="78%" stopColor="#ffb2b2" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            <style>{`
        .animate-spin-smooth {
          animation: spin 1.4s linear infinite;
        }

        .spinner-circle {
          stroke-dasharray: 125.6;
          stroke-dashoffset: 0;
          transform-origin: center;
          animation: dash 1.5s ease-in-out infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes dash {
          0% {
            stroke-dasharray: 1, 125.6;
            stroke-dashoffset: 0;
          }
          50% {
            stroke-dasharray: 89, 125.6;
            stroke-dashoffset: -35;
          }
          100% {
            stroke-dasharray: 89, 125.6;
            stroke-dashoffset: -124;
          }
        }
      `}</style>
        </div>
    );
};


export default Loading