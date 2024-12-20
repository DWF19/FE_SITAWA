import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./global.css";
import { GlobalProvider } from "./GlobalContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </GlobalProvider>
    </BrowserRouter>
  </StrictMode>
);
