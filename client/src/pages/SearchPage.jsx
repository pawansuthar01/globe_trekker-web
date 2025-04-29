import React, { useState } from "react";
import { Search, MapPin, Calendar } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ImageWithLoaderPercentage from "../components/Skeleton/imageLoder";
import { destinationsData } from "./DestinationPages/Destination";
import { storiesData } from "./StoriesPage/Stories";
const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();
  // Mock search results - replace with API integration
  const results = {
    destinations: destinationsData,
    stories: storiesData,
  };

  const allResults = [...results.destinations, ...results.stories];
  const displayResults =
    activeTab === "all"
      ? allResults
      : activeTab === "destinations"
      ? results.destinations
      : results.stories;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search destinations, stories, and more..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-4 px-6 pl-14 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300 text-lg"
            />
            <Search className="absolute left-4 top-4 h-6 w-6 text-neutral-400" />
          </div>
        </div>

        <div className="mb-8 border-b border-neutral-200">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("all")}
              className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
                activeTab === "all"
                  ? "text-primary-600 border-b-2 border-primary-600"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              All Results ({allResults.length})
            </button>
            <button
              onClick={() => setActiveTab("destinations")}
              className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
                activeTab === "destinations"
                  ? "text-primary-600 border-b-2 border-primary-600"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Destinations ({results.destinations.length})
            </button>
            <button
              onClick={() => setActiveTab("stories")}
              className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
                activeTab === "stories"
                  ? "text-primary-600 border-b-2 border-primary-600"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Stories ({results.stories.length})
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayResults.map((result) => (
            <div
              key={result.id}
              onClick={() =>
                result.type === "Destinations"
                  ? navigate(`/destinations/${result.id}`, {
                      state: { destination: result },
                    })
                  : navigate(`/stories/${result.id}`, {
                      state: { story: result },
                    })
              }
              className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <ImageWithLoaderPercentage
                  src={result.image}
                  alt={result.name || result.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-neutral-900 text-xs font-medium px-2 py-1 rounded">
                  {result.category}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-neutral-800 mb-2 group-hover:text-primary-600 transition-colors">
                  {result.name || result.title}
                </h3>
                <p className="text-neutral-600 text-sm mb-3">
                  {result.description || result.excerpt}
                </p>
                {result.category === "Stories" && (
                  <div className="flex items-center text-xs text-neutral-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>
                      {new Date(result.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                )}
                {result.category === "Destinations" && (
                  <div className="flex items-center text-xs text-neutral-500">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>View destination</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
