import { useDispatch } from "react-redux";
import HeroSection from "../components/Home/HeroSection";
import LatestStories from "../components/Home/letestStories";
import NewsletterSection from "../components/Home/NewsSeletterSection";
import TopDestinations from "../components/Home/TopDestination";
import TrekkersHighlights from "../components/Home/TrekkerHighlights";
import { ContinueWithGoogle } from "../Redux/Slice/authSlice";
import { useEffect } from "react";

export const Home = () => {
  const dispatch = useDispatch();
  const CheckLoginWithGoogle = async () => {
    const res = await dispatch(ContinueWithGoogle());
    console.log(res);
  };
  useEffect(() => {
    CheckLoginWithGoogle();
  }, []);
  return (
    <div className=" select-none">
      <HeroSection />
      <TopDestinations />
      <LatestStories />
      <TrekkersHighlights />
      <NewsletterSection />
    </div>
  );
};
