import React from "react";
import ReactDOM from "react-dom/client";
import { ContextProvider } from "./contexts/ContextsProvider";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./index.css";
import { TWThemeProvider } from "./admin/Components/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <TWThemeProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </TWThemeProvider>
    </ContextProvider>
  </React.StrictMode>
);
