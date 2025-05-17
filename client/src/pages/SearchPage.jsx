import React, { useState, useMemo, useRef, useEffect } from "react";
import { Search, MapPin, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ImageWithLoaderPercentage from "../components/Skeleton/imageLoder";
import { SearchBar } from "../components/Search-bar";
import { useSelector } from "react-redux";

const SearchPage = () => {
  const { stories } = useSelector((state) => state?.story);
  const { destinations } = useSelector((state) => state?.destination);

  const searchQuery = new URLSearchParams(window.location.search).get("q");
  const searchRef = useRef();
  const [activeTab, setActiveTab] = useState("all");
  const [searchResults, setSearchResults] = useState({
    destinations: [],
    stories: [],
  });
  const navigate = useNavigate();

  const handleSearchSuccess = (data) => {
    setSearchResults({
      destinations: data.destinations || [],
      stories: data.stories || [],
    });
  };

  const handleSearchFailure = () => {
    setSearchResults({ destinations: [], stories: [] });
  };

  const allResults = useMemo(
    () => [...searchResults.destinations, ...searchResults.stories],
    [searchResults]
  );

  const filteredResults = useMemo(() => {
    if (activeTab === "all") return allResults;
    return activeTab === "destinations"
      ? searchResults.destinations
      : searchResults.stories;
  }, [activeTab, searchResults, allResults]);

  const tabCounts = {
    all: allResults.length,
    destinations: searchResults.destinations.length,
    stories: searchResults.stories.length,
  };

  const handleCardClick = (result) => {
    const path = result.type === "Destination" ? "/destinations" : "/stories";
    navigate(`${path}/${result._id}`, {
      state: {
        [result.type === "Destination" ? "destination" : "story"]: result,
      },
    });
  };
  const handelSetDestinationAndStories = () => {
    setSearchResults({
      destinations: destinations || [],
      stories: stories || [],
    });
  };

  useEffect(() => {
    if (searchQuery) {
      searchRef.current?.runSearch?.(searchQuery); // call it on page load
    }
  }, [searchQuery]);
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <SearchBar
            Data={handleSearchSuccess}
            searchQuery={searchQuery}
            NoSearchData={handleSearchFailure}
            AllStoriesAndDestination={true}
            oldData={handelSetDestinationAndStories}
          />
        </div>

        {/* Tabs */}

        <div className="mb-8 border-b border-neutral-200">
          <div className="flex space-x-8" role="tablist">
            {["all", "destinations", "stories"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
                  activeTab === tab
                    ? "text-primary-600 border-b-2 border-primary-600"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
                role="tab"
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} ({tabCounts[tab]})
              </button>
            ))}
          </div>
        </div>

        {/* Search Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResults.map((result) => (
            <div
              key={result._id}
              onClick={() => handleCardClick(result)}
              className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <ImageWithLoaderPercentage
                  src={result?.coverImage?.url || result.thumbnail.url}
                  alt={result.name || result.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-blue-500/50 backdrop-blur-sm text-neutral-900 text-xs font-medium px-2 py-1 rounded">
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

                {result.category === "Stories" && result.date && (
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
