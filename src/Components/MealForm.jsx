import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const MealForm = () => {
  const navigate = useNavigate();

  // Validation Schema using Yup
  const schema = yup.object().shape({
    name: yup.string().required("Meal name is required"),
    category: yup
      .string()
      .oneOf(["Breakfast", "Lunch", "Dinner"], "Invalid category")
      .required("Meal category is required"),
    description: yup.string().required("Description is required"),
    ingredients: yup
      .string()
      .required("At least one ingredient is required"),
    price: yup
      .number()
      .typeError("Price must be a number")
      .positive("Price must be positive")
      .required("Meal price is required"),
    image: yup
      .string()
      .url("Invalid URL format")
      .required("Image URL is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      likes: 0,
      reviews: [],
      distributor: "admin@example.com", // Example default admin email
    },
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("Meal added successfully!");

    // Navigate to the confirmation or meal list page
    navigate("/meals"); // Replace `/meals` with your desired route
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Add New Meal
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Meal Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Meal Name
            </label>
            <input
              type="text"
              {...register("name")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter meal name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Meal Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Meal Category
            </label>
            <select
              {...register("category")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select Category</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
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
              placeholder="Enter a brief description"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description.message}</p>
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
              placeholder="e.g., Tomato, Cheese, Basil"
            />
            {errors.ingredients && (
              <p className="text-red-500 text-sm">
                {errors.ingredients.message}
              </p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              {...register("price")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter meal price"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Meal Image URL
            </label>
            <input
              type="text"
              {...register("image")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter image URL"
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}
          </div>

          {/* Distributor */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Distributor (Admin)
            </label>
            <input
              type="text"
              {...register("distributor")}
              className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              readOnly
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
          >
            Add Meal
          </button>
        </form>
      </div>
    </div>
  );
};

export default MealForm;
