import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Layout } from "./components/Layout/layout";
import DestinationsPage from "./pages/DestinationPages/Destination";
import StoriesPage from "./pages/StoriesPage/Stories";
import AboutPage from "./pages/About";
import ContactPage from "./pages/contact";
import SearchPage from "./pages/SearchPage";
import DestinationDetailPage from "./pages/DestinationPages/DestinationDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/destinations/:id" element={<DestinationDetailPage />} />
        <Route path="/stories" element={<StoriesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Route>
    </Routes>
  );
}

export default App;
