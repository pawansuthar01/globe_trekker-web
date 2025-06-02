import React, { useState } from "react";
import { Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../../Redux/Slice/detinationSlice";
import { useNavigate } from "react-router-dom";

const ReviewForm = ({ slug, onReviewSubmitted }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state?.auth);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [category, setCategory] = useState("experience");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const categories = [
    {
      value: "experience",
      label: "Overall Experience",
      color: "bg-blue-100 text-blue-700",
    },
    {
      value: "accommodation",
      label: "Accommodation",
      color: "bg-purple-100 text-purple-700",
    },
    {
      value: "food",
      label: "Food & Dining",
      color: "bg-orange-100 text-orange-700",
    },
    {
      value: "transportation",
      label: "Transportation",
      color: "bg-green-100 text-green-700",
    },
    {
      value: "value",
      label: "Value for Money",
      color: "bg-amber-100 text-amber-700",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    if (reviewText.trim().length < 20) {
      setError("Review must be at least 20 characters long");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // This would be replaced with your actual API call
      // Example: await api.postReview({ destinationId, rating, reviewText, category });
      const form = {
        rating,
        category,
        text: reviewText,
      };
      const res = await dispatch(addReview({ slug: slug, review: form }));
      if (res?.payload?.success) {
        setError("SuccessFully add , review...");
      } else {
        setError("Failed to submit review. Please try again.");
        return;
      }
      setRating(0);
      setReviewText("");
      setCategory("experience");
      onReviewSubmitted();
    } catch (err) {
      setError("Failed to submit review. Please try again.");
      console.error("Error submitting review:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="bg-blue-50 rounded-lg p-6 text-center border border-blue-100">
        <h3 className="text-lg font-medium text-blue-800 mb-2">
          Want to share your experience?
        </h3>
        <p className="text-blue-600 mb-4">Please log in to leave a review</p>
        <button
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          onClick={() => navigate("/login")}
        >
          Log In
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 transition-all hover:shadow-md border border-gray-100">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Write a Review
      </h3>

      <form onSubmit={handleSubmit}>
        {/* Rating Selection */}
        <div className="mb-5">
          <label className="block text-gray-700 mb-2 font-medium">Rating</label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="text-2xl transition-all focus:outline-none"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <Star
                  className={`h-8 w-8 ${
                    (hoverRating || rating) >= star
                      ? "text-amber-400 fill-amber-400"
                      : "text-gray-300"
                  } transition-colors`}
                />
              </button>
            ))}
            <span className="ml-2 text-gray-600">
              {rating > 0
                ? `${rating} star${rating > 1 ? "s" : ""}`
                : "Select rating"}
            </span>
          </div>
        </div>

        {/* Category Selection */}
        <div className="mb-5">
          <label className="block text-gray-700 mb-2 font-medium">
            Review Category
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setCategory(cat.value)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  category === cat.value
                    ? cat.color
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Review Text */}
        <div className="mb-5">
          <label
            htmlFor="reviewText"
            className="block text-gray-700 mb-2 font-medium"
          >
            Your Review
          </label>
          <textarea
            id="reviewText"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors resize-none"
            rows={4}
            placeholder="Share your experience with this destination..."
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            {reviewText.length}/500 characters (minimum 20)
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-100">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 rounded-lg font-medium transition-colors ${
            isSubmitting
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
