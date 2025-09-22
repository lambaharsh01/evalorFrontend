import { handleImageError } from "@/packages/errors/imageError";
import { useState } from "react";
import type { ImageWithLoaderProps, SectionLoaderProps } from "./types";
import clsx from "clsx";

export const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({ src, alt = "Sample Image", onClick, outerClass = "", imgClass = "" }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className={clsx("relative w-full h-full", outerClass)}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <SectionLoader size="md" />
        </div>
      )}

      <img
        className={clsx(`w-full h-full rounded ${loading ? "opacity-0" : "opacity-100"} transition-opacity`, imgClass)}
        src={src}
        alt={alt}
        onClick={onClick}
        loading="lazy"
        onLoad={() => setTimeout(() => setLoading(false), 100)} // Avoid re-render flicker: Sometimes images are cached and load instantly → the spinner briefly flashes.
        onError={(e) => {
          handleImageError(e)
          setLoading(false);
        }}
      />
    </div>
  );
};

export const SectionLoader: React.FC<SectionLoaderProps> = ({
  size = "md",
  className = "",
  overlay = false,
}) => {

  const sizeMap: Record<string, string> = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-10 h-10",
    xl: "w-16 h-16",
  };

  const strokeMap: Record<string, number> = {
    xs: 6,
    sm: 6,
    md: 6,
    lg: 7,
    xl: 7,
  };

  const strokeWidth = strokeMap[size];

  return (
    <div
      className={clsx(
        overlay && "absolute inset-0 flex items-center justify-center bg-gray-100",
        !overlay && "flex items-center justify-center",
        className
      )}
    >
      <div className={clsx("relative animate-pulse", sizeMap[size])}>
        <svg className="w-full h-full -rotate-90 animate-spin-smooth" viewBox="0 0 50 50">
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            opacity="0.3"
          />
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="url(#spinnerGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className="spinner-circle"
          />
          <defs>
            <linearGradient id="spinnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
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
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes dash {
          0% { stroke-dasharray: 1, 125.6; stroke-dashoffset: 0; }
          50% { stroke-dasharray: 89, 125.6; stroke-dashoffset: -35; }
          100% { stroke-dasharray: 89, 125.6; stroke-dashoffset: -124; }
        }
      `}</style>
    </div>
  );
};

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