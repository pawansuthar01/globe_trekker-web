import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getFeedbacks } from "../../Redux/Slice/feedbackSlice";
import TestimonialCard from "./feedbackCart";

const TestimonialSlider = ({ autoPlayInterval = 5000 }) => {
  const dispatch = useDispatch();
  const { feedbacks, success, error } = useSelector((state) => state?.Feedback);

  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [cardsToShow, setCardsToShow] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  // Update number of cards shown based on screen width
  useEffect(() => {
    const updateCardsToShow = () => {
      if (window.innerWidth >= 1024) setCardsToShow(3);
      else if (window.innerWidth >= 768) setCardsToShow(2);
      else setCardsToShow(1);
    };
    updateCardsToShow();
    window.addEventListener("resize", updateCardsToShow);
    return () => window.removeEventListener("resize", updateCardsToShow);
  }, []);

  // Fetch testimonials
  const fetchTestimonials = async (page = 1) => {
    if (isLoading || page > totalPage) return;
    setIsLoading(true);
    try {
      const res = await dispatch(getFeedbacks({ page, limit: 6 }));
      const data = res?.payload?.data || [];
      const totalPages = res?.payload?.totalPage || 1;

      setTestimonials((prev) => [...prev, ...data]);
      setCurrentPage(page);
      setTotalPage(totalPages);
    } catch (err) {
      console.error("Failed to load testimonials:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (feedbacks.length == 0 || !success || error) {
      fetchTestimonials(1);
    } else {
      setTestimonials(feedbacks);
    }
  }, []);

  const maxIndex = Math.max(testimonials.length - cardsToShow, 0);

  const goToNext = () => {
    if (isLoading) return;

    const nextIndex = currentIndex + cardsToShow;

    // Fetch more if we are near the end and more pages are available
    if (
      nextIndex + cardsToShow > testimonials.length &&
      currentPage < totalPage
    ) {
      fetchTestimonials(currentPage + 1);
    }

    if (nextIndex <= testimonials.length - cardsToShow) {
      setCurrentIndex(nextIndex);
    }
  };

  const goToPrevious = () => {
    if (isLoading || currentIndex === 0) return;
    setCurrentIndex((prev) => Math.max(prev - cardsToShow, 0));
  };

  // Autoplay
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        const nextIndex = currentIndex + cardsToShow;
        if (nextIndex >= testimonials.length && currentPage < totalPage) {
          fetchTestimonials(currentPage + 1);
        } else if (nextIndex <= maxIndex) {
          setCurrentIndex(nextIndex);
        } else {
          setCurrentIndex(0); // Loop
        }
      }, autoPlayInterval);
    }
    return () => interval && clearInterval(interval);
  }, [
    currentIndex,
    isAutoPlaying,
    autoPlayInterval,
    cardsToShow,
    maxIndex,
    testimonials.length,
    currentPage,
  ]);

  return (
    <div className="relative w-full overflow-hidden px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Slider Track */}
        <div className="relative overflow-hidden mt-6">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
            }}
          >
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="w-full px-2"
                style={{ flex: `0 0 ${100 / cardsToShow}%` }}
              >
                <TestimonialCard
                  name={testimonial.fullName}
                  email={testimonial.email}
                  text={testimonial.message}
                  rating={testimonial.ratting}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center mt-4 space-x-4">
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0 || isLoading}
            className={`p-2 rounded-full border-2 ${
              currentIndex === 0 || isLoading
                ? "cursor-not-allowed border-gray-300 text-gray-400"
                : "border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white"
            } transition-colors duration-300`}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNext}
            disabled={isLoading}
            className={`p-2 rounded-full border-2 ${
              isLoading
                ? "cursor-not-allowed border-gray-300 text-gray-400"
                : "border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white"
            } transition-colors duration-300`}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 mx-auto text-teal-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            ) : (
              <ChevronRight size={24} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
