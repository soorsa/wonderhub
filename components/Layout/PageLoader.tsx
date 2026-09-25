"use client";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import { LoaderCircle } from "lucide-react";

interface PageLoaderProps {
  text?: string;
}

export function PageLoader({ text = "Loading..." }: PageLoaderProps) {
  const has_paid = Cookies.get("has_paid");
  console.log(has_paid);
  if (has_paid === "yes") {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Animated Spinner */}
          <LoaderCircle className="h-10 w-10 text-primary/50 animate-spin" />

          {/* Loading Text */}
          {text && (
            <p className="text-sm font-medium text-muted-foreground animate-pulse px-4">
              {text}
            </p>
          )}
        </div>
      </div>
    );
  } else {
    return null;
  }
}

interface LoaderProps {
  className?: string;
  size?: number;
  color?: string;
}

export function Loader({
  className,
  size = 50,
  color = "#1a3ef0",
}: LoaderProps) {
  return (
    <>
      <style>{`
        @keyframes loader-animate {
          to {
            stroke-dashoffset: 250%;
          }
        }
      `}</style>

      <svg
        className={cn("loader-boxes", className)}
        width={size}
        height={size}
        viewBox="0 0 50 50"
      >
        <rect
          className="fill-none"
          x="0"
          y="0"
          width="50"
          height="50"
          style={{
            stroke: color,
            strokeWidth: 50,
            strokeDasharray: 50,
            strokeDashoffset: "50%",
            animation: "loader-animate 2s linear infinite",
          }}
        />
      </svg>
    </>
  );
}
