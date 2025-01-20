import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useMeal from "../../hooks/useMeal";
import MealsCategoryTab from "../MealsCategoryTab";

const MealsTabs = () => {
  const categories = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Vegetarian",
    "Snacks",
    "All Meals",
  ];
  const [meal] = useMeal();

  const breakfast = meal.filter((item) => item.category === "breakfast");
  const lunch = meal.filter((item) => item.category === "lunch");
  const dinner = meal.filter((item) => item.category === "dinner");
  const snacks = meal.filter((item) => item.category === "snacks");
  const vegetarian = meal.filter((item) => item.category === "vegetarian");
  const all_Meals = meal.filter((item) => item.category === "all Meals");

  return (
    <div className="px-4 md:px-10 py-10 bg-gray-50">
      <section className="my-10 max-w-6xl mx-auto">
        <Tabs>
          {/* Tab List */}
          <TabList className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8">
            {categories.map((category, index) => (
              <Tab
                key={index}
                className="py-2 px-4 text-sm md:text-base font-medium border-b-2 border-transparent hover:border-blue-500 focus:outline-none cursor-pointer transition"
                selectedClassName="border-blue-500 text-blue-600"
              >
                {category}
              </Tab>
            ))}
          </TabList>

          {/* Tab Panels */}
          <TabPanel>
            <MealsCategoryTab items={breakfast}></MealsCategoryTab>
          </TabPanel>
          <TabPanel>
            <MealsCategoryTab items={lunch}></MealsCategoryTab>
          </TabPanel>
          <TabPanel>
            <MealsCategoryTab items={dinner}></MealsCategoryTab>
          </TabPanel>
          <TabPanel>
            <MealsCategoryTab items={snacks}></MealsCategoryTab>
          </TabPanel>
          <TabPanel>
            <MealsCategoryTab items={vegetarian}></MealsCategoryTab>
          </TabPanel>
          <TabPanel>
            <MealsCategoryTab items={all_Meals}></MealsCategoryTab>
          </TabPanel>
        </Tabs>
      </section>
    </div>
  );
};

export default MealsTabs;
