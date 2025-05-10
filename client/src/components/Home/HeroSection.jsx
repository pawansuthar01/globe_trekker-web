import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ImageWithLoaderPercentage from "../Skeleton/imageLoder";
import { useDispatch, useSelector } from "react-redux";
import { fetchActiveBanners } from "../../Redux/Slice/bannerSlice";
import SkeletonBannerPage from "../Skeleton/bannerSkeletonpage";
const HeroSection = () => {
  const [banner, setBanner] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const FetchActiveBanners = async () => {
    setLoading(true);
    const res = await dispatch(fetchActiveBanners());
    if (res?.payload?.success) {
      setBanner(res?.payload?.data[0]);
    }
    setLoading(false);
  };
  useEffect(() => {
    FetchActiveBanners();
  }, []);

  if (loading || !banner) return <SkeletonBannerPage />;
  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 lg:ml-2">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          <div className="md:w-1/2 lg:pr-8 animate-slide-up">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4 leading-tight">
              {banner.title ||
                ` Discover the World's{" "}
              <span className="text-accent-500">Hidden</span> Wonders`}
            </h1>
            <p className="text-neutral-600 text-lg mb-8 max-w-lg">
              {banner.description ||
                `Find the most marvelous and hidden gems that aren't on typical
              tourist maps. Join our global community of adventurers who seek
              authentic travel experiences off the beaten path.`}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/destinations"
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2"
              >
                Explore Now
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="border border-neutral-300 hover:border-primary-600 hover:text-primary-600 px-6 py-3 rounded-full font-medium transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="md:w-1/2 lg:w-1/3 mt-8 md:mt-0 flex justify-center md:justify-end animate-fade-in">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-center items-center h-full w-full">
                  <ImageWithLoaderPercentage
                    alt="Machu Picchu"
                    src={banner.images[0].secure_url}
                    className="rounded-lg w-full  h-[80%] md:h-[80%] md:w-[80%] object-cover shadow-lg transform hover:scale-102 transition-transform hover:shadow-xl"
                  />
                </div>
                <div className="flex flex-col gap-3 w-full md:w-[90%]">
                  <ImageWithLoaderPercentage
                    src={banner.images[1].secure_url}
                    alt="Santorini"
                    className=" relative  rounded-lg h-48 md:h-54 w-full  object-cover shadow-lg transform hover:scale-102 transition-transform hover:shadow-xl"
                  />
                  <ImageWithLoaderPercentage
                    src={banner.images[2].secure_url}
                    alt="Mountain landscape"
                    className="rounded-lg  h-48 md:h-60 w-full object-cover shadow-lg transform hover:scale-102 transition-transform hover:shadow-xl"
                  />
                </div>
              </div>
              <div className="absolute  -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg max-w-[200px]">
                <div className="text-accent-500 mb-1">
                  ✈️ Ready for adventure
                </div>
                <div className="text-sm text-neutral-600">
                  {banner.smallDescription ||
                    `  Join 50,000+ travelers exploring the world`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
