import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2, Eye, EyeOff, Search } from "lucide-react";
import StatusBadge from "../../../components/AdminComponent/common/StatusBadge";
import DeleteModal from "../../../components/AdminComponent/common/DeleteModal";
import SearchBar from "../../../components/AdminComponent/common/SearchBar";

const HighlightList = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - would come from API in real app
  const mockHighlights = [
    {
      _id: "1",
      name: "Beautiful Beaches of Bali",
      slug: "beautiful-beaches-of-bali",
      image:
        "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg",
      description:
        "Explore the pristine beaches with crystal clear waters and white sand.",
      location: "Bali",
      region: "Asia",
      rating: 4.8,
      isPublished: true,
      date: "2023-06-15",
    },
    {
      _id: "2",
      name: "Ancient Temples of Kyoto",
      slug: "ancient-temples-of-kyoto",
      image: "https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg",
      description:
        "Discover the spiritual heart of Japan in these serene ancient temples.",
      location: "Kyoto",
      region: "Asia",
      rating: 4.9,
      isPublished: true,
      date: "2023-05-20",
    },
    {
      _id: "3",
      name: "Safari in Serengeti",
      slug: "safari-in-serengeti",
      image: "https://images.pexels.com/photos/259397/pexels-photo-259397.jpeg",
      description:
        "Witness the incredible wildlife in one of Africa's most famous national parks.",
      location: "Tanzania",
      region: "Africa",
      rating: 4.7,
      isPublished: false,
      date: "2023-07-10",
    },
    {
      _id: "4",
      name: "Northern Lights in Norway",
      slug: "northern-lights-norway",
      image:
        "https://images.pexels.com/photos/1933316/pexels-photo-1933316.jpeg",
      description:
        "Experience the magical aurora borealis dancing across the Arctic sky.",
      location: "Norway",
      region: "Europe",
      rating: 4.9,
      isPublished: true,
      date: "2023-01-12",
    },
  ];

  // Filter highlights based on search term
  const filteredHighlights = mockHighlights.filter(
    (highlight) =>
      highlight.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      highlight.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      highlight.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePublishToggle = (id) => {
    // API call to toggle publish status
    console.log(`Toggle publish for highlight with id: ${id}`);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    // API call to delete highlight
    console.log(`Delete highlight with id: ${deleteId}`);
    setIsDeleteModalOpen(false);
    setDeleteId(null);
  };

  return (
    <div className="space-y-6 overflow-x-hidden  p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Highlights</h1>
        <Link
          to="/admin/highlights/create"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add Highlight
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="mb-6">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              placeholder="Search highlights by name, location or region..."
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Highlight
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Added
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredHighlights.map((highlight) => (
                  <tr key={highlight._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-md object-cover"
                            src={highlight.image}
                            alt={highlight.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {highlight.name}
                          </div>
                          <div className="text-sm text-gray-500 truncate max-w.xs">
                            {highlight.description.substring(0, 50)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {highlight.location}
                      </div>
                      <div className="text-sm text-gray-500">
                        {highlight.region}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {highlight.rating}/5
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {highlight.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={highlight.isPublished} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handlePublishToggle(highlight._id)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          {highlight.isPublished ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                        <Link
                          to={`/admin/highlights/edit/${highlight._id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(highlight._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDelete}
        title="Delete Highlight"
        message="Are you sure you want to delete this highlight? This action cannot be undone."
      />
    </div>
  );
};

export default HighlightList;
