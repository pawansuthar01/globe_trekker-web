import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  placeholder = "Search...",
}) => {
  return (
    <div className="w-full max-w-lg">
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
