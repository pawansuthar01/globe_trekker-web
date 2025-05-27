import React, { useState } from "react";
import { ThumbsUp, ThumbsDown, Star, Flag } from "lucide-react";
import { useSelector } from "react-redux";
import formatDate from "../../utils/DataFormat";

const categoryColors = {
  experience: "bg-blue-100 text-blue-700",
  accommodation: "bg-purple-100 text-purple-700",
  food: "bg-orange-100 text-orange-700",
  transportation: "bg-green-100 text-green-700",
  value: "bg-amber-100 text-amber-700",
};

const categoryLabels = {
  experience: "Overall Experience",
  accommodation: "Accommodation",
  food: "Food & Dining",
  transportation: "Transportation",
  value: "Value for Money",
};

const ReviewItem = ({ review }) => {
  const { isLoggedIn } = useSelector((state) => state?.auth);
  const [helpfulCount, setHelpfulCount] = useState(review.helpfulCount || 0);
  const [unhelpfulCount, setUnhelpfulCount] = useState(
    review.unhelpfulCount || 0
  );
  const [userVote, setUserVote] = useState(null);
  const [showFullText, setShowFullText] = useState(false);

  const isLongReview = review.text.length > 300;
  const displayText =
    showFullText || !isLongReview
      ? review.text
      : `${review.text.substring(0, 300)}...`;

  const handleVote = (voteType) => {
    if (!isLoggedIn) {
      console.log("User must be logged in to vote");
      return;
    }
    console.log(voteType);
    // Remove previous vote if changing vote
    if (userVote === "helpful" && voteType === "unhelpful") {
      setHelpfulCount((prev) => prev - 1);
      setUnhelpfulCount((prev) => prev + 1);
      setUserVote("unhelpful");
    } else if (userVote === "unhelpful" && voteType === "helpful") {
      setUnhelpfulCount((prev) => prev - 1);
      setHelpfulCount((prev) => prev + 1);
      setUserVote("helpful");
    }
    // Add new vote
    else if (userVote === null) {
      if (voteType === "helpful") {
        setHelpfulCount((prev) => prev + 1);
      } else {
        setUnhelpfulCount((prev) => prev + 1);
      }
      setUserVote(voteType);
    }
    // Remove vote if clicking the same button again
    else if (userVote === voteType) {
      if (voteType === "helpful") {
        setHelpfulCount((prev) => prev - 1);
      } else {
        setUnhelpfulCount((prev) => prev - 1);
      }
      setUserVote(null);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 transition-all hover:shadow-md border border-gray-100 animate-fade-in">
      <div className="flex items-start">
        {/* User Avatar and Info */}
        <div className="mr-4">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl overflow-hidden">
            {review.userAvatar ? (
              <img
                src={review.userAvatar}
                alt={review.userName}
                className="h-full w-full object-cover"
              />
            ) : (
              review.userName.charAt(0).toUpperCase()
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          {/* User Name and Date */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
            <h4 className="font-semibold text-gray-800">{review.userName}</h4>
            <span className="text-gray-500 text-sm">
              {formatDate(review.createdAt)}
            </span>
          </div>

          {/* Rating and Category */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < review.rating
                      ? "text-amber-400 fill-amber-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                categoryColors[review.category]
              }`}
            >
              {categoryLabels[review.category]}
            </span>
          </div>

          {/* Review Text */}
          <p className="text-gray-600 mb-4 leading-relaxed">{displayText}</p>

          {isLongReview && (
            <button
              onClick={() => setShowFullText(!showFullText)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-4"
            >
              {showFullText ? "Show less" : "Read more"}
            </button>
          )}

          {/* Feedback and Report */}
          <div className="flex flex-wrap items-center justify-between mt-2 pt-2 border-t border-gray-100">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleVote("helpful")}
                disabled={!isLoggedIn}
                className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-sm ${
                  userVote === "helpful"
                    ? "bg-green-100 text-green-700"
                    : "text-gray-500 hover:bg-gray-100"
                } ${!isLoggedIn ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <ThumbsUp className="h-4 w-4" />
                <span>{helpfulCount}</span>
              </button>

              <button
                onClick={() => handleVote("unhelpful")}
                disabled={!isLoggedIn}
                className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-sm ${
                  userVote === "unhelpful"
                    ? "bg-red-100 text-red-700"
                    : "text-gray-500 hover:bg-gray-100"
                } ${!isLoggedIn ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <ThumbsDown className="h-4 w-4" />
                <span>{unhelpfulCount}</span>
              </button>
            </div>

            {isLoggedIn && (
              <button className="text-gray-400 hover:text-red-500 text-sm flex items-center">
                <Flag className="h-4 w-4 mr-1" />
                <span>Report</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
