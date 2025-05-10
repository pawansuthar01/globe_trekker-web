import React, { useState } from "react";
import { Star, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import ImageWithLoaderPercentage from "../Skeleton/imageLoder";
import ShortVideoCard, { VideoPlayIcon } from "./videoCard";
const HighlightCard = ({ highlight }) => {
  // Log the highlight to understand its structure

  const [expanded, setExpanded] = useState(false);
  const [showVideo, setShowVideo] = useState(null);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // Ensure highlight.text is not undefined
  const highlightText = highlight?.description || "";

  // Determine if the highlight text should be truncated
  const shouldTruncate = highlightText.length > 150;
  const truncatedText =
    shouldTruncate && !expanded
      ? `${highlightText.substring(0, 150)}...`
      : highlightText;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <ImageWithLoaderPercentage
          src={highlight?.image}
          alt={highlight?.location}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center text-white">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">{highlight?.location}</span>
          </div>
        </div>
        {highlight?.video && (
          <div className="absolute top-0 right-0 p-4">
            <div
              onClick={() => setShowVideo(highlight?._id)}
              className="flex items-center text-white"
            >
              <VideoPlayIcon />
            </div>

            {showVideo === highlight?._id && (
              <ShortVideoCard
                isClose={() => setShowVideo(null)}
                videoUrl={highlight?.video}
                title={highlight?.name}
              />
            )}
          </div>
        )}
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
            <ImageWithLoaderPercentage
              src={highlight?.avatar}
              alt={highlight?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{highlight?.name}</h3>
            <p className="text-xs text-gray-500">{highlight?.date}</p>
          </div>
        </div>

        <div className="flex mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              fill={i < highlight?.rating ? "currentColor" : "none"}
              className="h-4 w-4 text-yellow-500"
            />
          ))}
        </div>

        <blockquote className="italic text-gray-700 text-sm mb-3 flex-grow">
          "{truncatedText}"
        </blockquote>

        {shouldTruncate && (
          <button
            onClick={toggleExpanded}
            className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium mt-2"
          >
            {expanded ? (
              <>
                <span>Show less</span>
                <ChevronUp className="h-4 w-4 ml-1" />
              </>
            ) : (
              <>
                <span>Read more</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default HighlightCard;
