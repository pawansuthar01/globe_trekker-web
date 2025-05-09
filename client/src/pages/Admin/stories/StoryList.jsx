import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Star,
  StarOff,
  Search,
} from "lucide-react";
import SearchBar from "../../../components/AdminComponent/common/SearchBar";
import DeleteModal from "../../../components/AdminComponent/common/DeleteModal";

const StoryList = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - would come from API in real app
  const mockStories = [
    {
      _id: "1",
      title: "My Journey Through the Himalayas",
      slug: "journey-through-himalayas",
      excerpt: "An incredible adventure through the world's highest mountains.",
      content: "Lorem ipsum dolor sit amet...",
      type: "Story",
      category: "Adventure",
      tags: ["mountains", "trekking", "nature"],
      featured: true,
      author: {
        name: "Jane Smith",
        avatar:
          "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg",
        bio: "Travel writer and mountaineer",
      },
      coverImage: {
        url: "https://images.pexels.com/photos/1909140/pexels-photo-1909140.jpeg",
        alt: "Himalayan mountains",
      },
      publishedAt: "2023-05-12T08:00:00Z",
      date: "2023-05-12",
      readTime: "8 min",
    },
    {
      _id: "2",
      title: "Culinary Tour of Thailand",
      slug: "culinary-tour-thailand",
      excerpt: "Exploring the flavors and spices of Thai cuisine.",
      content: "Lorem ipsum dolor sit amet...",
      type: "Story",
      category: "Food",
      tags: ["food", "cuisine", "asia"],
      featured: false,
      author: {
        name: "Michael Wong",
        avatar:
          "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
        bio: "Food blogger and chef",
      },
      coverImage: {
        url: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
        alt: "Thai street food",
      },
      publishedAt: "2023-06-18T14:30:00Z",
      date: "2023-06-18",
      readTime: "5 min",
    },
    {
      _id: "3",
      title: "Road Trip Along the Pacific Coast Highway",
      slug: "pacific-coast-highway-road-trip",
      excerpt:
        "Stunning views and adventures along America's most scenic drive.",
      content: "Lorem ipsum dolor sit amet...",
      type: "Story",
      category: "Road Trip",
      tags: ["roadtrip", "california", "coast"],
      featured: true,
      author: {
        name: "Alex Johnson",
        avatar:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
        bio: "Travel photographer and writer",
      },
      coverImage: {
        url: "https://images.pexels.com/photos/1638659/pexels-photo-1638659.jpeg",
        alt: "Pacific Coast Highway",
      },
      publishedAt: "2023-04-05T10:15:00Z",
      date: "2023-04-05",
      readTime: "10 min",
    },
  ];

  // Filter stories based on search term
  const filteredStories = mockStories.filter(
    (story) =>
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const handleFeaturedToggle = (id) => {
    // API call to toggle featured status
    console.log(`Toggle featured for story with id: ${id}`);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    // API call to delete story
    console.log(`Delete story with id: ${deleteId}`);
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

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="mb-6">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              placeholder="Search stories by title, author, category or tags..."
            />
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
                    Published
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
                        <Link
                          to={`/admin/stories/edit/${story._id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit size={18} />
                        </Link>
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
              </tbody>
            </table>
          </div>
        </div>
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
