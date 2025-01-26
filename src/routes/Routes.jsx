import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/Signup/SignUp";
import Login from "../Pages/Login/Login";
import MealsPage from "../Pages/MealsPage";
import UpcomingMeals from "../Pages/UpcomingMealsPage";
import DashboardLayout from "../Layouts/DashboardLayout";


import MealForm from "../Components/MealForm";
import MealDetailPage from "../Pages/MealDetailPage";
import UserProfile from "../Components/UserProfile";
import ManageUsers from "../Pages/ManageUsers";
import PrivateRoute from "./PrivateRoute";
import Checkout from "../Pages/CheckOut";
import UpcomingMealsPage from "../Pages/UpcomingMealsPage";
import AdminProfile from "../Pages/AdminProfile";
import AllMealsPage from "../Pages/AllMealPage";
import AllReviews from "../Pages/AllReviews";

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
        path: "api/meals/:id",
        element: <MealDetailPage></MealDetailPage>,
      },
      {
        path: "checkout/:pkgName",
        element: <Checkout></Checkout>,
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
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
     
      {
        path: "user-profile",
        element: <UserProfile></UserProfile>,
      },
      {
        path: "admin/manage-users",
        element: <ManageUsers></ManageUsers>,
      },
     
      {
        path: "admin/profile",
        element: <AdminProfile></AdminProfile>,
      },
     
      {
        path: "admin/add-meals",
        element: <MealForm></MealForm>,
      },
      {
        path: "admin/all-meals",
        element: <AllMealsPage></AllMealsPage>,
      },
      {
        path: "admin/all-reviews",
        element: <AllReviews></AllReviews>,
      },
      {
        path: "admin/upcoming-meals",
        element: <UpcomingMealsPage></UpcomingMealsPage>,
      },
//       user related routes==================
      {
        path: 'user-profile',
        element: <UserProfile></UserProfile>
      }
    ],
  },
]);
