"use client";

import { createContext, useContext, useEffect } from "react";
import { useEditorStore } from "../lib/store/editor-store";
import { applyThemeToElement } from "../lib/theme/apply-theme";

type Theme = "dark" | "light";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
};

type Coords = { x: number; y: number };

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: (coords?: Coords) => void;
  currentPreset: string;
  applyPreset: (preset: string) => void;
};

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
  toggleTheme: () => null,
  currentPreset: "openchat",
  applyPreset: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Use selector functions to only subscribe to the specific parts we need
  const themeState = useEditorStore((state) => state.themeState);
  const setThemeState = useEditorStore((state) => state.setThemeState);
  const applyThemePreset = useEditorStore((state) => state.applyThemePreset);

  useEffect(() => {
    const root = document.documentElement;
    if (!root) return;

    applyThemeToElement(themeState, root);
  }, [themeState]);

  const handleThemeChange = (newMode: Theme) => {
    setThemeState({ ...themeState, currentMode: newMode });
  };

  const handleThemeToggle = (coords?: Coords) => {
    const newMode = themeState.currentMode === "light" ? "dark" : "light";
    handleThemeChange(newMode);
  };

  const handlePresetChange = (preset: string) => {
    applyThemePreset(preset);
  };

  const value: ThemeProviderState = {
    theme: themeState.currentMode,
    setTheme: handleThemeChange,
    toggleTheme: handleThemeToggle,
    currentPreset: themeState.preset || "openchat",
    applyPreset: handlePresetChange,
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};