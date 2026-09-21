"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  resolvedTheme: "dark",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark");

  // Resolve system theme
  useEffect(() => {
    const stored = (localStorage.getItem("threadly-theme") as Theme) || "dark";
    setThemeState(stored);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    function resolve(t: Theme): "light" | "dark" {
      if (t === "system") return mq.matches ? "dark" : "light";
      return t;
    }

    const resolved = resolve(theme);
    setResolvedTheme(resolved);
    document.documentElement.setAttribute("data-theme", resolved);
    localStorage.setItem("threadly-theme", theme);

    const handler = () => {
      if (theme === "system") {
        const r = resolve("system");
        setResolvedTheme(r);
        document.documentElement.setAttribute("data-theme", r);
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  function setTheme(t: Theme) {
    setThemeState(t);
  }

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
