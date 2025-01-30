import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";

// Validation Schema
const schema = yup.object().shape({
  title: yup.string().required("Meal title is required"),
  category: yup
    .string()
    .oneOf(
      ["Breakfast", "Lunch", "Dinner", "All-meals", "Dessert"],
      "Invalid category"
    )
    .required("Category is required"),
  image: yup.mixed().required("Image is required"),
  ingredients: yup.string().required("Ingredients are required"),
  description: yup.string().required("Description is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
});

const UpcomingMealForm = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      distributorName: user?.displayName,
      distributorEmail: user?.email,
      rating: 0,
      likes: 0,
      reviews_count: 0,
      status: "published",
    },
  });

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const imageResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        formData
      );

      const imageUrl = imageResponse.data.data.display_url;

      const mealData = {
        ...data,
        image: imageUrl,
        post_time: new Date().toISOString(),
      };

      await axiosSecure.post("/api/meals", mealData);
      toast.success("Meal added successfully!");
      reset();
    } catch (error) {
      console.error("Error adding meal:", error);
      toast.error("Failed to add meal. Please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 max-w-lg mx-auto rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-white mb-4 text-center">Add Upcoming Meal</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Meal Title */}
        <div>
          <label className="block text-sm font-medium text-white">Meal Title</label>
          <input
            type="text"
            {...register("title")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter meal title"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-white">Category</label>
          <select
            {...register("category")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Category</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
            <option value="All-meals">All Meals</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-white">Upload Image</label>
          <input
            type="file"
            {...register("image")}
            className="mt-1 block w-full text-gray-600 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            accept="image/*"
          />
          {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-sm font-medium text-white">Ingredients</label>
          <input
            type="text"
            {...register("ingredients")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="e.g., Chicken, Garlic, Onion"
          />
          {errors.ingredients && <p className="text-red-500 text-sm">{errors.ingredients.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-white">Description</label>
          <textarea
            {...register("description")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Write a short description"
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-white">Price (USD)</label>
          <input
            type="number"
            {...register("price")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter price"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>

        {/* Distributor Name */}
        <div>
          <label className="block text-sm font-medium text-white">Distributor Name</label>
          <input
            type="text"
            {...register("distributorName")}
            className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm"
            readOnly
          />
        </div>

        {/* Distributor Email */}
        <div>
          <label className="block text-sm font-medium text-white">Distributor Email</label>
          <input
            type="email"
            {...register("distributorEmail")}
            className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm"
            readOnly
          />
        </div>

        <div className="flex justify-end space-x-4 mt-4">
          <button type="reset" className="btn btn-secondary bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md">
            Reset
          </button>
          <button type="submit" className="btn btn-primary bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-md">
            Add Meal
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpcomingMealForm;
