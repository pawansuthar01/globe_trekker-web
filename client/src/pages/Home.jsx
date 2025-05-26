import HeroSection from "../components/Home/HeroSection";
import LatestStories from "../components/Home/letestStories";
import NewsletterSection from "../components/Home/NewsSeletterSection";
import TopDestinations from "../components/Home/TopDestination";
import TrekkersHighlights from "../components/Home/TrekkerHighlights";
import CustomCookieBanner from "../components/CookieConsent";
import TestimonialSlider from "../components/feedback/FeedbackList";
import FeedbackForm from "../components/feedback/feedbackform";
import { Helmet } from "react-helmet-async";

export const Home = () => {
  return (
    <div className="select-none">
      <Helmet>
        <title>Home - Globe Trekker</title>
        <meta
          name="description"
          content="Discover breathtaking travel destinations, real traveler stories, and expert tips on Globe Trekker."
        />
        <meta
          name="keywords"
          content="travel blog, explore destinations, travel stories, adventure tips, Globe Trekker"
        />
        <meta name="author" content="Globe Trekker Team" />

        <meta property="og:title" content="Home - Globe Trekker" />
        <meta
          property="og:description"
          content="Start your travel journey with Globe Trekker. Explore stories, tips, and guides from real travelers."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://globetrekker.site" />
        <meta
          property="og:image"
          content="https://globetrekker.site/Logo.jpeg"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Home - Globe Trekker" />
        <meta
          name="twitter:description"
          content="Dive into travel adventures and discover beautiful destinations on Globe Trekker."
        />
        <meta
          name="twitter:image"
          content="https://globetrekker.site/Logo.jpeg"
        />
      </Helmet>

      <HeroSection />
      <TopDestinations />
      <LatestStories />
      <TrekkersHighlights />
      <CustomCookieBanner />
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              What Our Travelers Say
            </h2>
            <p className="text-gray-600 text-center mt-4 max-w-2xl mx-auto">
              Discover why thousands of adventure seekers choose Treker for
              their unforgettable journeys around the world.
            </p>
          </div>

          <TestimonialSlider />
        </div>
      </section>
      <FeedbackForm />
      <NewsletterSection />
    </div>
  );
};
