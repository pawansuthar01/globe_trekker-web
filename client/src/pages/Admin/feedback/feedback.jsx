import React, { useState, useEffect } from "react";
import { Trash2, Search, AlertCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFeedback,
  getFeedbacks,
} from "../../../Redux/Slice/feedbackSlice";
import DeleteModal from "../../../components/AdminComponent/common/DeleteModal";
import toast from "react-hot-toast";

const AdminFeedbackPage = () => {
  const dispatch = useDispatch();
  const {
    feedbacks,
    totalPages = 5,
    success,
    error: Error,
  } = useSelector((state) => state?.Feedback);

  const [feedback, setFeedback] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [error, setError] = useState(false);
  const [DeleteId, setDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;

  useEffect(() => {
    if (
      feedbacks.length == 0 ||
      !success == false ||
      Error == true ||
      error == true
    ) {
      fetchFeedback(currentPage);
    } else {
      setFeedback(feedbacks);
      setLoading(false);
    }
  }, []);

  const fetchFeedback = async (page) => {
    try {
      const { payload } = await dispatch(getFeedbacks({ page, limit }));

      setFeedback(payload?.data || []);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch feedback");
      setLoading(false);
    }
  };
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    const res = await dispatch(deleteFeedback(DeleteId));
    if (res?.payload?.success) {
      toast.success(res?.payload?.message);
      setFeedback((prev) => prev.filter((item) => item._id !== DeleteId));
    } else {
      toast.error(res?.payload?.message);
    }
    setDeleteId(null);
    setIsDeleteModalOpen(false);
  };

  const filteredFeedback = feedback.filter(
    (item) =>
      item?.text?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">
              Feedback Management
            </h1>

            {/* Search Bar */}
            <div className="mt-4 relative">
              <input
                type="text"
                placeholder="Search feedback..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={20}
              />
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 rounded-md flex items-center text-red-700">
                <AlertCircle className="mr-2" size={20} />
                {error}
              </div>
            )}
          </div>

          {/* Feedback List */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Feedback
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredFeedback.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {item.name}
                      </div>
                      <div className="text-sm text-gray-500">{item.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {item.location}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-amber-500 mr-1">★</span>
                        <span>{item.ratting}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-md truncate">
                        {item.message}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleDeleteClick(item._id)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredFeedback.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No feedback found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="p-6 flex justify-between items-center border-t bg-gray-50">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-md text-white bg-teal-500 hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              ← Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-md text-white bg-teal-500 hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDelete}
        title={"Delete This Feedback"}
        message={
          "Are you sure you want to delete this Feedback? This action cannot be undone."
        }
      />
    </div>
  );
};

export default AdminFeedbackPage;
