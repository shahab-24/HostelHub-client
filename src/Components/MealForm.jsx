import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios, { AxiosHeaders } from "axios";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const MealForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [uploadImagePreview, setUploadImagePreview] = useState();
  // Validation Schema
  const schema = yup.object().shape({
    title: yup.string().required("Meal title is required"),
    category: yup
      .string()
      .oneOf(["Breakfast", "Lunch", "Dinner", "All-meals", "Snack"], "Invalid category")
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      distributorName: user?.displayName,
      distributorEmail: user?.email,
      rating: 0,
      likes: 0,
      reviews_count: 0,
    },
  });

  // Handle form submission
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Upload image to ImageBB
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const imageResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      );

      const imageUrl = imageResponse.data.data.display_url;

      // Add meal data with uploaded image URL
      const mealData = {
        ...data,
        image: imageUrl,
        post_time: new Date().toISOString(),
      };

      await axiosSecure.post("/api/meals", mealData);
      console.log("Meal Data:", data);
      toast.success("Meal added successfully!");
      reset();
    } catch (error) {
      console.error("Error adding meal:", error);
      toast.error("Failed to add meal. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Helmet>
        <title>Add Meals | Dashboard</title>
      </Helmet>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Add New Meal
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Meal Title
            </label>
            <input
              type="text"
              {...register("title")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter meal title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              {...register("category")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select Category</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="All-meals">All Meals</option>
              <option value="Snack">Snack</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              {...register("image")}
              className="mt-1 block w-full text-gray-600 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              accept="image/*"
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}
          </div>

          {/* Ingredients */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ingredients (Comma Separated)
            </label>
            <input
              type="text"
              {...register("ingredients")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g., Chicken, Garlic, Onion"
            />
            {errors.ingredients && (
              <p className="text-red-500 text-sm">
                {errors.ingredients.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register("description")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Write a short description"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price (USD)
            </label>
            <input
              type="number"
              {...register("price")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter price"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>

          {/* Distributor Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Distributor Name
            </label>
            <input
              type="text"
              {...register("distributorName")}
              className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm"
              readOnly
            />
          </div>

          {/* Distributor Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Distributor Email
            </label>
            <input
              type="email"
              {...register("distributorEmail")}
              className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm"
              readOnly
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Add Meal
          </button>
        </form>
      </div>
    </div>
  );
};

export default MealForm;
