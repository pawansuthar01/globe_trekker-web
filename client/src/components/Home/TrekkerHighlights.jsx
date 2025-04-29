import React from "react";
import { ChevronRight, Star } from "lucide-react";
import video from "../../assets/Video by ojaswini.kapoor.mp4";
import { Link } from "react-router-dom";
import ImageWithLoaderPercentage from "../Skeleton/imageLoder";
// Mock data - would come from backend in real implementation
const highlights = [
  {
    id: 1,
    name: "Maria Campbell",
    avatar:
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600",
    location: "Cappadocia, Turkey",
    text: "The hot air balloon ride over Cappadocia's fairy chimneys was absolutely magical. Globe Trekker's guide made sure we had the perfect spot at sunrise.",
    rating: 5,
    image:
      "https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const TrekkersHighlights = () => {
  return (
    <section className="py-16  text-black ">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
          Trekker's Highlights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          {highlights.map((highlight) => (
            <div
              key={highlight.id}
              className=" rounded-lg overflow-hidden  group  transition-all hover:-translate-y-1"
            >
              <div className="flex flex-col sm:flex-row h-full">
                <div className="p-6 sm:w-2/3 flex flex-col">
                  <div className="flex items-center mb-4">
                    <ImageWithLoaderPercentage
                      src={highlight.avatar}
                      alt={highlight.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <div className="font-semibold">{highlight.name}</div>
                      <div className=" text-sm">{highlight.location}</div>
                    </div>
                  </div>

                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        fill={i < highlight.rating ? "currentColor" : "none"}
                        className="h-4 w-4 text-accent-400"
                      />
                    ))}
                  </div>

                  <blockquote className=" italic flex-grow mb-4">
                    "{highlight.text}"
                  </blockquote>
                </div>
                <div className="flex gap-5 max-sm:flex-col">
                  <div className="w-full sm:w-60 h-40 sm:h-72 overflow-hidden rounded-lg ">
                    <ImageWithLoaderPercentage
                      src={highlight.image}
                      alt={highlight.location}
                      className="w-full h-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="sm:w-52 flex flex-col h-62  overflow-hidden rounded-lg">
                    <video
                      src={video}
                      autoPlay
                      muted
                      loop
                      className="w-full h-52 object-cover rounded-sm transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="mt-8 text-center ">
                      <Link
                        to="/highlight"
                        className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
                      >
                        <span>View all highlight</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrekkersHighlights;
