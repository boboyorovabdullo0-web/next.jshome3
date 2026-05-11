"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-9 w-16 rounded-full bg-muted animate-pulse" />;

  const isDark = theme === "dark";

  return (
    <button
      id="theme-toggle"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={[
        "relative flex items-center h-9 w-16 rounded-full border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        isDark
          ? "bg-slate-700 border-slate-600"
          : "bg-amber-100 border-amber-300",
      ].join(" ")}
    >
      {/* Track icons */}
      <Moon
        size={13}
        className={`absolute left-2 transition-opacity duration-300 text-slate-300 ${isDark ? "opacity-100" : "opacity-0"}`}
      />
      <Sun
        size={13}
        className={`absolute right-2 transition-opacity duration-300 text-amber-500 ${isDark ? "opacity-0" : "opacity-100"}`}
      />

      {/* Thumb */}
      <span
        className={[
          "absolute top-1 h-7 w-7 rounded-full shadow-md flex items-center justify-center transition-all duration-300",
          isDark
            ? "left-1 bg-slate-900 text-indigo-300"
            : "left-8 bg-white text-amber-500",
        ].join(" ")}
      >
        {isDark ? <Moon size={14} /> : <Sun size={14} />}
      </span>
    </button>
  );
}
