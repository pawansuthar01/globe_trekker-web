import HeroSection from "../components/Home/HeroSection";
import LatestStories from "../components/Home/letestStories";
import NewsletterSection from "../components/Home/NewsSeletterSection";
import TopDestinations from "../components/Home/TopDestination";
import TrekkersHighlights from "../components/Home/TrekkerHighlights";

export const Home = () => {
  return (
    <div className="  select-none">
      <HeroSection />
      <TopDestinations />
      <LatestStories />
      <TrekkersHighlights />
      <NewsletterSection />
    </div>
  );
};
