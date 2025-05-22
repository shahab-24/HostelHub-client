import { useState } from "react";
import { FaStar } from "react-icons/fa";
import Button from "../Shared/Button";


const CommentForm = ({ onSubmit }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleCommentChange = (e) => {
    if (e.target.value.length <= 300) {
      setComment(e.target.value);
    }
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedComment = comment.trim();

    if (!trimmedComment || rating === 0) {
      return; // Prevent submission if comment is empty/whitespace or no rating
    }

    onSubmit({ comment: trimmedComment, rating });
    setComment("");
    setRating(0);
  };

  const isFormValid = comment.trim().length > 0 && rating > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-xl">
      <div>
        <label htmlFor="comment" className="block font-medium mb-1">
          Comment (max 300 chars)
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={handleCommentChange}
          placeholder="Write your comment..."
          className="w-full p-2 border rounded-md"
          rows={4}
          maxLength={300}
        />
        <div className="text-sm text-gray-500 text-right">
          {comment.length}/300
        </div>
      </div>

      <div>
        <label className="block font-medium mb-1">Rating</label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`cursor-pointer text-2xl ${
                star <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
              onClick={() => handleRatingChange(star)}
            />
          ))}
        </div>
      </div>

      <Button type="submit" disabled={!isFormValid}>
        Submit
      </Button>
    </form>
  );
};

export default CommentForm;
