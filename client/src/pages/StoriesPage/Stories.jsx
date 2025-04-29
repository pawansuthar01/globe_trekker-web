import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, Search } from "lucide-react";

// Mock data - would come from backend in real implementation
const storiesData = [
  {
    id: 1,
    title: "The Hidden Temples of Kyoto That Most Tourists Miss",
    excerpt:
      "Beyond the famous shrines lies a world of serene temples nestled in bamboo forests that most tourists never discover. Our guide takes you to the most peaceful and authentic experiences in Kyoto.",
    image:
      "https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=600",
    date: "2025-04-12",
    readTime: "8 min read",
    category: "Asia",
    featured: true,
  },
  {
    id: 2,
    title:
      "Los Angeles food & drink guide: 10 things to try in Los Angeles, California",
    excerpt:
      "Exploring food in California, where the culinary arts and local ingredients create unforgettable dining experiences. From food trucks to high-end restaurants, LA has it all.",
    image:
      "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=600",
    date: "2025-04-08",
    readTime: "6 min read",
    category: "Food",
    featured: true,
  },
  {
    id: 3,
    title: "Hiking through Patagonia: Ultimate Guide to Torres del Paine",
    excerpt:
      "Everything you need to know about hiking the famous W Trek and O Circuit in Chile's most famous national park. Our comprehensive guide includes packing tips, best seasons, and trail advice.",
    image:
      "https://images.pexels.com/photos/2563689/pexels-photo-2563689.jpeg?auto=compress&cs=tinysrgb&w=600",
    date: "2025-04-03",
    readTime: "10 min read",
    category: "Adventure",
    featured: false,
  },
  {
    id: 4,
    title: "The Ultimate Guide to Bali's Hidden Waterfalls",
    excerpt:
      "Beyond the popular beaches, Bali is home to dozens of spectacular waterfalls tucked away in the jungle. We've mapped the most breathtaking ones that aren't overrun with tourists.",
    image:
      "https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=600",
    date: "2025-03-28",
    readTime: "7 min read",
    category: "Asia",
    featured: false,
  },
  {
    id: 5,
    title: "Exploring Morocco's Blue City: Chefchaouen",
    excerpt:
      "Tucked in the Rif Mountains, this azure-hued city feels like stepping into another world. Our guide to Chefchaouen covers the best photo spots, cultural experiences, and hidden gems.",
    image:
      "https://images.pexels.com/photos/4388167/pexels-photo-4388167.jpeg?auto=compress&cs=tinysrgb&w=600",
    date: "2025-03-21",
    readTime: "5 min read",
    category: "Africa",
    featured: false,
  },
  {
    id: 6,
    title: "Island Hopping in Greece: A Two-Week Itinerary",
    excerpt:
      "From the iconic blue domes of Santorini to the hidden beaches of Milos, our comprehensive itinerary helps you make the most of your Greek island adventure.",
    image:
      "https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=600",
    date: "2025-03-15",
    readTime: "9 min read",
    category: "Europe",
    featured: false,
  },
];

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
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Featured story is the first one
  const featuredStory = storiesData[0];

  // Filter stories based on category and search term
  const filteredStories = storiesData.filter((story) => {
    const matchesCategory =
      activeCategory === "all" ||
      story.category.toLowerCase() === activeCategory;

    const matchesSearch =
      !searchTerm ||
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

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
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search stories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 px-4 pl-10 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-neutral-400" />
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
        {activeCategory === "all" && !searchTerm && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-6">Featured Story</h2>
            <Link
              to={`/stories/${featuredStory.id}`}
              className="group block bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-64 md:h-auto overflow-hidden">
                  <img
                    src={featuredStory.image}
                    alt={featuredStory.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-accent-500 text-white text-xs font-semibold py-1 px-2 rounded">
                    {featuredStory.category}
                  </div>
                </div>
                <div className="p-6 md:p-8 flex flex-col">
                  <div className="flex items-center text-sm text-neutral-500 mb-4 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>
                        {new Date(featuredStory.date).toLocaleDateString(
                          "en-US",
                          { month: "long", day: "numeric", year: "numeric" }
                        )}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{featuredStory.readTime}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold text-neutral-800 mb-4 group-hover:text-primary-600 transition-colors">
                    {featuredStory.title}
                  </h3>
                  <p className="text-neutral-600 mb-6 flex-grow">
                    {featuredStory.excerpt}
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
            </Link>
          </div>
        )}

        {/* Stories grid */}
        {filteredStories.length > 0 ? (
          <div>
            <h2 className="text-xl font-semibold mb-6">
              {searchTerm ? "Search Results" : "Latest Stories"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStories.map((story) => (
                <Link
                  key={story.id}
                  to={`/stories/${story.id}`}
                  className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-accent-500 text-white text-xs font-semibold py-1 px-2 rounded">
                      {story.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center text-xs text-neutral-500 mb-3 space-x-4">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>
                          {new Date(story.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{story.readTime}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-800 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {story.title}
                    </h3>
                    <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
                      {story.excerpt}
                    </p>
                    <div className="text-primary-600 text-sm font-medium group-hover:text-primary-700">
                      Read more
                    </div>
                  </div>
                </Link>
              ))}
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
