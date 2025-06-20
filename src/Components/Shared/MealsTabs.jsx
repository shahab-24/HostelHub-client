import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useMeal from "../../hooks/useMeal";
import MealsCategoryTab from "../MealsCategoryTab";
// import Loader from "./Loader";

const MealsTabs = () => {
  const [meals, isLoading] = useMeal();
//   console.log(meals.meals);

  // Group meals by category
  const groupedMeals = meals?.meals?.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const categories = groupedMeals ? Object.keys(groupedMeals) : [];

//   if(isLoading) return <Loader></Loader>

//   const categories = Object.keys(groupedMeals);

  return (
    <div className="px-4 md:px-10 py-10 bg-gray-50">
    <h2 className="font-poppins text-2xl lg:text-3xl font-bold text-blue-600 text-center">Meals By Category</h2>
      <section className="my-10 max-w-6xl mx-auto">
        <Tabs>
          {/* Tab List */}
          <TabList className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8">
            {categories.map((cat, index) => (
              <Tab
                key={index}
                className="py-2 px-4 text-sm md:text-base font-medium border-b-2 border-transparent hover:border-blue-500 focus:outline-none cursor-pointer transition"
                selectedClassName="border-blue-500 text-blue-600"
              >
                {cat}
              </Tab>
            ))}
          </TabList>

          {/* Tab Panels */}
         
         
          {categories.map((cat, index) => (
            <TabPanel key={index}>
              <MealsCategoryTab key={cat._id} items={groupedMeals[cat]} />
            </TabPanel>
          ))}
         
        </Tabs>
      </section>
    </div>
  );
};

export default MealsTabs;
