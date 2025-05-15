
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from './providers/ThemeProvider';
import { useEffect } from 'react';
import { useThemeStore } from './stores/themeStore';

// Create a wrapper component to handle hydration
function StoreInitializer() {
  const { mode } = useThemeStore();
  
  useEffect(() => {
    // Hydrate the store on client-side
    if (typeof window !== 'undefined') {
      const persist = useThemeStore.persist;
      if (persist && persist.rehydrate) {
        persist.rehydrate();
      }
    }
  }, []);
  
  return null;
}

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <StoreInitializer />
    <App />
  </ThemeProvider>
);
