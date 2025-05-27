import React, { useState } from "react";
import { Filter } from "lucide-react";
import ReviewItem from "./reviewItem";

const ReviewList = ({ reviews }) => {
  const [sortBy, setSortBy] = useState("newest");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterRating, setFilterRating] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "experience", label: "Overall Experience" },
    { value: "accommodation", label: "Accommodation" },
    { value: "food", label: "Food & Dining" },
    { value: "transportation", label: "Transportation" },
    { value: "value", label: "Value for Money" },
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "highest", label: "Highest Rated" },
    { value: "lowest", label: "Lowest Rated" },
    { value: "most-helpful", label: "Most Helpful" },
  ];

  // Apply filters and sort
  const filteredAndSortedReviews = [...reviews]
    .filter(
      (review) =>
        (filterCategory === "all" || review.category === filterCategory) &&
        (filterRating === null || review.rating === filterRating)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "highest":
          return b.rating - a.rating;
        case "lowest":
          return a.rating - b.rating;
        case "most-helpful":
          return b.helpfulCount - a.helpfulCount;
        default:
          return 0;
      }
    });

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md border border-gray-100 mb-8">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Reviews
            <span className="ml-2 text-gray-500 text-lg font-normal">
              ({reviews.length})
            </span>
          </h2>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            <Filter className="h-4 w-4 mr-2" />
            <span>Filter</span>
          </button>
        </div>

        {showFilters && (
          <div className="p-4 bg-gray-50 rounded-lg mb-4 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Sort Options */}
              <div>
                <label className="block text-gray-700 mb-2 text-sm font-medium">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-gray-700 mb-2 text-sm font-medium">
                  Category
                </label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value | "all")}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-gray-700 mb-2 text-sm font-medium">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <button
                      key={rating}
                      onClick={() =>
                        setFilterRating(filterRating === rating ? null : rating)
                      }
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                        filterRating === rating
                          ? "bg-amber-400 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {rating}★
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Reset Filters Button */}
            <button
              onClick={() => {
                setFilterCategory("all");
                setFilterRating(null);
                setSortBy("newest");
              }}
              className="mt-3 text-sm text-blue-600 hover:text-blue-800"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Review Stats */}
        <div className="flex items-center space-x-4">
          <div className="flex items-end">
            <span className="text-4xl font-bold text-gray-800">
              {reviews.length > 0
                ? (
                    reviews.reduce((sum, review) => sum + review.rating, 0) /
                    reviews.length
                  ).toFixed(1)
                : "0.0"}
            </span>
            <span className="text-gray-500 ml-1 mb-1">/5</span>
          </div>

          <div className="flex-1 max-w-xs">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = reviews.filter((r) => r.rating === rating).length;
              const percentage =
                reviews.length > 0 ? (count / reviews.length) * 100 : 0;

              return (
                <div key={rating} className="flex items-center text-sm my-1">
                  <span className="w-3 text-gray-600">{rating}</span>
                  <div className="w-full bg-gray-200 rounded-full h-2 mx-2 overflow-hidden">
                    <div
                      className="bg-amber-400 h-2 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="w-8 text-gray-500 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="divide-y divide-gray-100">
        {filteredAndSortedReviews.length > 0 ? (
          filteredAndSortedReviews.map((review) => (
            <div key={review._id} className="p-6">
              <ReviewItem review={review} />
            </div>
          ))
        ) : (
          <div className="p-10 text-center">
            <p className="text-gray-500 mb-2">No reviews match your filters</p>
            <button
              onClick={() => {
                setFilterCategory("all");
                setFilterRating(null);
              }}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewList;
