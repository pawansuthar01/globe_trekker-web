import React, { useState } from "react";
import { MapPin, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { caption } from "framer-motion/client";
import ImageWithLoaderPercentage from "../../components/Skeleton/imageLoder";

// Mock data - would come from backend in real implementation
export const destinationsData = [
  {
    id: 15555,
    type: "Destinations",
    longDescription:
      "Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape. The whitewashed, cubiform houses of its 2 principal towns, Fira and Oia, cling to cliffs above an underwater caldera (crater). They overlook the sea, small islands to the west and beaches made up of black, red and white lava pebbles.",
    name: "Santorini, Greece",
    image:
      "https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      {
        url: "https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=600",
        caption: "Sunset view from Oia",
      },
      {
        url: "https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=600",
        caption: "Sunset view from Oia",
      },
    ],
    description:
      "Famous for its stunning sunsets, white-washed buildings, and blue domes.",
    category: "europe",
    bestTimeToVisit: "April to October",
    tags: ["island", "romantic", "beaches"],

    location: {
      country: "Greece",
      region: "Cyclades",
      coordinates: {
        latitude: 36.3932,
        longitude: 25.4615,
      },
    },
    rating: {
      value: 4.8,
      count: 1250,
    },
    travelTips: [
      "Book accommodations well in advance, especially during peak season",
      "Visit Oia early in the morning to avoid crowds",
      "Take a sunset cruise around the caldera",
      "Try local wines at a traditional vineyard",
    ],
  },
  {
    id: 2654,
    type: "Destinations",
    name: "Kyoto, Japan",
    bestTimeToVisit: "April to October",
    longDescription:
      "Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape. The whitewashed, cubiform houses of its 2 principal towns, Fira and Oia, cling to cliffs above an underwater caldera (crater). They overlook the sea, small islands to the west and beaches made up of black, red and white lava pebbles.",
    image:
      "https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      {
        url: "https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=600",
        caption: "Iconic blue domes of Santorini",
      },
      {
        url: "https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=1280",
        caption: "Sunset view from Oia",
      },
    ],

    location: {
      country: "Greece",
      region: "Cyclades",
      coordinates: {
        latitude: 36.3932,
        longitude: 25.4615,
      },
    },
    rating: {
      value: 4.8,
      count: 1250,
    },
    description: "Historic temples, traditional gardens, and geisha districts.",
    category: "asia",
    tags: ["culture", "temples", "history"],
    travelTips: [
      "Book accommodations well in advance, especially during peak season",
      "Visit Oia early in the morning to avoid crowds",
      "Take a sunset cruise around the caldera",
      "Try local wines at a traditional vineyard",
    ],
  },

  {
    id: 36546489,
    type: "Destinations",
    longDescription:
      "Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape. The whitewashed, cubiform houses of its 2 principal towns, Fira and Oia, cling to cliffs above an underwater caldera (crater). They overlook the sea, small islands to the west and beaches made up of black, red and white lava pebbles.",
    name: "Amalfi Coast, Italy",
    bestTimeToVisit: "April to October",
    image:
      "https://images.pexels.com/photos/4502965/pexels-photo-4502965.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      {
        url: "https://images.pexels.com/photos/4502965/pexels-photo-4502965.jpeg?auto=compress&cs=tinysrgb&w=600",
        caption: "Iconic blue domes of Santorini",
      },
      {
        url: "https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=1280",
        caption: "Sunset view from Oia",
      },
    ],

    location: {
      country: "Greece",
      region: "Cyclades",
      coordinates: {
        latitude: 36.3932,
        longitude: 25.4615,
      },
    },
    rating: {
      value: 4.8,
      count: 1250,
    },
    description:
      "Stunning cliffside villages with colorful houses overlooking the Mediterranean Sea.",
    category: "europe",
    tags: ["coastal", "scenic", "food"],
    travelTips: [
      "Book accommodations well in advance, especially during peak season",
      "Visit Oia early in the morning to avoid crowds",
      "Take a sunset cruise around the caldera",
      "Try local wines at a traditional vineyard",
    ],
  },
  {
    id: 4656546,
    type: "Destinations",
    name: "Bali, Indonesia",
    bestTimeToVisit: "April to October",
    longDescription:
      "Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape. The whitewashed, cubiform houses of its 2 principal towns, Fira and Oia, cling to cliffs above an underwater caldera (crater). They overlook the sea, small islands to the west and beaches made up of black, red and white lava pebbles.",
    image:
      "https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=1280",
    images: [
      {
        url: "https://images.pexels.com/photos/4502965/pexels-photo-4502965.jpeg?auto=compress&cs=tinysrgb&w=600",
        caption: "Iconic blue domes of Santorini",
      },
      {
        url: "https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=1280",
        caption: "Sunset view from Oia",
      },
    ],

    location: {
      country: "Greece",
      region: "Cyclades",
      coordinates: {
        latitude: 36.3932,
        longitude: 25.4615,
      },
    },
    rating: {
      value: 4.8,
      count: 1250,
    },
    description:
      "Tropical paradise with beautiful beaches, rice terraces, and spiritual temples.",
    category: "asia",
    tags: ["beaches", "nature", "culture"],
    travelTips: [
      "Book accommodations well in advance, especially during peak season",
      "Visit Oia early in the morning to avoid crowds",
      "Take a sunset cruise around the caldera",
      "Try local wines at a traditional vineyard",
    ],
  },
  {
    id: 56464988,
    type: "Destinations",
    name: "Marrakech, Morocco",
    bestTimeToVisit: "April to October",
    longDescription:
      "Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape. The whitewashed, cubiform houses of its 2 principal towns, Fira and Oia, cling to cliffs above an underwater caldera (crater). They overlook the sea, small islands to the west and beaches made up of black, red and white lava pebbles.",
    image:
      "https://images.pexels.com/photos/4502965/pexels-photo-4502965.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      {
        url: "https://images.pexels.com/photos/4502965/pexels-photo-4502965.jpeg?auto=compress&cs=tinysrgb&w=600",
        caption: "Iconic blue domes of Santorini",
      },
      {
        url: "https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=1280",
        caption: "Sunset view from Oia",
      },
    ],

    location: {
      country: "Greece",
      region: "Cyclades",
      coordinates: {
        latitude: 36.3932,
        longitude: 25.4615,
      },
    },
    rating: {
      value: 4.8,
      count: 1250,
    },
    description:
      "Vibrant markets, intricate architecture, and rich Moroccan culture.",
    category: "africa",
    tags: ["markets", "culture", "architecture"],
    travelTips: [
      "Book accommodations well in advance, especially during peak season",
      "Visit Oia early in the morning to avoid crowds",
      "Take a sunset cruise around the caldera",
      "Try local wines at a traditional vineyard",
    ],
  },
  {
    id: 66638698,
    type: "Destinations",
    name: "Grand Canyon, USA",
    bestTimeToVisit: "April to October",
    longDescription:
      "Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape. The whitewashed, cubiform houses of its 2 principal towns, Fira and Oia, cling to cliffs above an underwater caldera (crater). They overlook the sea, small islands to the west and beaches made up of black, red and white lava pebbles.",
    images: [
      {
        url: "https://images.pexels.com/photos/4502965/pexels-photo-4502965.jpeg?auto=compress&cs=tinysrgb&w=600",
        caption: "Iconic blue domes of Santorini",
      },
      {
        url: "https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=1280",
        caption: "Sunset view from Oia",
      },
    ],

    location: {
      country: "Greece",
      region: "Cyclades",
      coordinates: {
        latitude: 36.3932,
        longitude: 25.4615,
      },
    },
    rating: {
      value: 4.8,
      count: 1250,
    },
    image:
      "https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg?auto=compress&cs=tinysrgb&w=600",
    description:
      "Vast and majestic natural wonder carved by the Colorado River.",
    category: "americas",
    tags: ["nature", "hiking", "scenic"],
    travelTips: [
      "Book accommodations well in advance, especially during peak season",
      "Visit Oia early in the morning to avoid crowds",
      "Take a sunset cruise around the caldera",
      "Try local wines at a traditional vineyard",
    ],
  },
  {
    id: 7753662,
    type: "Destinations",
    name: "Machu Picchu, Peru",
    bestTimeToVisit: "April to October",
    longDescription:
      "Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape. The whitewashed, cubiform houses of its 2 principal towns, Fira and Oia, cling to cliffs above an underwater caldera (crater). They overlook the sea, small islands to the west and beaches made up of black, red and white lava pebbles.",
    images: [
      {
        url: "https://images.pexels.com/photos/4502965/pexels-photo-4502965.jpeg?auto=compress&cs=tinysrgb&w=600",
        caption: "Iconic blue domes of Santorini",
      },
      {
        url: "https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=1280",
        caption: "Sunset view from Oia",
      },
    ],

    location: {
      country: "Greece",
      region: "Cyclades",
      coordinates: {
        latitude: 36.3932,
        longitude: 25.4615,
      },
    },
    rating: {
      value: 4.8,
      count: 1250,
    },
    image:
      "https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg?auto=compress&cs=tinysrgb&w=600",
    description: "Ancient Incan citadel set high in the Andes Mountains.",
    category: "americas",
    tags: ["history", "hiking", "ancient"],
    travelTips: [
      "Book accommodations well in advance, especially during peak season",
      "Visit Oia early in the morning to avoid crowds",
      "Take a sunset cruise around the caldera",
      "Try local wines at a traditional vineyard",
    ],
  },
  {
    id: 8897654321,
    type: "Destinations",
    name: "Sydney, Australia",
    longDescription:
      "Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape. The whitewashed, cubiform houses of its 2 principal towns, Fira and Oia, cling to cliffs above an underwater caldera (crater). They overlook the sea, small islands to the west and beaches made up of black, red and white lava pebbles.",
    bestTimeToVisit: "April to October",
    images: [
      {
        url: "https://images.pexels.com/photos/4502965/pexels-photo-4502965.jpeg?auto=compress&cs=tinysrgb&w=600",
        caption: "Iconic blue domes of Santorini",
      },
      {
        url: "https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=1280",
        caption: "Sunset view from Oia",
      },
    ],

    location: {
      country: "Greece",
      region: "Cyclades",
      coordinates: {
        latitude: 36.3932,
        longitude: 25.4615,
      },
    },
    rating: {
      value: 4.8,
      count: 1250,
    },
    image:
      "https://images.pexels.com/photos/1878293/pexels-photo-1878293.jpeg?auto=compress&cs=tinysrgb&w=600",
    description:
      "Iconic harbor city known for the Opera House and beautiful beaches.",
    category: "oceania",
    tags: ["city", "beaches", "architecture"],
    travelTips: [
      "Book accommodations well in advance, especially during peak season",
      "Visit Oia early in the morning to avoid crowds",
      "Take a sunset cruise around the caldera",
      "Try local wines at a traditional vineyard",
    ],
  },
];

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

  const filteredDestinations = destinationsData.filter((destination) => {
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
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDestinations.map((destination) => (
              <div
                onClick={() =>
                  navigate(`/destinations/${destination.id}`, {
                    state: { destination },
                  })
                }
                key={destination.id}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithLoaderPercentage
                    src={destination.image}
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
