"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function ProgressBar() {
  const [state, setState] = useState<"loading" | "completing" | "hidden">(
    "loading",
  );
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setState("completing");

    const timer = setTimeout(() => {
      setState("hidden");
    }, 600);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  if (state === "hidden") return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-300 ease-out ${
        state === "completing" ? "opacity-0 delay-200" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Loading text with animated dots */}
        <h2
          className="text-xl font-medium tracking-wide uppercase animate-dots"
          style={{ color: "var(--primary-color)" }}
        >
          Loading
        </h2>

        {/* Progress Bar Container */}
        <div className="w-[200px] h-[2px] bg-gray-200 overflow-hidden relative rounded-full">
          <div
            className={`h-full ${
              state === "loading"
                ? "animate-progress-load"
                : "w-full transition-all duration-200 ease-out"
            }`}
            style={{ backgroundColor: "var(--primary-color)" }}
          />
        </div>
      </div>
    </div>
  );
}
