import React, { useEffect, useState } from "react";
import { MapPin, Filter, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ImageWithLoaderPercentage from "../../components/Skeleton/imageLoder";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDestinations } from "../../Redux/Slice/detinationSlice";
import DestinationSkeleton from "../../components/Skeleton/destinationPageSkeleton";
import { SearchBar } from "../../components/Search-bar";

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
  const { destinations, success, error, totalPages, page } = useSelector(
    (state) => state.destination
  );
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(page);
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTags, setActiveTags] = useState([]);
  const [search, setSearch] = useState(false);
  const [searchError, setSearchError] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  const toggleTag = (tag) => {
    const lowerTag = tag.toLowerCase();
    if (activeTags.includes(lowerTag)) {
      setActiveTags(activeTags.filter((t) => t !== lowerTag));
    } else {
      setActiveTags([...activeTags, lowerTag]);
    }
  };
  const fetchDestinationsData = async (page = 1) => {
    setLoading(true);

    const res = await dispatch(fetchAllDestinations({ page, limit: 25 }));

    if (res?.payload?.success) {
      setDestination(res.payload.data);
      setCurrentPage(res.payload.page);
    }

    setLoading(false);
  };
  const getSimplifiedRegion = (regionName) => {
    const name = regionName.toLowerCase().trim();

    if (name.includes("europe") || name.includes("île-de-france"))
      return "europe";
    if (
      name.includes("asia") ||
      name.includes("aisa") || // handle typo
      name.includes("meghalaya") ||
      name.includes("uttarakhand") ||
      name.includes("himachal") ||
      name.includes("karnataka") ||
      name.includes("lakshadweep") ||
      name.includes("uttar pradesh") ||
      name.includes("kansai")
    )
      return "asia";
    if (name.includes("africa")) return "africa";
    if (name.includes("america") || name.includes("caribbean"))
      return "americas";
    if (name.includes("oceania") || name.includes("australia"))
      return "oceania";

    return "other";
  };
  const filteredDestinations = destination?.filter((destination) => {
    if (
      activeCategory !== "all" &&
      getSimplifiedRegion(destination.location?.region || "") !== activeCategory
    ) {
      return false;
    }

    // Filter by search term

    // Filter by tags
    if (
      activeTags.length > 0 &&
      (!Array.isArray(destination.tags) ||
        !destination.tags.some((tag) => activeTags.includes(tag.toLowerCase())))
    ) {
      return false;
    }

    return true;
  });
  const SearchData = (Data) => {
    setDestination(Data);

    setSearch(true);
  };
  const NoSearchData = () => {
    setSearchError(true);
  };

  useEffect(() => {
    if (!success || error || !destinations) {
      fetchDestinationsData(currentPage);
    } else {
      setLoading(false);
      setDestination(destinations);
    }
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
            <div className="relative w-full">
              <SearchBar Data={SearchData} NoSearchData={NoSearchData} />
              {search && (
                <button
                  onClick={() => {
                    setSearch(false),
                      setDestination(destinations),
                      setSearchError(true);
                  }}
                  className=" absolute   top-1  rounded-lg  z-30 right-28 text-white bg-red-500 p-2 text-2xl"
                >
                  <X />
                </button>
              )}
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
        {searchError ? (
          loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <DestinationSkeleton key={index} />
              ))}
            </div>
          ) : filteredDestinations.length > 0 ? (
            <>
              {!search && totalPages > 1 && (
                <div className="flex justify-end items-center gap-4 m-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => fetchDestinationsData(currentPage - 1)}
                    className="px-4 py-2 bg-primary-600 text-white rounded disabled:opacity-50"
                  >
                    Prev
                  </button>

                  <span className="text-neutral-700">
                    Page {page} of {totalPages}
                  </span>

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => fetchDestinationsData(currentPage + 1)}
                    className="px-4 py-2 bg-primary-600 text-white rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
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
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-neutral-500 text-lg mb-4">
                No destinations found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setActiveTags([]);
                }}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )
        ) : (
          <div className="text-center py-12">
            <p className="text-neutral-500 text-lg mb-4">
              No destinations found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearchError(false);
                setSearch(false);
                setDestination(destinations);
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
