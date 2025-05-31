import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getFeedbacks } from "../../Redux/Slice/feedbackSlice";
import TestimonialCard from "./feedbackCart";

const TestimonialSlider = () => {
  const dispatch = useDispatch();
  const { feedbacks, success, error } = useSelector((state) => state?.Feedback);

  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

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
    if (isLoading) return;
    setIsLoading(true);
    try {
      const res = await dispatch(getFeedbacks({ page, limit: 6 }));
      const data = res?.payload?.data || [];

      setTestimonials((prev) => [...prev, ...data]);
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
    if (isLoading || currentIndex === maxIndex) return;

    const nextIndex = currentIndex + cardsToShow;

    setCurrentIndex(nextIndex);
  };

  const goToPrevious = () => {
    if (isLoading || currentIndex === 0) return;
    setCurrentIndex((prev) => Math.max(prev - cardsToShow, 0));
  };

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
            disabled={currentIndex === 6 || isLoading}
            className={`p-2 rounded-full border-2 ${
              currentIndex === 6 || isLoading
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
