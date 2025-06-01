import React, { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";

const ImageCarousel = ({ images, autoPlayInterval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  const containerRef = useRef(null);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isPlaying, images.length, autoPlayInterval]);

  useEffect(() => {
    if (!containerRef.current) return;
    // const newIndex = (currentIndex + 1) % images.length;
    const scrollPosition = currentIndex * containerRef.current.offsetWidth;
    containerRef.current.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
    // setCurrentIndex(newIndex);
  }, [currentIndex]);

  const scrollToIndex = useCallback(
    (index) => {
      if (!containerRef.current) return;

      const safeIndex = Math.max(0, Math.min(index, images.length - 1));

      const container = containerRef.current;
      if (container && container.children[safeIndex]) {
        container.scrollTo({
          left: container.children[safeIndex].offsetLeft,
          behavior: "smooth",
        });
        setCurrentIndex(safeIndex);
      }
    },
    [images.length]
  );

  const handleNext = useCallback(() => {
    const newIndex = (currentIndex + 1) % images.length;
    scrollToIndex(newIndex);
  }, [currentIndex, images.length, scrollToIndex]);

  const handlePrev = useCallback(() => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    scrollToIndex(newIndex);
  }, [currentIndex, images.length, scrollToIndex]);

  const controlClasses = `
    transition-all duration-300 ease-in-out
    bg-white/70 backdrop-blur-sm text-gray-800 hover:bg-white 
    shadow-xl rounded-full p-2 md:p-3
    focus:outline-none focus:ring-2 focus:ring-blue-500
    ${isVisible ? "opacity-100" : "opacity-0 md:opacity-30"}
  `;

  const buttonClasses = {
    prev: `absolute top-1/2 left-2 md:left-6 -translate-y-1/2 z-30 ${controlClasses}`,
    next: `absolute top-1/2 right-2 md:right-6 -translate-y-1/2 z-30 ${controlClasses}`,
    play: `absolute bottom-4 right-4 z-30 ${controlClasses}`,
  };

  useEffect(() => {
    if (isPlaying) return;

    const resumeTimeout = setTimeout(() => {
      setIsPlaying(true);
    }, 8000); // resume after 8 seconds

    return () => clearTimeout(resumeTimeout);
  }, [isPlaying]);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let timeoutId;

    const handleScroll = () => {
      // Pause autoplay on user scroll
      setIsPlaying(false);

      if (timeoutId) clearTimeout(timeoutId);

      // Debounce index update
      timeoutId = setTimeout(() => {
        const scrollLeft = container.scrollLeft;
        const containerWidth = container.offsetWidth;
        const index = Math.round(scrollLeft / containerWidth);
        setCurrentIndex(index);
      }, 100); // adjust debounce delay if needed
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);
  return (
    <div
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      className="relative w-full max-w-5xl mx-auto"
    >
      <div
        ref={containerRef}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory rounded-lg scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent"
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 snap-start"
            style={{ aspectRatio: "16/9" }}
          >
            <img
              src={image.secure_url}
              alt={image.public_id || `Slide ${index + 1}`}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      <button
        onClick={handlePrev}
        className={buttonClasses.prev}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      <button
        onClick={handleNext}
        className={buttonClasses.next}
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentIndex === index
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className={buttonClasses.play}
        aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Play className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};

export default ImageCarousel;
