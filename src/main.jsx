import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes.jsx";
import AuthProvider from "./Providers/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { HelmetProvider } from "react-helmet-async";

import { Toaster } from "react-hot-toast";
const queryClient = new QueryClient();


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <HelmetProvider>
        {/* <ToastContainer> */}
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <Toaster position='top-right' reverseOrder={false} />
          </QueryClientProvider>
        {/* </ToastContainer> */}
      </HelmetProvider>
    </AuthProvider>
  </StrictMode>
);
