import {
        createBrowserRouter,
        
      } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";

    export  const router = createBrowserRouter([
        {
          path: "/",
          element: <MainLayout></MainLayout>,
          errorElement: <h3>Error, page not found</h3>
        },
      ]);