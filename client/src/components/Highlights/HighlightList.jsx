import React, { useState, useEffect } from "react";
import HighlightCard from "./HighlightCard";
import { useDispatch } from "react-redux";
import { fetchHighlights } from "../../Redux/Slice/highlightSlice";
import SkeletonHighlight from "../Skeleton/highlightSkeletonPage";

const HighlightList = ({ activeFilter, searchTerm }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [highlights, setHighlights] = useState([]);
  const [filteredHighlights, setFilteredHighlights] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [page, setPage] = useState(1); // Start at page 1
  const [totalPages, setTotalPages] = useState(1); // Keep track of total pages

  const fetchHighlightListData = async (pageNumber = 1) => {
    setLoading(true);
    const res = await dispatch(
      fetchHighlights({ page: pageNumber, limit: 30 })
    );
    if (res?.payload?.success) {
      // Filter out duplicates before updating the highlights state
      setHighlights((prev) => {
        const newHighlights = res?.payload?.data || [];
        const combined = [...prev, ...newHighlights];
        // Remove duplicates by filtering out highlights with the same _id
        return Array.from(new Set(combined.map((h) => h._id))).map((id) =>
          combined.find((h) => h._id === id)
        );
      });
      setTotalPages(res?.payload?.totalPages); // Set total pages from response
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHighlightListData(page); // Fetch data for the current page
  }, [page]);

  useEffect(() => {
    let result = highlights;

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
      result = result.filter((h) => {
        const name = h.name ? h.name.toLowerCase() : "";
        const location = h.location ? h.location.toLowerCase() : "";
        const text = h.text ? h.text.toLowerCase() : "";

        return (
          name.includes(term) || location.includes(term) || text.includes(term)
        );
      });
    }

    setFilteredHighlights(result);
    setVisibleCount(6);
  }, [activeFilter, searchTerm, highlights]);

  const loadMore = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="space-y-12">
      {/* Regular highlights grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
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
          filteredHighlights
            .slice(0, visibleCount)
            .map((highlight) => (
              <HighlightCard key={highlight._id} highlight={highlight} />
            ))
        )}
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
