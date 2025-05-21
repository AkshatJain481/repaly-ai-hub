
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import { Provider as ReduxProvider } from "react-redux";
import repalyStore, { persistor } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import AppRouter from "./AppRouter.tsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./components/ui/theme-provider";
import ChakraUIProvider from "./chakraUI/ChakraUIProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraUIProvider>
      <ReduxProvider store={repalyStore}>
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
    </ChakraUIProvider>
  </StrictMode>
);
