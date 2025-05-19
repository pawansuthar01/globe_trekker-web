import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Plus,
  Edit,
  Trash2,
  EyeOff,
  Star,
  StarOff,
  RotateCw,
} from "lucide-react";
import SearchBar from "../../../components/AdminComponent/common/SearchBar";
import DeleteModal from "../../../components/AdminComponent/common/DeleteModal";
import {
  deleteStory,
  fetchAdminStories,
  markAsFeatured,
} from "../../../Redux/Slice/storiesSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import StoryListSkeleton from "../../../components/Skeleton/admin/Story/listSkeleton";

const StoryList = () => {
  const {
    stories: story,
    success,
    error,
    page,
    totalPages,
  } = useSelector((state) => state?.story);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(page);
  async function FetchStories(page = 1) {
    setLoading(true);

    const res = await dispatch(fetchAdminStories({ page, limit: 15 }));
    if (res?.payload?.success) {
      setStories(res?.payload?.data);
    }
    setLoading(false);
  }
  useEffect(() => {
    if (story.length == 0 || !success || error == true) {
      FetchStories(currentPage);
    } else {
      setStories(story);
    }
  }, []);

  // Filter stories based on search term
  const filteredStories = stories.filter(
    (story) =>
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const handleFeaturedToggle = async (id) => {
    // API call to toggle publish status
    const res = await dispatch(markAsFeatured(id));
    if (res?.payload?.success) {
      toast.success(res?.payload?.message);
      setStories(stories.map((s) => (s._id === id ? res?.payload?.data : s)));
    } else {
      toast.error(res?.payload?.message);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);
  const handleDelete = async () => {
    // API call to delete Highlight
    const res = await dispatch(deleteStory(deleteId));

    if (res?.payload?.success) {
      toast.success(res?.payload?.message);
      setStories(stories.filter((s) => s._id !== deleteId));
    } else {
      toast.error(res?.payload?.message);
    }

    setIsDeleteModalOpen(false);
    setDeleteId(null);
  };

  return (
    <div className="space-y-6 overflow-x-hidden  p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Stories</h1>
        <Link
          to="/admin/stories/create"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add Story
        </Link>
      </div>

      <div className="bg-white  shadow  rounded-lg">
        <div className="px-4 py-5 sm:p-6 ">
          <div className="flex items-center mb-6">
            <button
              disabled={loading}
              onClick={FetchStories}
              className="flex bg-green-500 p-2 rounded-md text-white"
              title="Refresh List"
            >
              <RotateCw className="w-4 h-4" />
            </button>
            <div className="">
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                placeholder="Search stories by title, author, category or tags..."
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Story
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Read Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Featured
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Published
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              {loading ? (
                <StoryListSkeleton />
              ) : (
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStories.map((story) => (
                    <tr key={story._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-md object-cover"
                              src={story.coverImage.url}
                              alt={story.coverImage.alt}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {story.title}
                            </div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {story.excerpt.substring(0, 50)}...
                            </div>
                            <div className="mt-1 flex items-center space-x-1">
                              {story.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8">
                            <img
                              className="h-8 w-8 rounded-full"
                              src={story.author.avatar}
                              alt={story.author.name}
                            />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {story.author.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {story.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>{story.date}</div>
                        <div>{story.readTime} read</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            story.featured
                              ? "bg-amber-100 text-amber-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {story.featured ? "Featured" : "Regular"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            story.isPublished
                              ? "bg-green-100 text-green-400"
                              : "bg-gray-100 text-red-800"
                          }`}
                        >
                          {story.isPublished ? "isPublished" : "Private"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleFeaturedToggle(story._id)}
                            className="text-amber-600 hover:text-amber-900"
                            title={
                              story.featured
                                ? "Remove from featured"
                                : "Add to featured"
                            }
                          >
                            {story.featured ? (
                              <StarOff size={18} />
                            ) : (
                              <Star size={18} />
                            )}
                          </button>
                          <button
                            onClick={() =>
                              navigate(`edit/${story?._id}`, {
                                state: { story },
                              })
                            }
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(story._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {!loading && filteredStories.length === 0 && (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center py-6 text-gray-500"
                      >
                        No stories found.
                      </td>
                    </tr>
                  )}
                </tbody>
              )}
            </table>
          </div>
        </div>
        {totalPages > 1 && (
          <div className="flex justify-end items-center gap-4 m-2">
            <button
              disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage((prev) => prev - 1);
                FetchStories(currentPage - 1);
              }}
              className="px-4 py-2 bg-primary-600 text-white rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="text-neutral-700">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => {
                setCurrentPage((prev) => prev - 1);
                FetchStories(currentPage + 1);
              }}
              className="px-4 py-2 bg-primary-600 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDelete}
        title="Delete Story"
        message="Are you sure you want to delete this story? This action cannot be undone."
      />
    </div>
  );
};

export default StoryList;
