import React, { useEffect } from "react";
import { ChevronRight, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import ImageWithLoaderPercentage from "../Skeleton/imageLoder";
import ShortVideoCard, { VideoPlayIcon } from "../Highlights/videoCard";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchFeaturedHighlights } from "../../Redux/Slice/highlightSlice";

const TrekkersHighlights = () => {
  const [showVideo, setShowVideo] = useState({
    _id: "",
    video: "",
    name: "",
  });
  const [highlight, setHighlight] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const fetchHighlight = async () => {
    setLoading(true);
    const res = await dispatch(fetchFeaturedHighlights());
    if (res?.payload?.success) {
      setHighlight(res?.payload?.data);
    }

    setLoading(false);
  };
  useEffect(() => {
    fetchHighlight();
  }, []);
  return (
    <section className="py-16  text-black ">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
          Trekker's Highlights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          {highlight &&
            highlight.map((highlight) => (
              <div
                key={highlight._id}
                className=" rounded-lg overflow-hidden  group  transition-all hover:-translate-y-1"
              >
                <div className="flex flex-col sm:flex-row h-full">
                  <div className="p-6 sm:w-2/3 flex flex-col">
                    <div className="flex items-center mb-4">
                      <ImageWithLoaderPercentage
                        src={highlight?.avatar}
                        alt={highlight.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <div className="font-semibold">{highlight?.name}</div>
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
                      "{highlight.description}"
                    </blockquote>
                  </div>
                  <div className="flex gap-5 max-sm:flex-col">
                    <div className="w-full sm:w-60 h-40 sm:h-72 overflow-hidden rounded-lg ">
                      <div className="relative h-48 overflow-hidden">
                        <ImageWithLoaderPercentage
                          src={highlight.image}
                          alt={highlight.location}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <div className="flex items-center text-white">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="text-sm font-medium">
                              {highlight.location}
                            </span>
                          </div>
                        </div>
                        {highlight.video && (
                          <div className="absolute top-0 right-0 p-4">
                            <div
                              onClick={() =>
                                setShowVideo({
                                  _id: highlight._id,
                                  video: highlight.video,
                                  name: highlight.name,
                                })
                              }
                              className="flex items-center text-white"
                            >
                              <VideoPlayIcon />
                            </div>
                          </div>
                        )}
                      </div>
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
          {showVideo?._id && (
            <ShortVideoCard
              isClose={() => setShowVideo(null)}
              videoUrl={showVideo.video}
              title={showVideo.name}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default TrekkersHighlights;
