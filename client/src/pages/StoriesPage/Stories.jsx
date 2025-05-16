import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, Search, X } from "lucide-react";
import ImageWithLoaderPercentage from "../../components/Skeleton/imageLoder";
import { useDispatch, useSelector } from "react-redux";
import { fetchStories } from "../../Redux/Slice/storiesSlice";
import formatDate from "../../utils/DataFormat";
import StoryListSkeleton from "../../components/Skeleton/storiesSkeletonPage";
import { SearchBar } from "../../components/Search-bar";

const categories = [
  { id: "all", name: "All Categories" },
  { id: "europe", name: "Europe" },
  { id: "asia", name: "Asia" },
  { id: "africa", name: "Africa" },
  { id: "americas", name: "Americas" },
  { id: "oceania", name: "Oceania" },
  { id: "food", name: "Food & Drink" },
  { id: "adventure", name: "Adventure" },
  { id: "culture", name: "Culture" },
  { id: "tips", name: "Travel Tips" },
];

const StoriesPage = () => {
  const {
    stories: story,
    success,
    error,
    totalPages,
    page,
  } = useSelector((state) => state?.story);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(page);
  const [loading, setLoading] = useState(false);
  const [stories, setStories] = useState(story || []);
  const [search, setSearch] = useState(false);
  const [searchError, setSearchError] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [featuredStory, setFeaturedStory] = useState();
  const navigate = useNavigate();
  // Featured story is the first one
  const fetchStoriesData = async (page = 1) => {
    setLoading(true);
    const res = await dispatch(fetchStories({ page, limit: 25 }));
    console.log(res);
    if (res?.payload?.success) {
      setStories(res?.payload?.data);
    }
    setLoading(false);
  };
  const filteredStories = stories?.filter((story) => {
    // Agar category match ho ya search term match ho title/excerpt me
    const matchesCategory =
      activeCategory === "all" ||
      story.category?.toLowerCase() === activeCategory.toLowerCase();

    const matchesSearch =
      !searchTerm ||
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

    // Ab condition: category match ho ya search term match ho
    return matchesCategory || matchesSearch;
  });
  useEffect(() => {
    if (stories.length > 0) {
      setFeaturedStory(stories[0]);
    }
  }, [stories]);

  const SearchData = (Data) => {
    setStories(Data);

    setSearch(true);
  };
  const NoSearchData = () => {
    setSearchError(true);
  };

  useEffect(() => {
    if (!success || error == true || story) {
      fetchStoriesData(currentPage);
    }
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Travel Stories & Guides
          </h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Explore our collection of travel tales, insider tips, and
            comprehensive guides for your next adventure.
          </p>
        </header>

        {/* Search and filters */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative w-full">
              <SearchBar
                Data={SearchData}
                NoSearchData={NoSearchData}
                stories={true}
              />
              {search && (
                <button
                  onClick={() => {
                    setSearch(false), setStories(story), setSearchError(true);
                  }}
                  className=" absolute   top-1  rounded-lg  z-30 right-28 text-white bg-red-500 p-2 text-2xl"
                >
                  <X />
                </button>
              )}
            </div>
          </div>

          <div className="overflow-x-auto pb-2">
            <div className="flex space-x-2 min-w-max">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors whitespace-nowrap ${
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
        </div>

        {/* Featured story */}
        {loading ? (
          <StoryListSkeleton count={4} />
        ) : (
          stories &&
          !search &&
          activeCategory === "all" &&
          !searchTerm && (
            <div className="mb-12">
              <h2 className="text-xl font-semibold mb-6">Featured Story</h2>
              <div
                onClick={() =>
                  navigate(`/stories/${featuredStory?._id}`, {
                    state: { story: featuredStory },
                  })
                }
                className="group block bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative h-64 md:h-auto max-h-[500px]  overflow-hidden">
                    <ImageWithLoaderPercentage
                      src={featuredStory?.coverImage?.url}
                      alt={featuredStory?.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-accent-500 text-white text-xs font-semibold py-1 px-2 rounded">
                      {featuredStory?.category}
                    </div>
                  </div>
                  <div className="p-6 md:p-8 flex flex-col">
                    <div className="flex items-center text-sm text-neutral-500 mb-4 space-x-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(featuredStory?.publishedAt)}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{featuredStory?.readTime}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold text-neutral-800 mb-4 group-hover:text-primary-600 transition-colors">
                      {featuredStory?.title}
                    </h3>
                    <p className="text-neutral-600 mb-6 flex-grow">
                      {featuredStory?.excerpt}
                    </p>
                    <div className="text-primary-600 font-medium group-hover:text-primary-700 transition-colors flex items-center">
                      Read full story
                      <svg
                        className="ml-2 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}

        {/* Stories grid */}
        {filteredStories?.length > 0 ? (
          <div>
            <h2 className="text-xl font-semibold mb-6">
              {searchTerm ? "Search Results" : "Latest Stories"}
            </h2>
            {!search && totalPages > 1 && (
              <div className="flex justify-end items-center gap-4 m-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => fetchStoriesData(currentPage - 1)}
                  className="px-4 py-2 bg-primary-600 text-white rounded disabled:opacity-50"
                >
                  Prev
                </button>

                <span className="text-neutral-700">
                  Page {page} of {totalPages}
                </span>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => fetchStoriesData(currentPage + 1)}
                  className="px-4 py-2 bg-primary-600 text-white rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {
                <>
                  {filteredStories?.map((story) => (
                    <div
                      key={story._id}
                      onClick={() =>
                        navigate(`/stories/${story._id}`, {
                          state: { story: story },
                        })
                      }
                      className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                    >
                      <div className="relative h-52 overflow-hidden">
                        <ImageWithLoaderPercentage
                          src={story?.coverImage.url}
                          alt={story?.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4 bg-accent-500 text-white text-xs font-semibold py-1 px-2 rounded">
                          {story?.category}
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="flex items-center text-xs text-neutral-500 mb-3 space-x-4">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>
                              {formatDate(featuredStory?.publishedAt)}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{story?.readTime}</span>
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-neutral-800 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                          {story?.title}
                        </h3>
                        <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
                          {story?.excerpt}
                        </p>
                        <div className="text-primary-600 text-sm font-medium group-hover:text-primary-700">
                          Read more
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              }
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-neutral-500 text-lg mb-4">
              No stories found matching your criteria.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
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

export default StoriesPage;
