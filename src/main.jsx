import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes.jsx";
import AuthProvider from "./Providers/AuthProvider.jsx";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { Toaster } from "react-hot-toast";
// import { HelmetProvider } from "react-helmet-async";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      {/* <HelmetProvider>
        <Toaster>
          <QueryClientProvider client={QueryClient}> */}
            <RouterProvider router={router} />
          {/* </QueryClientProvider>
        </Toaster>
      </HelmetProvider> */}
    </AuthProvider>
  </StrictMode>
);
