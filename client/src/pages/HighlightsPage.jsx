import React from "react";
import HighlightHeader from "../components/Highlights/HighlightHeader";
import HighlightList from "../components/Highlights/HighlightList";
import HighlightFilters from "../components/Highlights/HighlightFilters";

const HighlightsPage = () => {
  const [activeFilter, setActiveFilter] = React.useState("all");
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HighlightHeader />

      <div className="container mx-auto px-4 py-8">
        <HighlightFilters
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
        />

        <HighlightList activeFilter={activeFilter} searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default HighlightsPage;
