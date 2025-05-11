import React, { useState, useEffect } from "react";

const ImageWithLoaderPercentage = ({
  src,
  alt,
  className,
  rounded = "rounded-lg",
}) => {
  const [progress, setProgress] = useState(0); // Track loading progress
  const [loaded, setLoaded] = useState(false); // Track if the image is fully loaded
  const [imageDataUrl, setImageDataUrl] = useState(""); // For storing the blob URL
  const [hasError, setHasError] = useState(false); // Track if there is an error

  useEffect(() => {
    // If the image is from Google (profile image)
    if (src && src.startsWith("https://lh3.googleusercontent.com/")) {
      setImageDataUrl(src); // Directly set the Google image URL
      setLoaded(true); // Mark the image as loaded immediately
      return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open("GET", src, true);
    xhr.responseType = "blob";

    xhr.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setProgress(percent); // Track the loading progress
      }
    };

    xhr.onloadend = () => {
      const blobUrl = URL.createObjectURL(xhr.response);
      setImageDataUrl(blobUrl); // Set the blob URL for the image
      setLoaded(true); // Image is fully loaded
    };

    xhr.onerror = () => {
      console.error("Image failed to load.");
      setHasError(true); // Handle errors in loading the image
      setLoaded(true); // Stop loader even if there's an error
    };

    xhr.send(); // Send the request to fetch the image
  }, [src]);

  return (
    <div
      className={`relative ${className}`}
      onContextMenu={(e) => e.preventDefault()}
      draggable="false"
      style={{ userSelect: "none" }}
    >
      {!loaded && !hasError && (
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-200 z-10">
          <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-2"></div>
          <span className="text-sm font-medium text-gray-600">{progress}%</span>
        </div>
      )}
      {hasError && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-200 z-10">
          <span className="text-sm font-medium text-red-600">
            Failed to load image
          </span>
        </div>
      )}
      {imageDataUrl && !hasError && (
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
