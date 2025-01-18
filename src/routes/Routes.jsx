import {
        createBrowserRouter,
        
      } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/Signup/SignUp";
import Login from "../Pages/Login/Login";

    export  const router = createBrowserRouter([
        {
          path: "/",
          element: <MainLayout></MainLayout>,
          errorElement: <h3>Error, page not found</h3>,
          children: [
                {
                        path: '/',
                        element: <Home></Home>
                },
                
          ]

          
        },
        {
                path: '/signup',
                element: <SignUp></SignUp>
        },
        {
                path: '/login',
                element: <Login></Login>
        }
      ]);