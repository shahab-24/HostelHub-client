import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/Signup/SignUp";
import Login from "../Pages/Login/Login";
import MealsPage from "../Pages/MealsPage";
// import UpcomingMeals from "../Pages/UpcomingMealsPage";
import DashboardLayout from "../Layouts/DashboardLayout";


import MealForm from "../Components/MealForm";
import MealDetailPage from "../Pages/MealDetailPage";
import UserProfile from "../Components/UserProfile";

import PrivateRoute from "./PrivateRoute";
import Checkout from "../Pages/CheckOut";

import AdminProfile from "../Pages/AdminProfile";
import AllMealsPage from "../Pages/AllMealPage";
import AllReviews from "../Pages/AllReviews";
import MyReviews from "../MyReviews";
import UserManagement from "../Pages/UserManagement";
import RequestedMeals from "../Pages/RequestedMeals";
import ServeMeals from "../Pages/ServeMeals";

import AboutMe from "../Pages/AboutMe";
import PaymentHistory from "../Pages/PaymentHistory";
import UpcomingMealForm from "../Components/UpcomingMealForm";
import PublishMeals from "../Components/PublishMeals";
import MealsUpcomingPage from "../Pages/MealsUpcomingPage";

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
        path: "checkout",
        element: <Checkout></Checkout>,
      },
      {
        path: "upcoming-meals",
        element: <MealsUpcomingPage></MealsUpcomingPage>,
      },
      {
        path: 'about-me',
        element: <AboutMe></AboutMe>
      }
     
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
        element: <UserManagement></UserManagement>,
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
        path: "admin/serve-meals",
        element: <ServeMeals></ServeMeals>,
      },
      {
        path: 'admin/upcoming-meals-form',
        element: <UpcomingMealForm></UpcomingMealForm>
      },
      {
        path: 'admin/publish-meals',
        element: <PublishMeals></PublishMeals>
      },
//       {
//         path: "admin/upcoming-meals",
//         element: <UpcomingMealsPage></UpcomingMealsPage>,
//       },
//       {
//         path: "admin/upcoming-meals/table",
//         element: <MealsUpcoming></MealsUpcoming>,
//       },
//       user related routes==================
      {
        path: 'user-profile',
        element: <UserProfile></UserProfile>
      },
      {
        path: 'my-reviews',
        element: <MyReviews></MyReviews>
      },
      {
        path: 'requested-meals',
        element: <RequestedMeals></RequestedMeals>
      },
      {
        path: 'payment-history',
        element: <PaymentHistory></PaymentHistory>
      },
     
    ],
  },
]);
