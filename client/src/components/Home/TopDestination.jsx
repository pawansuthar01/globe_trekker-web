import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
// Mock data - would come from backend in real implementation
const destinationsData = [
  {
    id: 1,
    name: "Santorini, Greece",
    image:
      "https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "europe",
  },
  {
    id: 2,
    name: "Kyoto, Japan",
    image:
      "https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "asia",
  },
  {
    id: 3,
    name: "Amalfi Coast, Italy",
    image:
      "https://images.pexels.com/photos/4502965/pexels-photo-4502965.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "europe",
  },
  {
    id: 4,
    name: "Bali, Indonesia",
    image:
      "https://images.pexels.com/photos/2474689/pexels-photo-2474689.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "asia",
  },
  {
    id: 5,
    name: "Marrakech, Morocco",
    image:
      "https://images.pexels.com/photos/2387871/pexels-photo-2387871.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "africa",
  },
  {
    id: 6,
    name: "Grand Canyon, USA",
    image:
      "https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg?auto=compress&cs=tinysrgb&w=600",
    category: "americas",
  },
  {
    id: 7,
    name: "Grand Canyon, USA",
    image:
      "https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg?auto=compress&cs=tinysrgb&w=600",
    category: "americas",
  },
  {
    id: 8,
    name: "Grand Canyon, USA",
    image:
      "https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg?auto=compress&cs=tinysrgb&w=600",
    category: "americas",
  },
  {
    id: 9,
    name: "Grand Canyon, USA",
    image:
      "https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg?auto=compress&cs=tinysrgb&w=600",
    category: "americas",
  },
  {
    id: 10,
    name: "Grand Canyon, USA",
    image:
      "https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg?auto=compress&cs=tinysrgb&w=600",
    category: "americas",
  },
  {
    id: 11,
    name: "Grand Canyon, USA",
    image:
      "https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg?auto=compress&cs=tinysrgb&w=600",
    category: "americas",
  },
];

const categories = [
  { id: "popular", name: "Popular" },
  { id: "europe", name: "Europe" },
  { id: "asia", name: "Asia" },
  { id: "africa", name: "Africa" },
  { id: "americas", name: "Americas" },
  { id: "oceania", name: "Oceania" },
];

const TopDestinations = () => {
  const [hasAnimated, setHasAnimated] = useState(true);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  const [activeCategory, setActiveCategory] = useState("popular");
  const filteredDestinations =
    activeCategory === "popular"
      ? destinationsData
      : destinationsData.filter((dest) => dest.category === activeCategory);
  const shouldAnimate = isInView && hasAnimated;

  // Lock animation after first animation trigger
  useEffect(() => {
    if (shouldAnimate && activeCategory === "popular") {
      setHasAnimated(false);
    }
  }, [shouldAnimate, activeCategory]);
  return (
    <section ref={containerRef} className="py-16 bg-neutral-50  px-1">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6">
          Top Destinations
        </h2>

        <div className="mb-8  overflow-x-auto">
          <div className="flex  space-x-2 md:space-x-4 min-w-max pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? "bg-primary-600 text-white"
                    : "bg-white text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex pl-1     overflow-x-auto  gap-6">
          {filteredDestinations.map((destination) => (
            <Link
              to={`/destinations/${destination.id}`}
              key={destination.id}
              className="group"
            >
              <motion.div
                initial={{ x: 0 }}
                animate={shouldAnimate && { x: [-0, -100, -0] }}
                transition={{
                  duration: 1,
                  ease: "linear",
                  times: [0, 0.5, 1],
                }}
                className="relative  w-52 overflow-hidden rounded-lg shadow-md transition-transform group-hover:shadow-xl group-hover:-translate-y-1"
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <h3 className="text-lg font-semibold">{destination.name}</h3>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/destinations"
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
          >
            <span>Explore all destinations</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopDestinations;
