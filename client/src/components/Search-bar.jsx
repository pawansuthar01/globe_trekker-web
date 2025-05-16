import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";

export const SearchBar = ({ searchVisible, setSearchVisible, onResults }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const debounceTimeout = useRef(null);
  const navigate = useNavigate();

  // Debounce search input
  useEffect(() => {
    if (!searchTerm.trim()) {
      onResults && onResults([]); // Agar search khali hai toh results clear kar do
      return;
    }

    setLoading(true);
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      fetchSearchResults(searchTerm);
    }, 500); // 500ms ke baad backend call

    return () => clearTimeout(debounceTimeout.current);
  }, [searchTerm]);

  // Backend API call function
  const fetchSearchResults = async (query) => {
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}`,
        {
          method: "GET",
          credentials: "include", // session cookie ya auth token ke liye
        }
      );

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();

      // Agar session/token backend se aata hai wo bhi yahan handle kar sakte hain
      // const sessionToken = response.headers.get("Authorization");

      onResults && onResults(data.results); // parent component ko results bhejo
      setLoading(false);
    } catch (error) {
      console.error("Search fetch failed:", error);
      onResults && onResults([]);
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
      setSearchVisible(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {searchVisible && (
          <motion.form
            onSubmit={handleSearchSubmit}
            initial={{ width: 10 }}
            animate={{ width: "80%" }}
            exit={{ width: 10 }}
            transition={{ duration: 0.3, ease: "linear" }}
            className="fixed top-6 left-1/2 transform border-2 border-primary-300 -translate-x-1/2 w-[80%] z-50 flex items-center overflow-hidden rounded-full bg-neutral-100 pl-10 py-2 px-4"
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none w-full py-2"
            />
            <Search className="absolute left-3 top-4.1 h-5 w-5 text-neutral-500" />
            <button
              type="button"
              onClick={() => setSearchVisible(false)}
              className="absolute right-3 top-4.1"
            >
              <X className="h-5 w-5 text-neutral-500" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {!searchVisible && (
        <button
          onClick={() => setSearchVisible(true)}
          className="p-2 rounded-full hover:bg-neutral-100 transition-all duration-300 ease-linear"
        >
          <Search className="h-5 w-5 text-neutral-700" />
        </button>
      )}

      {loading && searchTerm.trim() && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-white border p-2 rounded shadow z-50">
          Searching...
        </div>
      )}
    </>
  );
};
