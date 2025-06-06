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
import AdminRoute from "./AdminRoute";
import AdminDashboard from "../Pages/AdminDashboard/AdminDashboard";
import UserDashboard from "../Pages/UsersDashboard/UserDashboard";
import Payment from "../Pages/Payment/Payment";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "meals",
        element: <MealsPage></MealsPage>,
      },
      {
        path: "api/meals/:mealId",
        element: <MealDetailPage></MealDetailPage>,
      },
      {
        path: "checkout",
        element: <Checkout></Checkout>,
      },
      {
        path: "checkout/payment",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
      {
        path: "upcoming-meals",
        element: <MealsUpcomingPage></MealsUpcomingPage>,
      },
      {
        path: "about-me",
        element: <AboutMe></AboutMe>,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      // normal user related route=========
      {
        path: "user-dashboard",
        element: (
          <PrivateRoute>
            <UserDashboard></UserDashboard>
          </PrivateRoute>
        ),
      },
      {
        path: "user-profile",
        element: (
          <PrivateRoute>
            <UserProfile></UserProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "my-reviews",
        element: (
          <PrivateRoute>
            <MyReviews></MyReviews>
          </PrivateRoute>
        ),
      },
      {
        path: "requested-meals",
        element: (
          <PrivateRoute>
            <RequestedMeals></RequestedMeals>
          </PrivateRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <PrivateRoute>
            <PaymentHistory></PaymentHistory>
          </PrivateRoute>
        ),
      },

      {
        path: "admin-dashboard",
        element: (
          <AdminRoute>
            <AdminDashboard></AdminDashboard>
          </AdminRoute>
        ),
      },

      {
        path: "admin/manage-users",
        element: (
          <AdminRoute>
            <UserManagement></UserManagement>
          </AdminRoute>
        ),
      },

      {
        path: "admin/profile",
        element: (
          <AdminRoute>
            <AdminProfile></AdminProfile>
          </AdminRoute>
        ),
      },

      {
        path: "admin/add-meals",
        element: (
          <AdminRoute>
            <MealForm></MealForm>
          </AdminRoute>
        ),
      },
      {
        path: "admin/all-meals",
        element: (
          <AdminRoute>
            <AllMealsPage></AllMealsPage>
          </AdminRoute>
        ),
      },
      {
        path: "admin/all-reviews",
        element: (
          <AdminRoute>
            <AllReviews></AllReviews>
          </AdminRoute>
        ),
      },
      {
        path: "admin/serve-meals",
        element: (
          <AdminRoute>
            {" "}
            <ServeMeals></ServeMeals>
          </AdminRoute>
        ),
      },
      {
        path: "admin/upcoming-meals-form",
        element: (
          <AdminRoute>
            <UpcomingMealForm></UpcomingMealForm>
          </AdminRoute>
        ),
      },
      {
        path: "admin/publish-meals",
        element: (
          <AdminRoute>
            <PublishMeals></PublishMeals>
          </AdminRoute>
        ),
      },
      
    ],
  },
]);
