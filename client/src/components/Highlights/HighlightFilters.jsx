import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

const HighlightFilters = ({ activeFilter, onFilterChange, onSearch }) => {
  const filters = [
    { id: "all", label: "All Highlights" },
    { id: "top-rated", label: "Top Rated" },
    { id: "recent", label: "Most Recent" },
    { id: "europe", label: "Europe" },
    { id: "asia", label: "Asia" },
    { id: "americas", label: "Americas" },
  ];

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    onSearch(e.target.value);
  };

  const toggleMobileFilter = () => {
    setMobileFilterOpen(!mobileFilterOpen);
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Traveler Experiences
        </h2>

        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search highlights..."
            className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchValue}
            onChange={handleSearchChange}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
      </div>

      {/* Desktop filters */}
      <div className="hidden md:flex flex-wrap items-center gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === filter.id
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => onFilterChange(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Mobile filters */}
      <div className="md:hidden">
        <button
          className="w-full flex items-center justify-between px-4 py-2 bg-white rounded-lg border border-gray-300"
          onClick={toggleMobileFilter}
        >
          <span className="font-medium">
            {filters.find((f) => f.id === activeFilter)?.label ||
              "All Highlights"}
          </span>
          <ChevronDown
            className={`h-5 w-5 transition-transform ${
              mobileFilterOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {mobileFilterOpen && (
          <div className="mt-2 bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden z-20 absolute">
            {filters.map((filter) => (
              <button
                key={filter.id}
                className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 ${
                  activeFilter === filter.id
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : ""
                }`}
                onClick={() => {
                  onFilterChange(filter.id);
                  setMobileFilterOpen(false);
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HighlightFilters;
