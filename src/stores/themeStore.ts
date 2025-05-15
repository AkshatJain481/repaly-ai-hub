
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  mode: 'light' | 'dark' | 'system';
  setMode: (mode: 'light' | 'dark' | 'system') => void;
}

// Create the store with safer initialization
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'system',
      setMode: (mode) => set({ mode }),
    }),
    {
      name: 'theme-storage',
      // Make sure we skip hydration if window is not available
      skipHydration: true,
    }
  )
);
