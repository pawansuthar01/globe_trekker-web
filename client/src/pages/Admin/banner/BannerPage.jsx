import React, { useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  X,
  Save,
  Check,
  Image as ImageIcon,
} from "lucide-react";

const BannerPage = () => {
  // Sample data
  const [banners, setBanners] = useState([
    {
      id: "1",
      title: "Summer Sale",
      description: "Get up to 50% off on all summer collections.",
      smallDescription: "Limited time offer",
      images: [
        {
          public_id: "banner1_1",
          secure_url:
            "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
          public_id: "banner1_2",
          secure_url:
            "https://images.pexels.com/photos/5632397/pexels-photo-5632397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
      ],
      active: true,
      createdAt: "2023-05-15T10:30:00Z",
    },
    {
      id: "2",
      title: "New Arrivals",
      description: "Check out our latest products and collections.",
      smallDescription: "Fresh and trendy",
      images: [
        {
          public_id: "banner2_1",
          secure_url:
            "https://images.pexels.com/photos/4968391/pexels-photo-4968391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
      ],
      active: false,
      createdAt: "2023-06-20T14:15:00Z",
    },
    {
      id: "3",
      title: "Holiday Special",
      description: "Discover our exclusive holiday deals and gifts.",
      smallDescription: "Celebrate with us",
      images: [
        {
          public_id: "banner3_1",
          secure_url:
            "https://images.pexels.com/photos/5624982/pexels-photo-5624982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
          public_id: "banner3_2",
          secure_url:
            "https://images.pexels.com/photos/5632398/pexels-photo-5632398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
          public_id: "banner3_3",
          secure_url:
            "https://images.pexels.com/photos/4439901/pexels-photo-4439901.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
      ],
      active: true,
      createdAt: "2023-07-05T09:45:00Z",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);

  const [tempBanner, setTempBanner] = useState({
    title: "",
    description: "",
    smallDescription: "",
    images: [],
    active: false,
  });

  // Filtered banners
  const filteredBanners = banners.filter(
    (banner) =>
      banner.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      banner.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAddModal = () => {
    setEditingBanner(null);
    setTempBanner({
      title: "",
      description: "",
      smallDescription: "",
      images: [],
      active: false,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (banner) => {
    setEditingBanner(banner);
    setTempBanner({ ...banner });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempBanner({ ...tempBanner, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setTempBanner({ ...tempBanner, [name]: checked });
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...(tempBanner.images || [])];

    if (index < updatedImages.length) {
      updatedImages[index] = {
        ...updatedImages[index],
        secure_url: value,
        public_id: `image_${Date.now()}_${index}`,
      };
    } else {
      updatedImages.push({
        secure_url: value,
        public_id: `image_${Date.now()}_${index}`,
      });
    }

    setTempBanner({ ...tempBanner, images: updatedImages });
  };

  const removeImage = (index) => {
    const updatedImages = [...(tempBanner.images || [])];
    updatedImages.splice(index, 1);
    setTempBanner({ ...tempBanner, images: updatedImages });
  };

  const addImageField = () => {
    if ((tempBanner.images || []).length >= 3) {
      alert("Maximum 3 images allowed per banner.");
      return;
    }

    const updatedImages = [
      ...(tempBanner.images || []),
      { public_id: "", secure_url: "" },
    ];
    setTempBanner({ ...tempBanner, images: updatedImages });
  };

  const handleSave = () => {
    if (
      !tempBanner.title ||
      !tempBanner.description ||
      !tempBanner.smallDescription
    ) {
      alert("Title, description and small description are required!");
      return;
    }

    if ((tempBanner.images || []).length === 0) {
      alert("At least one image is required!");
      return;
    }

    if (editingBanner) {
      // Update existing banner
      setBanners(
        banners.map((banner) =>
          banner.id === editingBanner.id ? { ...banner, ...tempBanner } : banner
        )
      );
    } else {
      // Add new banner
      const newBanner = {
        id: Date.now().toString(),
        title: tempBanner.title,
        description: tempBanner.description,
        smallDescription: tempBanner.smallDescription,
        images: tempBanner.images || [],
        active: tempBanner.active || false,
        createdAt: new Date().toISOString(),
      };
      setBanners([...banners, newBanner]);
    }

    closeModal();
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this banner?")) {
      setBanners(banners.filter((banner) => banner.id !== id));
    }
  };

  const toggleActive = (id) => {
    setBanners(
      banners.map((banner) =>
        banner.id === id ? { ...banner, active: !banner.active } : banner
      )
    );
  };

  return (
    <div className=" space-y-6 overflow-hidden p-6">
      <div className="page-header">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Banners</h1>
          <p className="text-sm text-gray-500">Manage your website banners</p>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={openAddModal}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Banner
        </button>
      </div>

      {/* Search */}
      <div className="mb-6 flex items-center justify-between">
        <div className="w-full max-w-xs">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="search-input"
              placeholder="Search banners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                onClick={() => setSearchTerm("")}
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Banners table */}
      {filteredBanners.length > 0 ? (
        <div className="card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Banner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Images
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredBanners.map((banner) => (
                  <tr key={banner.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        {banner.images.length > 0 && (
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-md object-cover"
                              src={banner.images[0].secure_url}
                              alt={banner.title}
                            />
                          </div>
                        )}
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {banner.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {banner.smallDescription}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 line-clamp-2">
                        {banner.description}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex -space-x-2">
                        {banner.images.map((image, idx) => (
                          <div
                            key={image.public_id}
                            className="relative h-8 w-8 rounded-md border border-white"
                          >
                            <img
                              src={image.secure_url}
                              alt={`Banner image ${idx + 1}`}
                              className="h-full w-full rounded-md object-cover"
                            />
                          </div>
                        ))}
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100 text-xs text-gray-500">
                          {banner.images.length}/3
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleActive(banner.id)}
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                          banner.active
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {banner.active ? (
                          <>
                            <Check className="mr-1 h-3 w-3" />
                            Active
                          </>
                        ) : (
                          "Inactive"
                        )}
                      </button>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          type="button"
                          className="text-blue-600 hover:text-blue-900"
                          onClick={() => openEditModal(banner)}
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          className="text-gray-600 hover:text-gray-900"
                          onClick={() => openEditModal(banner)}
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDelete(banner.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="card flex items-center justify-center p-12 text-center">
          <div>
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No banners found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Get started by adding a new banner"}
            </p>
            <div className="mt-6">
              <button
                type="button"
                className="btn btn-primary"
                onClick={openAddModal}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Banner
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal w-full max-w-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingBanner ? "Edit Banner" : "Add Banner"}
              </h2>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500"
                onClick={closeModal}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6">
              <div className="form-group">
                <label htmlFor="title" className="form-label">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="form-input"
                  value={tempBanner.title || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="smallDescription" className="form-label">
                  Small Description <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="smallDescription"
                  name="smallDescription"
                  className="form-input"
                  value={tempBanner.smallDescription || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description" className="form-label">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="form-textarea"
                  value={tempBanner.description || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">
                    Images <span className="text-red-500">*</span>
                    <span className="ml-1 text-xs text-gray-500">(Max 3)</span>
                  </label>
                  {(tempBanner.images || []).length < 3 && (
                    <button
                      type="button"
                      className="text-sm font-medium text-blue-600 hover:text-blue-800"
                      onClick={addImageField}
                    >
                      <Plus className="mr-1 inline-block h-4 w-4" />
                      Add Image
                    </button>
                  )}
                </div>
                {(tempBanner.images || []).map((image, index) => (
                  <div key={index} className="mb-3 flex items-start space-x-3">
                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      {image.secure_url ? (
                        <img
                          src={image.secure_url}
                          alt={`Preview ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
                          <ImageIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                    <input
                      type="text"
                      className="form-input flex-1"
                      value={image.secure_url}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      placeholder="Enter image URL"
                    />
                    <button
                      type="button"
                      className="rounded-md p-2 text-red-500 hover:bg-red-50"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                {(tempBanner.images || []).length === 0 && (
                  <button
                    type="button"
                    className="flex w-full items-center justify-center rounded-md border-2 border-dashed border-gray-300 px-4 py-4 text-sm font-medium text-gray-600 hover:border-gray-400 hover:bg-gray-50"
                    onClick={addImageField}
                  >
                    <Plus className="mr-2 h-5 w-5" />
                    Add Image
                  </button>
                )}
              </div>

              <div className="form-group">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="active"
                    name="active"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={tempBanner.active || false}
                    onChange={handleCheckboxChange}
                  />
                  <label
                    htmlFor="active"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Active
                  </label>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Active banners will be displayed on the website
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
              >
                <Save className="mr-2 h-4 w-4" />
                {editingBanner ? "Update" : "Add Banner"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerPage;
