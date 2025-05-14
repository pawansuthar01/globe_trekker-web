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
import ProtectedRoute from "./components/AdminComponent/auth/ProtectedRoute";
import Dashboard from "./pages/Admin/Dashboard";
import DestinationList from "./pages/Admin/destinations/DestinationList";
import DestinationForm from "./pages/Admin/destinations/DestinationForm";
import HighlightList from "./pages/Admin/highlights/HighlightList";
import HighlightForm from "./pages/Admin/highlights/HighlightForm";
import StoryList from "./pages/Admin/stories/StoryList";
import StoryForm from "./pages/Admin/stories/StoryForm";
import UserList from "./pages/Admin/users/UserList";
import UserDetail from "./pages/Admin/users/UserDetail";
import ContactList from "./pages/Admin/contacts/ContactList";
import AboutUpdatePage from "./pages/Admin/about/aboutPage";
import AdminLayout from "./components/AdminComponent/layouts/AdminLayout";
import BannerPage from "./pages/Admin/banner/BannerPage";
import TeamMembers from "./pages/Admin/about/TeamMembers";
import CheckLogin from "./pages/checkLoginValid";
import PageNotFound from "./pages/NotFound";
import RequireAuth from "./components/AdminComponent/auth/ProtectedRoute";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CheckLoggedIn from "./components/AdminComponent/auth/isLoogedIn";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="*" element={<PageNotFound />} />
        <Route index element={<Home />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/highlight" element={<HighlightsPage />} />
        <Route path="/destinations/:id" element={<DestinationDetailPage />} />
        <Route path="/stories" element={<StoriesPage />} />
        <Route path="/stories/:id" element={<StoryDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/auth/check-login" element={<CheckLogin />} />
        <Route path="/profile" element={<Profile />} />
        <Route element={<CheckLoggedIn />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Route>
      <Route element={<RequireAuth allowedRole={["ADMIN", "AUTHOR"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="destinations" element={<DestinationList />} />
          <Route path="about" element={<AboutUpdatePage />} />
          <Route path="about/team" element={<TeamMembers />} />
          <Route path="banners" element={<BannerPage />} />
          <Route path="destinations/create" element={<DestinationForm />} />
          <Route path="destinations/edit/:id" element={<DestinationForm />} />
          <Route path="highlights" element={<HighlightList />} />
          <Route path="highlights/create" element={<HighlightForm />} />
          <Route path="highlights/edit/:id" element={<HighlightForm />} />
          <Route path="stories" element={<StoryList />} />
          <Route path="stories/create" element={<StoryForm />} />
          <Route path="stories/edit/:id" element={<StoryForm />} />
          <Route path="users" element={<UserList />} />
          <Route path="users/:id" element={<UserDetail />} />
          <Route path="contacts" element={<ContactList />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
