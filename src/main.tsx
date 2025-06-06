
import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import { Provider as ReduxProvider } from "react-redux";
import store, { persistor } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import AppRouter from "./AppRouter.tsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./components/ui/theme-provider";

// Create root with proper null check
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider defaultTheme="system" storageKey="ui-theme">
          <AppRouter />
          <ToastContainer
            theme="colored"
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            pauseOnFocusLoss
            pauseOnHover
          />
        </ThemeProvider>
      </PersistGate>
    </ReduxProvider>
  </React.StrictMode>
);
