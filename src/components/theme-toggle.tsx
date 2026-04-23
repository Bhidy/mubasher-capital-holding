"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full border border-border/50 bg-secondary/50 animate-pulse" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      data-hover
      style={{ cursor: "none" }}
      className="relative w-9 h-9 rounded-full border border-border/50 bg-secondary/50 backdrop-blur-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border transition-all duration-300 overflow-hidden"
    >
      <Sun
        className="absolute h-4 w-4 transition-all duration-500"
        style={{
          opacity: isDark ? 1 : 0,
          transform: isDark ? "rotate(0deg) scale(1)" : "rotate(90deg) scale(0)",
        }}
      />
      <Moon
        className="absolute h-4 w-4 transition-all duration-500"
        style={{
          opacity: isDark ? 0 : 1,
          transform: isDark ? "-rotate-90deg scale-0" : "rotate(0deg) scale(1)",
        }}
      />
    </button>
  );
}
