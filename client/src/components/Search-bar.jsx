import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Search, X } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  searchDestinations,
  searchStories,
  searchHighlights,
  searchDestinationsAndStories,
  suggestSearchKeywords,
} from "../Redux/Slice/SearchSlice";

export const SearchBar = ({
  AllStoriesAndDestination = false,
  stories = false,
  searchQuery = "",
  oldData,
  globeSearch = false,
  button = true,
  destination = false,
  NoSearchData,
  className,
  Data,
  w = "w-full",
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const debounceRef = useRef(null);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced suggestions
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      const res = await dispatch(suggestSearchKeywords(searchTerm));

      if (res?.payload?.data) {
        setSuggestions(res.payload.data);
        setShowDropdown(true);
      } else {
        setSuggestions([]);
      }

      setLoading(false);
    }, 500);
    if (setShowDropdown) {
      setTimeout(() => {
        setShowDropdown(false);
      }, 5000);
    }

    return () => clearTimeout(debounceRef.current);
  }, [searchTerm]);
  const runSearch = async (term = searchTerm) => {
    if (globeSearch) {
      navigate(`/search?q=${term}`);
      return;
    }
    const res = await dispatch(
      stories
        ? searchStories(term)
        : destination
        ? searchDestinations(term)
        : AllStoriesAndDestination
        ? searchDestinationsAndStories(term)
        : searchHighlights(term)
    );

    if (res?.payload?.success) {
      if (res.payload?.data.length !== 0) {
        Data(res?.payload?.data);
        setSearch(true);
      } else {
        NoSearchData(true);
        setSearch(true);
      }
    } else {
      NoSearchData(true);
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    await runSearch();
  };
  const handelOldData = () => {
    setSearch(false);
    oldData();
  };
  useEffect(() => {
    if (searchQuery) {
      // simulate pressing "Enter" on page load by calling SearchBar's handler manually
      document
        .querySelector("form")
        ?.dispatchEvent(
          new Event("submit", { bubbles: true, cancelable: true })
        );
    }
  }, [searchQuery]);

  return (
    <div className={`relative ${w} mx-auto z-20`} ref={dropdownRef}>
      <form onSubmit={handelSubmit} className="relative flex">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search places, destinations..."
          className={
            className ||
            "w-full py-3 px-4 pl-10 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
          }
        />
        {search && (
          <button
            onClick={() => {
              handelOldData();
              setSearchTerm("");
            }}
            className=" absolute   top-1  rounded-lg  z-30 right-28 text-white bg-red-500 p-2 text-2xl"
          >
            <X />
          </button>
        )}
        {button && (
          <>
            <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-neutral-400" />
            <button
              type="submit"
              className="absolute right-3 top-1 border rounded-md bg-blue-500 px-7 py-2 hover:bg-blue-400"
            >
              <Search className="text-white" />
            </button>
          </>
        )}
      </form>

      {searchTerm.trim() && showDropdown && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-neutral-300 shadow-md rounded-md max-h-64 overflow-y-auto">
          {loading ? (
            <p className="p-3 text-sm text-gray-400">Searching...</p>
          ) : suggestions.length > 0 ? (
            suggestions.map((item, index) => (
              <button
                key={index}
                onClick={async () => {
                  setShowDropdown(false);
                  setSearchTerm(item);
                  await runSearch(item);
                }}
                className="cursor-pointer flex w-full gap-1 px-4 py-2 text-sm hover:bg-neutral-100"
              >
                {item}
              </button>
            ))
          ) : (
            <p className="p-3 text-sm text-gray-400">No results found.</p>
          )}
        </div>
      )}
    </div>
  );
};
