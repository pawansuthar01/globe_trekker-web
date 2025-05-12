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
import { useDispatch } from "react-redux";
import {
  activateBanner,
  deleteBanner,
  fetchBanners,
  newBanner,
  updateBanner,
} from "../../../Redux/Slice/bannerSlice";
import { useEffect } from "react";
import FileUpload from "../../../components/AdminComponent/common/FileUpload";
import toast from "react-hot-toast";

const BannerPage = () => {
  // Sample data
  const [banners, setBanners] = useState([]);
  const dispatch = useDispatch();
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
  const FetchBanners = async () => {
    const res = await dispatch(fetchBanners());
    console.log(res);
    if (res?.payload?.success) {
      setBanners(res?.payload?.data);
    }
  };
  useEffect(() => {
    FetchBanners();
  }, []);
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
  const handleImageChange = (index, file) => {
    const updatedImages = [...(tempBanner.images || [])];

    // Replace or add the file at the given index
    updatedImages[index] = {
      file, // Store the file temporarily
      secure_url: URL.createObjectURL(file), // Preview purpose
      public_id:
        updatedImages[index]?.public_id || `image_${Date.now()}_${index}`,
    };

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

  const handleSave = async () => {
    if (
      !tempBanner.title ||
      !tempBanner.description ||
      !tempBanner.smallDescription
    ) {
      alert("Title, description, and small description are required!");
      return;
    }

    if ((tempBanner.images || []).length === 0) {
      alert("At least one image is required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", tempBanner.title);
    formData.append("description", tempBanner.description);
    formData.append("smallDescription", tempBanner.smallDescription);
    formData.append("active", tempBanner.active);

    // Append only new or changed images (File objects)
    tempBanner.images.forEach((img, index) => {
      if (img.file) {
        formData.append(`image`, img.file); // send all images as a list
        formData.append(`index`, index); // to help backend know where to replace
      } else {
        formData.append(`existingImages`, JSON.stringify(img)); // to retain old ones
      }
    });

    const res = await (editingBanner
      ? dispatch(updateBanner({ id: editingBanner._id, formData }))
      : dispatch(newBanner(formData)));
    if (res.payload.success) {
      FetchBanners();
      closeModal();
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this banner?")) {
      const res = await dispatch(deleteBanner(id));
      if (res?.payload?.success) {
        setBanners(banners.filter((banner) => banner._id !== id));
        toast.success(res?.payload?.message);
      } else {
        toast.error(res?.payload?.message);
      }
    }
  };

  const toggleActive = async (id) => {
    const res = await dispatch(activateBanner(id));
    if (res?.payload?.success) {
      setBanners(
        banners.map((banner) =>
          banner._id === id
            ? { ...banner, active: true }
            : { ...banner, active: false }
        )
      );
      toast.success(res?.payload?.message);
    } else {
      toast.error(res?.payload?.message);
    }
  };

  return (
    <div className=" space-y-6  p-6">
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
                  <tr key={banner._id} className="hover:bg-gray-50">
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
                        onClick={() => toggleActive(banner._id)}
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
                          onClick={() => handleDelete(banner._id)}
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
          <div className="modal w-full max-w-2xl  ">
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

            <div className="mt-6 grid grid-cols-1 gap-6 my-2 max-sm:h-96 overflow-x-scroll">
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
                <div className="flex justify-evenly flex-wrap gap-6">
                  {(tempBanner.images || []).map((image, index) => (
                    <div key={index} className="flex w-36">
                      <FileUpload
                        value={image?.secure_url}
                        index={index}
                        onBannerChange={handleImageChange}
                      />
                    </div>
                  ))}
                </div>
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
