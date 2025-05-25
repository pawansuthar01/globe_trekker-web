import { Heart, HeartOff, Share2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  FavoriteListAddDestination,
  FavoriteListAddStory,
  FavoriteListRemoveDestination,
  FavoriteRemoveStory,
} from "../Redux/Slice/authSlice";
import { useEffect, useState } from "react";

const variantClasses = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  danger: "bg-red-600 hover:bg-red-700 text-white",
  secondary: "bg-gray-200 hover:bg-gray-300 text-black",
};

const ButtonUI = ({
  onClick,
  children,
  variant = "primary",
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
export const FavoriteButton = ({
  Id,

  type = "Destination", // "Destination" or "Story"
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const {
    favoriteDestinations = [],
    favoriteStories = [],
    isLoggedIn,
  } = useSelector((state) => state?.auth);
  const [isFavorited, setIsFavorited] = useState(() =>
    type === "Destination"
      ? favoriteDestinations.includes(Id)
      : favoriteStories.includes(Id)
  );

  useEffect(() => {
    if (type === "Destination") {
      setIsFavorited(favoriteDestinations.includes(Id));
    } else {
      setIsFavorited(favoriteStories.includes(Id));
    }
  }, [favoriteDestinations, favoriteStories, Id, type]);

  const handleFavorite = async () => {
    if (!isLoggedIn) {
      alert("Please log in to save to favorites");
      return;
    }

    setLoading(true);

    let res;
    if (isFavorited) {
      // Remove from favorites
      if (type === "Destination") {
        res = await dispatch(FavoriteListRemoveDestination(Id));
        if (res?.payload?.success) {
          setIsFavorited(false);
        }
      } else {
        res = await dispatch(FavoriteRemoveStory(Id));
        if (res?.payload?.success) {
          setIsFavorited(false);
        }
      }
    } else {
      // Add to favorites
      if (type === "Destination") {
        res = await dispatch(FavoriteListAddDestination(Id));
        if (res?.payload?.success) {
          setIsFavorited(true);
        }
      } else {
        res = await dispatch(FavoriteListAddStory(Id));
        if (res?.payload?.success) {
          setIsFavorited(true);
        }
      }
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleFavorite}
      className={`w-full ${
        isFavorited
          ? "bg-red-600 hover:bg-red-700"
          : "bg-blue-600 hover:bg-blue-700"
      } text-white py-3  px-6 rounded-lg font-medium transition-all hover:shadow-lg flex items-center justify-center gap-2`}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <svg
            className="h-5 w-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <span className="text-sm text-white">Saving...</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {isFavorited ? (
            <HeartOff className="h-5 w-5 text-white" />
          ) : (
            <Heart className="h-5 w-5 text-white" />
          )}
          <span className="text-sm">
            {isFavorited ? "Saved to Favorites" : "Save to Favorites"}
          </span>
        </div>
      )}
    </button>
  );
};
export function ShareButton({
  title = "Check this out!",
  description = "This is a beautiful place.",
  url = window.location.href,
}) {
  const handleShare = async () => {
    const fullMessage = `📍 ${title}\n\n${description}\n\nVisit: ${url}`;

    if (navigator.share) {
      try {
        await navigator.share({
          text: fullMessage,
        });
        console.log("Shared successfully");
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(fullMessage);
        alert("Copied to clipboard!");
      } catch {
        alert("Failed to copy.");
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 p-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
    >
      <Share2 className="h-5 w-5" />
      <span className="sr-only md:not-sr-only">Share</span>
    </button>
  );
}

export default ButtonUI;
