import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/Signup/SignUp";
import Login from "../Pages/Login/Login";
import MealsPage from "../Pages/MealsPage";
import UpcomingMeals from "../Pages/UpcomingMeals";
import DashboardLayout from "../Layouts/DashboardLayout";

import AdminDashboard from "../Pages/Dashboard/AdminDashboard";
import UserDashboard from "../Pages/Dashboard/UserDashboard";
import MealForm from "../Components/MealForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <h3>Error, page not found</h3>,//to do error page
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "meals",
        element: <MealsPage></MealsPage>,
      },
      {
        path: "upcoming-meals",
        element: <UpcomingMeals></UpcomingMeals>,
      },
    ],
  },
  {
    path: "/signup",
    element: <SignUp></SignUp>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "user",
        element: <UserDashboard></UserDashboard>,
      },
      {
        path: "admin",
        element: <AdminDashboard></AdminDashboard>,
      },
     
      {
        path: "admin/add-meals",
        element: <MealForm></MealForm>,
      },
    ],
  },
]);
