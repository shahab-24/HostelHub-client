import { Outlet } from "react-router-dom";
import Navbar from "../Components/Shared/Navbar";
import Footer from "../Components/Shared/Footer";
import { useState } from "react";


const MainLayout = () => {
        const [likedMeals, setLikedMeals] = useState(0);

  const handleLikeMeal = () => {
    setLikedMeals((prevLikes) => prevLikes + 1);
  };
        return (
                <div>
                <Navbar likedMeals={likedMeals}></Navbar>
                <div className="min-h-[calc(100vh-68px)]">
                        <Outlet  context={{ setLikedMeals }}></Outlet>
                </div>
                <Footer></Footer>
                        
                </div>
        );
};

export default MainLayout;