import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="md:w-1/2 lg:pr-8 animate-slide-up">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4 leading-tight">
              Discover the World's{" "}
              <span className="text-accent-500">Hidden</span> Wonders
            </h1>
            <p className="text-neutral-600 text-lg mb-8 max-w-lg">
              Find the most marvelous and hidden gems that aren't on typical
              tourist maps. Join our global community of adventurers who seek
              authentic travel experiences off the beaten path.
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

          <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center md:justify-end animate-fade-in">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Machu Picchu"
                  className="rounded-lg h-48 md:h-60 w-full object-cover shadow-lg transform hover:scale-102 transition-transform hover:shadow-xl"
                />
                <img
                  src="https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Beautiful landscape"
                  className="rounded-lg h-48 md:h-60 w-full object-cover shadow-lg transform hover:scale-102 transition-transform hover:shadow-xl"
                />
                <img
                  src="https://images.pexels.com/photos/4275885/pexels-photo-4275885.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Santorini"
                  className="rounded-lg h-48 md:h-60 w-full object-cover shadow-lg transform hover:scale-102 transition-transform hover:shadow-xl"
                />
                <img
                  src="https://images.pexels.com/photos/4388167/pexels-photo-4388167.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Mountain landscape"
                  className="rounded-lg h-48 md:h-60 w-full object-cover shadow-lg transform hover:scale-102 transition-transform hover:shadow-xl"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg max-w-[200px]">
                <div className="text-accent-500 mb-1">
                  ✈️ Ready for adventure
                </div>
                <div className="text-sm text-neutral-600">
                  Join 50,000+ travelers exploring the world
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
