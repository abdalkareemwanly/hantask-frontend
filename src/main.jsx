import React from "react";
import ReactDOM from "react-dom/client";
import { ContextProvider } from "./contexts/ContextsProvider";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./index.css";
import { TWThemeProvider } from "./admin/Components/ThemeProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <TWThemeProvider>
        <RouterProvider router={router} />
      </TWThemeProvider>
    </ContextProvider>
  </React.StrictMode>
);
