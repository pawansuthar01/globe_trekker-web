import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Search } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  getAllSearchKeywords,
  searchDestinations,
  searchDestinationsAndStories,
  searchHighlights,
  searchStories,
  suggestSearchKeywords,
} from "../Redux/Slice/SearchSlice";

export const SearchBar = ({
  stories = false,
  destination = false,
  NoSearchData,
  Data,
  w = "w-full",
}) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(false);
  const [results, setResults] = useState([]);
  const debounceRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      setSearch(true);
      const res = await dispatch(suggestSearchKeywords(searchTerm));

      if (res?.payload?.data) {
        setResults(res?.payload?.data);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(debounceRef.current);
  }, [searchTerm]);

  const handelSubmit = async (e) => {
    e.preventDefault();
    setSearch(false);

    const res = await dispatch(
      stories
        ? searchStories(searchTerm)
        : destination
        ? searchDestinations(searchTerm)
        : searchHighlights(searchTerm)
    );
    console.log(res);

    if (res?.payload?.success) {
      if (res.payload?.data.length !== 0) {
        Data(res?.payload?.data);
      } else {
        NoSearchData(true);
      }
    } else {
      NoSearchData(true);
    }
  };
  return (
    <div className={`relative  ${w} mx-auto z-20`} ref={dropdownRef}>
      <form onSubmit={handelSubmit} className="relative flex">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search places, destinations..."
          className="w-full py-3 px-4 pl-10 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
        />
        <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-neutral-400" />
        <button className=" absolute right-3 top-1 border rounded-md bg-blue-500 px-7 py-2 hover:border-blue-500 hover:bg-blue-400">
          <Search className="text-white" />
        </button>
      </form>

      {searchTerm.trim() && search && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-neutral-300 shadow-md rounded-md max-h-64 overflow-y-auto">
          {loading ? (
            <p className="p-3 text-sm text-gray-400">Searching...</p>
          ) : results.length > 0 ? (
            results.map((item, i) => (
              <div
                key={i}
                onClick={() => {
                  setSearchTerm(item);
                  setSearch(false);
                }}
                className="cursor-pointer px-4 py-2 text-sm hover:bg-neutral-100"
              >
                {item}
              </div>
            ))
          ) : (
            <p className="p-3 text-sm text-gray-400">No results found.</p>
          )}
        </div>
      )}
    </div>
  );
};
