
import { useForm } from "react-hook-form";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AddMealModal = ({ isOpen, onClose, refetch }) => {
        const axiosSecure = useAxiosSecure()
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        await axiosSecure.post("/api/upcoming-meals", data)
        

        // await fetch("http://localhost:5000/api/upcoming-meals", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(data),
        // });
        reset();
        onClose();
        refetch();
        return data
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-xl font-bold mb-4">Add Upcoming Meal</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        {...register("title", { required: true })}
                        placeholder="Meal Title"
                        className="input input-bordered w-full mb-4"
                    />
                    <select
        {...register("category", { required: true })}
        className="select select-bordered w-full mb-4"
    >
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Snacks">Snacks</option>
        <option value="All Meals">All Meals</option>
    </select>
                    <input
                        {...register("image", { required: true })}
                        placeholder="Image URL"
                        className="input input-bordered w-full mb-4"
                    />
                    <textarea
                        {...register("description", { required: true })}
                        placeholder="Description"
                        className="textarea textarea-bordered w-full mb-4"
                    />
                    <input
                        {...register("publishDate", { required: true })}
                        type="date"
                        className="input input-bordered w-full mb-4"
                    />
                    <div className="flex justify-end space-x-2">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Add Upcoming Meal
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMealModal;
