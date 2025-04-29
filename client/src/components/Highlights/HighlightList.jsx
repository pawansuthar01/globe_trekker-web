import React, { useState, useEffect } from "react";
import HighlightCard from "./HighlightCard";
import { highlights } from "./highlightsData";

const HighlightList = ({ activeFilter, searchTerm }) => {
  const [filteredHighlights, setFilteredHighlights] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    let result = [...highlights];

    // Apply filter
    if (activeFilter !== "all") {
      switch (activeFilter) {
        case "top-rated":
          result = result.filter((h) => h.rating >= 4);
          break;
        case "recent":
          result = [...result].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          break;
        case "europe":
          result = result.filter((h) => h.region === "Europe");
          break;
        case "asia":
          result = result.filter((h) => h.region === "Asia");
          break;
        case "americas":
          result = result.filter((h) => h.region === "Americas");
          break;
      }
    }

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (h) =>
          h.name.toLowerCase().includes(term) ||
          h.location.toLowerCase().includes(term) ||
          h.text.toLowerCase().includes(term)
      );
    }

    setFilteredHighlights(result);
    // Reset to show only initial set when filter changes
    setVisibleCount(6);
  }, [activeFilter, searchTerm]);

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, filteredHighlights.length));
  };

  const featuredHighlight = highlights.find((h) => h.id === 1);

  if (filteredHighlights.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-medium text-gray-700 mb-2">
          No highlights found
        </h3>
        <p className="text-gray-500">
          Try adjusting your filters or search terms
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Regular highlights grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHighlights.slice(0, visibleCount).map((highlight) => (
          <HighlightCard key={highlight.id} highlight={highlight} />
        ))}
      </div>

      {/* Load more button */}
      {visibleCount < filteredHighlights.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default HighlightList;
