import { X } from "lucide-react";
import { useState } from "react";

export const VideoPlayIcon = () => {
  return (
    <button className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <polygon points="8,5 19,12 8,19" fill="white" />
      </svg>
    </button>
  );
};
const ShortVideoCard = ({ videoUrl, isClose }) => {
  return (
    <div
      onClick={isClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
    >
      <div
        onContextMenu={(e) => e.preventDefault()}
        draggable="false"
        style={{ userSelect: "none" }}
        className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl"
      >
        <video
          src={videoUrl}
          controls
          autoPlay
          playsInline
          controlsList="nodownload"
          className="w-full h-full object-contain"
        />
        <button
          onClick={isClose}
          className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
          aria-label="Close video"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
export default ShortVideoCard;
