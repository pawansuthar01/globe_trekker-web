import HeroSection from "../components/Home/HeroSection";
import LatestStories from "../components/Home/letestStories";
import TopDestinations from "../components/Home/TopDestination";

export const Home = () => {
  return (
    <div>
      <HeroSection />
      <TopDestinations />
      <LatestStories />
    </div>
  );
};
