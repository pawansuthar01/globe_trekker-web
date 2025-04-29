import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Calendar, Clock } from "lucide-react";

// Mock data - would come from backend in real implementation
const storiesData = [
  {
    id: 1,
    title: "The Hidden Temples of Kyoto That Most Tourists Miss",
    excerpt:
      "Beyond the famous shrines lies a world of serene temples nestled in bamboo forests...",
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
      "Exploring food in California, where the culinary arts and local ingredients create unforgettable dining experiences...",
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
      "Everything you need to know about hiking the famous W Trek and O Circuit in Chile's most famous national park...",
    image:
      "https://images.pexels.com/photos/2563689/pexels-photo-2563689.jpeg?auto=compress&cs=tinysrgb&w=600",
    date: "2025-04-03",
    readTime: "10 min read",
    category: "Adventure",
    featured: false,
  },
  {
    id: 4,
    title: "Hiking through Patagonia: Ultimate Guide to Torres del Paine",
    excerpt:
      "Everything you need to know about hiking the famous W Trek and O Circuit in Chile's most famous national park...",
    image:
      "https://images.pexels.com/photos/2563689/pexels-photo-2563689.jpeg?auto=compress&cs=tinysrgb&w=600",
    date: "2025-04-03",
    readTime: "10 min read",
    category: "Adventure",
    featured: false,
  },
  {
    id: 5,
    title: "Hiking through Patagonia: Ultimate Guide to Torres del Paine",
    excerpt:
      "Everything you need to know about hiking the famous W Trek and O Circuit in Chile's most famous national park...",
    image:
      "https://images.pexels.com/photos/2563689/pexels-photo-2563689.jpeg?auto=compress&cs=tinysrgb&w=600",
    date: "2025-04-03",
    readTime: "10 min read",
    category: "Adventure",
    featured: false,
  },
];

const LatestStories = () => {
  const featuredStories = storiesData.filter((story) => story.featured);
  const regularStories = storiesData.filter((story) => !story.featured);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
            Latest Stories
          </h2>
          <Link
            to="/stories"
            className="hidden md:inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
          >
            <span>View all stories</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredStories.map((story) => (
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
                <h3 className="text-lg font-semibold text-neutral-800 mb-2 group-hover:text-primary-600 transition-colors">
                  {story.title}
                </h3>
                <p className="text-neutral-600 text-sm mb-4">{story.excerpt}</p>
                <div className="text-primary-600 text-sm font-medium group-hover:text-primary-700">
                  Read more
                </div>
              </div>
            </Link>
          ))}
          <div className="flex flex-col gap-4    ">
            {regularStories.map((story) => (
              <div
                key={story.id}
                to={`/stories/${story.id}`}
                className=" flex rounded-lg items-center overflow-hidden  group  cursor-pointer "
              >
                <div className="relative flex justify-center  max-w-20 max-h-20 overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.title}
                    className=" object-cover rounded-xl transition-transform duration-500 "
                  />
                </div>
                <div className="p-4 ">
                  <div className="flex items-center text-xs text-neutral-500 mb-2">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span className="mr-3">
                      {new Date(story.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <Clock className="h-3 w-3 mr-1 " />
                    <span>{story.readTime}</span>
                  </div>
                  <h3 className="text-base font-medium text-neutral-800 mb-1 group-hover:text-primary-600 transition-colors">
                    {story.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            to="/stories"
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
          >
            <span>View all stories</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestStories;
