import { Helmet } from "react-helmet-async";
import BannerSection from "../../Components/BannerSection";
import MealsTabs from "../../Components/Shared/MealsTabs";
import Testimonials from "../../Components/Testimonials";
import Nutrition from "../../Components/Nutrition";
import Events from "../../Components/Events";
import Membership from "../../Components/Membership";
import ComingMeals from "../ComingMeals";
import WhyChooseUs from "../../Components/WhyChooseUs";
import FeaturedHostels from "../../Components/FeaturedHostels";
import { motion } from "framer-motion";
import SectionWrapper from "../../Components/Shared/SectionWrapper";
import { Link } from "react-router-dom";



const Home = () => {
  return (
    <div className="bg-base-100 text-base-content">
      <Helmet>
        <title>Home | HostelHub</title>
      </Helmet>

      <BannerSection />

      <SectionWrapper>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 font-serif tracking-tight">
          Explore Meals by Category
        </h2>
        <MealsTabs />
      </SectionWrapper>

      <SectionWrapper>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 font-serif tracking-tight">
          Upcoming Meal Highlights
        </h2>
        <ComingMeals />
      </SectionWrapper>

      <SectionWrapper>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 font-serif tracking-tight">
          Featured Hostels
        </h2>
        <FeaturedHostels />
      </SectionWrapper>

      <SectionWrapper>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 font-serif tracking-tight">
          Balanced Nutrition Plans
        </h2>
        <Nutrition />
      </SectionWrapper>

      <SectionWrapper>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 font-serif tracking-tight">
          Upcoming Events
        </h2>
        <Events />
      </SectionWrapper>

      <SectionWrapper>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 font-serif tracking-tight">
          Why Choose HostelHub?
        </h2>
        <WhyChooseUs />
      </SectionWrapper>

      <SectionWrapper>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 font-serif tracking-tight">
          Membership Plans
        </h2>
        <Membership />
      </SectionWrapper>

      <SectionWrapper>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 font-serif tracking-tight">
          What Our Members Say
        </h2>
        <Testimonials />
      </SectionWrapper>

     
      <SectionWrapper>
        <div className="text-center space-y-6 py-16 bg-primary text-primary-content rounded-2xl shadow-lg">
          <h2 className="text-4xl md:text-5xl font-bold font-serif">
            Ready to Join HostelHub?
          </h2>
          <p className="text-lg md:text-xl max-w-xl mx-auto px-4">
            Experience the best meals, community, and comfort at unbeatable value.
            Join us today and make your hostel life truly memorable!
          </p>
         <Link to='/signup'> <button className="btn btn-accent btn-wide text-lg">Join Now</button></Link>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Home;
