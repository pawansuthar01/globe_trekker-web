import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import FormField from "../../../components/AdminComponent/form/FormField";
import FileUpload from "../../../components/AdminComponent/common/FileUpload";

const initialFormData = {
  title: "",
  excerpt: "",
  content: "",
  category: "",
  tags: [],
  featured: false,
  author: {
    name: "",
    avatar: null,
    bio: "",
  },
  coverImage: null,
  images: [],
  imagesPreviews: [],
  readTime: "",
};

const StoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { story } = useLocation()?.state || [];
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [newTag, setNewTag] = useState("");

  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      setFormData({
        ...initialFormData,
        ...story,

        coverImage: null,
        images: [],
      });
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else if (type === "checkbox") {
      const target = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: target.checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCoverImageChange = (file) => {
    setFormData((prev) => ({
      ...prev,
      coverImage: file,
    }));
  };

  const handleAuthorAvatarChange = (file) => {
    setFormData((prev) => ({
      ...prev,
      author: {
        ...prev.author,
        avatar: file,
      },
    }));
  };

  const handleImagesChange = (file) => {
    if (file) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, file],
      }));

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          imagesPreviews: [...prev.imagesPreviews, reader.result],
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      imagesPreviews: prev.imagesPreviews.filter((_, i) => i !== index),
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Story title is required";
    }

    if (!formData.excerpt.trim()) {
      newErrors.excerpt = "Excerpt is required";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (!formData.coverImage && !formData.coverImagePreview) {
      newErrors.coverImage = "Cover image is required";
    }

    if (!formData.author.name.trim()) {
      newErrors["author.name"] = "Author name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Upload cover image if new file is selected
      let coverImageUrl = formData.coverImagePreview;
      if (formData.coverImage) {
        coverImageUrl = await uploadFile(
          formData.coverImage,
          "stories",
          `covers/${formData.title}-${Date.now()}`
        );
      }

      // Upload author avatar if new file is selected
      let avatarUrl = formData.author.avatarPreview;
      if (formData.author.avatar) {
        avatarUrl = await uploadFile(
          formData.author.avatar,
          "authors",
          `avatars/${formData.author.name}-${Date.now()}`
        );
      }

      // Upload additional images
      const uploadedImages = await Promise.all(
        formData.images.map((file, index) =>
          uploadFile(
            file,
            "stories",
            `images/${formData.title}-${Date.now()}-${index}`
          )
        )
      );

      // Prepare data for API
      const storyData = {
        ...formData,
        coverImage: {
          url: coverImageUrl,
          alt: formData.title,
        },
        author: {
          ...formData.author,
          avatar: avatarUrl,
        },
        images: uploadedImages.map((url) => ({
          url,
          caption: "",
        })),
      };

      // In a real app, you would send the data to an API
      console.log("Submitting story data:", storyData);

      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        navigate("/admin/stories");
      }, 1000);
    } catch (error) {
      console.error("Error uploading files:", error);
      setLoading(false);
      // Handle error appropriately
    }
  };

  return (
    <div className="space-y-6 overflow-hidden p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => navigate("/admin/stories")}
            className="mr-4 p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900">
            {isEditMode ? "Edit Story" : "Create New Story"}
          </h1>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Save className="mr-2 h-5 w-5" />
          {loading ? "Saving..." : "Save Story"}
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              label="Story Title"
              id="title"
              error={errors.title}
              required
            >
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </FormField>

            <FormField
              label="Cover Image"
              id="coverImage"
              error={errors.coverImage}
              required
            >
              <FileUpload
                accept="image/*"
                onChange={handleCoverImageChange}
                value={formData.coverImagePreview}
              />
            </FormField>

            <FormField
              label="Additional Images"
              id="images"
              error={errors.images}
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {formData.imagesPreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="h-40 w-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <FileUpload
                  accept="image/*"
                  onChange={handleImagesChange}
                  value={null}
                  className="h-40"
                />
              </div>
            </FormField>

            <FormField
              label="Short Excerpt"
              id="excerpt"
              error={errors.excerpt}
              required
            >
              <textarea
                name="excerpt"
                id="excerpt"
                rows={2}
                value={formData.excerpt}
                onChange={handleChange}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </FormField>

            <FormField
              label="Content"
              id="content"
              error={errors.content}
              required
            >
              <textarea
                name="content"
                id="content"
                rows={8}
                value={formData.content}
                onChange={handleChange}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </FormField>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                label="Category"
                id="category"
                error={errors.category}
                required
              >
                <select
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="">Select a category</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Food">Food</option>
                  <option value="Culture">Culture</option>
                  <option value="Road Trip">Road Trip</option>
                  <option value="Backpacking">Backpacking</option>
                  <option value="Luxury">Luxury</option>
                </select>
              </FormField>

              <FormField
                label="Estimated Read Time"
                id="readTime"
                error={errors.readTime}
              >
                <input
                  type="text"
                  name="readTime"
                  id="readTime"
                  value={formData.readTime}
                  onChange={handleChange}
                  placeholder="e.g., 5 min"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </FormField>
            </div>

            <FormField label="Tags" id="tags" error={errors.tags}>
              <div className="flex">
                <input
                  type="text"
                  id="newTag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-l-md"
                  placeholder="Add a tag"
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addTag())
                  }
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </FormField>

            <div className="flex items-center">
              <input
                id="featured"
                name="featured"
                type="checkbox"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    featured: e.target.checked,
                  }))
                }
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="featured"
                className="ml-2 block text-sm text-gray-900"
              >
                Feature this story
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StoryForm;
