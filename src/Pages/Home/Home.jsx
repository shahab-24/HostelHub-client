import { Helmet } from "react-helmet-async";
import BannerSection from "../../Components/BannerSection";
import MealsTabs from "../../Components/Shared/MealsTabs";
import Testimonials from "../../Components/Testimonials";
import Nutrition from "../../Components/Nutrition";
import Events from "../../Components/Events";
import Membership from "../../Components/Membership";
import ComingMeals from "../ComingMeals";

const Home = () => {
  return (
    <div className="">
      <Helmet>
        <title> Home | HostelHub </title>
      </Helmet>
      <BannerSection></BannerSection>
    <div className="my-20">
    <MealsTabs></MealsTabs>
    </div>
    <div className="my-20">
        <ComingMeals></ComingMeals>
    </div>
     
      <div className="my-20">
        <Nutrition></Nutrition>
      </div>
      <div className="my-20">
        <Events></Events>
      </div>
      <div className="my-20">
        <Membership></Membership>
      </div>
      <div className="my-20">
        <Testimonials></Testimonials>
      </div>
    </div>
  );
};

export default Home;
