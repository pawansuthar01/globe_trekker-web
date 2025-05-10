import React from "react";
import { MapPin } from "lucide-react";

const HighlightHeader = () => {
  return (
    <div className="relative ">
      <div className="h-[40vh] w-full bg-gradient-to-r from-primary-600 to-neutral-500 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
          }}
        />
        <div className="h-full flex flex-col items-center justify-center text-white relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Trekker's Highlights
          </h1>
          <p className="text-lg md:text-xl max-w-2xl text-center mb-6">
            Explore extraordinary experiences shared by our community of
            passionate travelers around the world
          </p>
          <div className="flex items-center gap-2 text-white/90">
            <MapPin className="h-5 w-5" />
            <span>Featuring 120+ destinations worldwide</span>
          </div>
        </div>
        <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-gray-50 to-transparent" />
      </div>
    </div>
  );
};

export default HighlightHeader;
