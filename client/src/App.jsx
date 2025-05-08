import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import DestinationsPage from "./pages/DestinationPages/Destination";
import StoriesPage from "./pages/StoriesPage/Stories";
import AboutPage from "./pages/About";
import ContactPage from "./pages/contact";
import SearchPage from "./pages/SearchPage";
import DestinationDetailPage from "./pages/DestinationPages/DestinationDetail";
import StoryDetailPage from "./pages/StoriesPage/StoriesDetail";
import LoginPage from "./pages/auth/login";
import SignupPage from "./pages/auth/Signup";
import ResetPasswordPage from "./pages/PasswordPages/ResetPasswordPage";
import HighlightsPage from "./pages/HighlightsPage";
import Profile from "./pages/auth/profile";
import Layout from "./components/Layout/layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/highlight" element={<HighlightsPage />} />
        <Route path="/destinations/:id" element={<DestinationDetailPage />} />
        <Route path="/stories" element={<StoriesPage />} />
        <Route path="/stories/:id" element={<StoryDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Route>
    </Routes>
  );
}

export default App;
