import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ChakraUIProvider from "./chakraUI/ChakraUIProvider.tsx";
import { Provider as ReduxProvider } from "react-redux";
import repalyStore, { persistor } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import AppRouter from "./AppRouter.tsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={repalyStore}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraUIProvider>
          <AppRouter />
          <ToastContainer
            theme="colored"
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            pauseOnFocusLoss
            pauseOnHover
          />
        </ChakraUIProvider>
      </PersistGate>
    </ReduxProvider>
  </StrictMode>
);
