import React, { useState, useEffect } from "react";
import HighlightCard from "./HighlightCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchHighlights } from "../../Redux/Slice/highlightSlice";
import SkeletonHighlight from "../Skeleton/highlightSkeletonPage";

const HighlightList = ({ activeFilter, searchTerm }) => {
  const dispatch = useDispatch();
  const { highlights, success, page, error, totalPages } = useSelector(
    (state) => state?.highlight
  );

  const [loading, setLoading] = useState(false);
  const [highlightsData, setHighlightsData] = useState([]);
  const [filteredHighlights, setFilteredHighlights] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Start from page 1

  // 🟢 Fetch highlights when page changes
  const fetchHighlightListData = async (pageNumber = 1) => {
    setLoading(true);
    const res = await dispatch(
      fetchHighlights({ page: pageNumber, limit: 20 })
    );

    if (res?.payload?.success) {
      const newHighlights = res?.payload?.data || [];

      setHighlightsData((prev) => {
        const combined = [...prev, ...newHighlights];
        // Remove duplicates
        return Array.from(new Set(combined.map((h) => h._id))).map((id) =>
          combined.find((h) => h._id === id)
        );
      });
    }
    setLoading(false);
  };

  // ⏬ Fetch when currentPage changes
  useEffect(() => {
    fetchHighlightListData(currentPage);
  }, [currentPage]);

  // 🧠 Apply filters & search
  useEffect(() => {
    let result = [...highlightsData];

    // Filter
    if (activeFilter !== "all") {
      switch (activeFilter) {
        case "top-rated":
          result = result.filter((h) => h.rating >= 4);
          break;
        case "recent":
          result = result.sort(
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
        default:
          break;
      }
    }

    // Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter((h) => {
        const name = h.name?.toLowerCase() || "";
        const location = h.location?.toLowerCase() || "";
        const text = h.text?.toLowerCase() || "";
        return (
          name.includes(term) || location.includes(term) || text.includes(term)
        );
      });
    }

    setFilteredHighlights(result);
  }, [activeFilter, searchTerm, highlightsData]);

  // Load more
  const loadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="space-y-12">
      {/* Highlight Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && currentPage === 1 ? (
          <SkeletonHighlight />
        ) : filteredHighlights.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No highlights found
            </h3>
            <p className="text-gray-500">
              Try adjusting your filters or search terms
            </p>
          </div>
        ) : (
          filteredHighlights.map((highlight) => (
            <div key={highlight._id} className="w-full">
              <HighlightCard highlight={highlight} />
            </div>
          ))
        )}
      </div>

      {/* Load More Button */}
      {currentPage < totalPages && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            disabled={loading}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              loading
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading && currentPage > 1 ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default HighlightList;
