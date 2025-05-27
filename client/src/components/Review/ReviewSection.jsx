import React, { useState } from "react";
import ReviewForm from "./form";
import ReviewList from "./list";
import { useSelector } from "react-redux";

const ReviewSection = ({
  destinationId,
  reviews,
  loading = false,
  error = false,
}) => {
  const { isLoggedIn } = useSelector((state) => state?.auth);
  //   const { reviews, loading, error } = useReviews(destinationId);
  const [showForm, setShowForm] = useState(false);
  console.log(destinationId);
  const handleReviewSubmitted = () => {
    setShowForm(false);
    // You might want to refetch reviews here or handle optimistic updates
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4 mb-8">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="h-40 bg-gray-200 rounded"></div>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8">
        <p>{error}</p>
        <button
          className="mt-2 text-sm text-red-700 underline"
          onClick={() => window.location.reload()}
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Traveler Reviews
      </h2>

      {!showForm && isLoggedIn && (
        <div className="mb-6">
          <button
            onClick={() => setShowForm(true)}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Write a Review
          </button>
        </div>
      )}

      {showForm && (
        <div className="mb-8">
          <ReviewForm
            destinationId={destinationId}
            onReviewSubmitted={handleReviewSubmitted}
            isAuthenticated={isLoggedIn}
          />
        </div>
      )}

      <ReviewList reviews={reviews} isAuthenticated={isLoggedIn} />
    </section>
  );
};

export default ReviewSection;
