import React, { useEffect, useState } from "react";
import { MapPin, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ImageWithLoaderPercentage from "../../components/Skeleton/imageLoder";
import { useDispatch } from "react-redux";
import { fetchAllDestinations } from "../../Redux/Slice/detinationSlice";
import DestinationSkeleton from "../../components/Skeleton/destinationPageSkeleton";

const categories = [
  { id: "all", name: "All" },
  { id: "europe", name: "Europe" },
  { id: "asia", name: "Asia" },
  { id: "africa", name: "Africa" },
  { id: "americas", name: "Americas" },
  { id: "oceania", name: "Oceania" },
];

const tags = [
  "beaches",
  "nature",
  "culture",
  "hiking",
  "food",
  "architecture",
  "history",
  "city",
  "island",
  "scenic",
];

const DestinationsPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTags, setActiveTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  const toggleTag = (tag) => {
    if (activeTags.includes(tag)) {
      setActiveTags(activeTags.filter((t) => t !== tag));
    } else {
      setActiveTags([...activeTags, tag]);
    }
  };
  const fetchDestinationsData = async () => {
    setLoading(true);
    const res = await dispatch(fetchAllDestinations());
    if (res?.payload?.success) {
      setDestination(res?.payload?.data);
    }
    setLoading(false);
  };

  const filteredDestinations = destination?.filter((destination) => {
    // Filter by category
    if (activeCategory !== "all" && destination.category !== activeCategory) {
      return false;
    }

    // Filter by search term
    if (
      searchTerm &&
      !destination.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    // Filter by tags
    if (
      activeTags.length > 0 &&
      !destination.tags.some((tag) => activeTags.includes(tag))
    ) {
      return false;
    }

    return true;
  });
  useEffect(() => {
    fetchDestinationsData();
    console.log(destination);
  }, []);
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Explore Destinations
          </h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Discover breathtaking landscapes, vibrant cultures, and
            unforgettable experiences across the globe.
          </p>
        </header>

        {/* Search and filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 px-4 pl-10 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
              <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-neutral-400" />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-neutral-300 bg-white"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Desktop filters */}
          <div className="hidden md:block">
            <div className="mb-4">
              <div className="font-medium mb-2">Regions:</div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      activeCategory === category.id
                        ? "bg-primary-600 text-white"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="font-medium mb-2">Experience:</div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      activeTags.includes(tag)
                        ? "bg-accent-500 text-white"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile filters */}
          {showFilters && (
            <div className="md:hidden bg-white p-4 rounded-lg border border-neutral-300 mt-2">
              <div className="mb-4">
                <div className="font-medium mb-2">Regions:</div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        activeCategory === category.id
                          ? "bg-primary-600 text-white"
                          : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-medium mb-2">Experience:</div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        activeTags.includes(tag)
                          ? "bg-accent-500 text-white"
                          : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Destinations grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <DestinationSkeleton key={index} />
            ))}
          </div>
        ) : filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDestinations.map((destination) => (
              <div
                onClick={() =>
                  navigate(`/destinations/${destination._id}`, {
                    state: { destination },
                  })
                }
                key={destination._id}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithLoaderPercentage
                    src={destination?.thumbnail.url}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-neutral-800 mb-2 group-hover:text-primary-600 transition-colors">
                    {destination.name}
                  </h3>
                  <p className="text-neutral-600 text-sm mb-3 line-clamp-2">
                    {destination.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {destination.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-neutral-500 text-lg mb-4">
              No destinations found matching your criteria.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setActiveTags([]);
                setSearchTerm("");
              }}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationsPage;
