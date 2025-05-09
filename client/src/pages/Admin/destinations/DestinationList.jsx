import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2, Eye, EyeOff, Search } from "lucide-react";
import StatusBadge from "../../../components/AdminComponent/common/StatusBadge";
import DeleteModal from "../../../components/AdminComponent/common/DeleteModal";

const DestinationList = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - would come from API in real app
  const mockDestinations = [
    {
      _id: "1",
      name: "Bali, Indonesia",
      slug: "bali-indonesia",
      thumbnail: {
        url: "https://images.pexels.com/photos/1586795/pexels-photo-1586795.jpeg",
        alt: "Bali beaches",
      },
      category: "Beach",
      location: {
        country: "Indonesia",
        region: "Asia",
      },
      rating: {
        value: 4.8,
        count: 265,
      },
      featured: true,
      isPublished: true,
    },
    {
      _id: "2",
      name: "Tokyo, Japan",
      slug: "tokyo-japan",
      thumbnail: {
        url: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg",
        alt: "Tokyo skyline",
      },
      category: "City",
      location: {
        country: "Japan",
        region: "Asia",
      },
      rating: {
        value: 4.7,
        count: 198,
      },
      featured: true,
      isPublished: true,
    },
    {
      _id: "3",
      name: "Paris, France",
      slug: "paris-france",
      thumbnail: {
        url: "https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg",
        alt: "Eiffel Tower",
      },
      category: "City",
      location: {
        country: "France",
        region: "Europe",
      },
      rating: {
        value: 4.6,
        count: 342,
      },
      featured: false,
      isPublished: true,
    },
    {
      _id: "4",
      name: "Swiss Alps",
      slug: "swiss-alps",
      thumbnail: {
        url: "https://images.pexels.com/photos/355770/pexels-photo-355770.jpeg",
        alt: "Swiss Alps mountains",
      },
      category: "Mountain",
      location: {
        country: "Switzerland",
        region: "Europe",
      },
      rating: {
        value: 4.9,
        count: 156,
      },
      featured: false,
      isPublished: false,
    },
  ];

  // Filter destinations based on search term
  const filteredDestinations = mockDestinations.filter(
    (destination) =>
      destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.location.country
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      destination.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePublishToggle = (id) => {
    // API call to toggle publish status
    console.log(`Toggle publish for destination with id: ${id}`);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    // API call to delete destination
    console.log(`Delete destination with id: ${deleteId}`);
    setIsDeleteModalOpen(false);
    setDeleteId(null);
  };

  return (
    <div className="space-y-6  overflow-x-hidden p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Destinations</h1>
        <Link
          to="/admin/destinations/create"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add Destination
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center">
            <div className="w-full max-w-lg">
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search destinations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Destination
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Featured
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDestinations.map((destination) => (
                  <tr key={destination._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-md object-cover"
                            src={destination.thumbnail.url}
                            alt={destination.thumbnail.alt}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {destination.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {destination.slug}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {destination.location.country}
                      </div>
                      <div className="text-sm text-gray-500">
                        {destination.location.region}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {destination.category}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {destination.rating.value} ({destination.rating.count}{" "}
                        reviews)
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={destination.isPublished} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          destination.featured
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {destination.featured ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handlePublishToggle(destination._id)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          {destination.isPublished ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                        <Link
                          to={`/admin/destinations/edit/${destination._id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(destination._id)}
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
        title="Delete Destination"
        message="Are you sure you want to delete this destination? This action cannot be undone."
      />
    </div>
  );
};

export default DestinationList;
