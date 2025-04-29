import React, { useState, useEffect } from "react";

const ImageWithLoaderPercentage = ({
  src,
  alt,
  className,
  rounded = "rounded-lg",
}) => {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [imageDataUrl, setImageDataUrl] = useState("");

  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", src, true);
    xhr.responseType = "blob";

    xhr.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setProgress(percent);
      }
    };

    xhr.onloadend = () => {
      const blobUrl = URL.createObjectURL(xhr.response);
      setImageDataUrl(blobUrl);
      setLoaded(true);
    };

    xhr.onerror = () => {
      console.error("Image failed to load.");
    };

    xhr.send();
  }, [src]);

  return (
    <div
      className={`relative ${className} `}
      onContextMenu={(e) => e.preventDefault()}
      draggable="false"
      style={{ userSelect: "none" }}
    >
      {!loaded && (
        <div className="absolute inset-0  flex flex-col justify-center items-center bg-gray-200 z-10">
          <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-2"></div>
          <span className="text-sm font-medium text-gray-600">{progress}%</span>
        </div>
      )}
      {imageDataUrl && (
        <img
          src={imageDataUrl}
          alt={alt}
          className={`w-full h-full object-cover ${rounded} transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
};

export default ImageWithLoaderPercentage;
