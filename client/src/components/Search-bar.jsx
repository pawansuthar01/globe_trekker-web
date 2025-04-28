import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
export const Search_bar = ({ searchVisible, setSearchVisible }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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
      {searchVisible ? (
        <motion.form
          onSubmit={handleSearchSubmit}
          initial={{ width: 10 }}
          animate={{ width: 200 }}
          exit={{ width: 10 }}
          transition={{ duration: 0.3, ease: "linear" }}
          className="relative flex items-center overflow-hidden rounded-full bg-neutral-100 pl-10 py-2 px-4"
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent outline-none w-full"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
          <button
            type="button"
            onClick={() => setSearchVisible(false)}
            className="absolute right-3 top-2.5"
          >
            <X className="h-4 w-4 text-neutral-500" />
          </button>
        </motion.form>
      ) : (
        <button
          onClick={() => setSearchVisible(true)}
          className="p-2 rounded-full hover:bg-neutral-100 transition-all duration-300   ease-linear"
        >
          <Search className="h-5 w-5 text-neutral-700" />
        </button>
      )}
    </>
  );
};
