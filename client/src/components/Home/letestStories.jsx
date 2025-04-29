import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, Calendar, Clock } from "lucide-react";
import ImageWithLoaderPercentage from "../Skeleton/imageLoder";
import { storiesData } from "../../pages/StoriesPage/Stories";
// Mock data - would come from backend in real implementation

const LatestStories = () => {
  const navigate = useNavigate();
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
            <div
              key={story.id}
              onClick={() =>
                navigate(`/stories/${story.id}`, { state: { story: story } })
              }
              className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48 overflow-hidden">
                <ImageWithLoaderPercentage
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
            </div>
          ))}
          <div className="flex flex-col gap-4    ">
            {regularStories.map((story) => (
              <div
                key={story.id}
                onClick={() =>
                  navigate(`/stories/${story.id}`, { state: { story: story } })
                }
                className=" flex rounded-lg items-center overflow-hidden  group  cursor-pointer "
              >
                <div className="relative flex justify-center  max-w-20 max-h-20 overflow-hidden">
                  <ImageWithLoaderPercentage
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
                  <h3 className="text-base max-sm:text-sm font-medium text-neutral-800 mb-1 group-hover:text-primary-600 transition-colors">
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
