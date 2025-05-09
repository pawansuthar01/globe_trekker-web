import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import FormField from "../../../components/AdminComponent/form/FormField";

const initialFormData = {
  name: "",
  image: "",
  video: "",
  avatar: "",
  description: "",
  location: "",
  region: "",
  rating: 0,
  isPublished: true,
  date: new Date().toISOString().split("T")[0],
};

const HighlightForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      // In a real app, you would fetch the highlight data from an API
      // For now, we'll use mock data
      const mockHighlight = {
        _id: "1",
        name: "Beautiful Beaches of Bali",
        image:
          "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg",
        description:
          "Explore the pristine beaches with crystal clear waters and white sand.",
        location: "Bali",
        region: "Asia",
        rating: 4.8,
        isPublished: true,
        date: "2023-06-15",
      };

      setFormData(mockHighlight);
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const target = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: target.checked,
      }));
    } else if (type === "number") {
      setFormData((prev) => ({
        ...prev,
        [name]: parseFloat(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Highlight name is required";
    }

    if (!formData.image.trim()) {
      newErrors.image = "Image URL is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData.region.trim()) {
      newErrors.region = "Region is required";
    }

    if (formData.rating < 0 || formData.rating > 5) {
      newErrors.rating = "Rating must be between 0 and 5";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // In a real app, you would send the data to an API
    console.log("Submitting highlight data:", formData);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate("/admin/highlights");
    }, 1000);
  };

  return (
    <div className="space-y-6 overflow-hidden p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => navigate("/admin/highlights")}
            className="mr-4 p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900">
            {isEditMode ? "Edit Highlight" : "Create New Highlight"}
          </h1>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Save className="mr-2 h-5 w-5" />
          {loading ? "Saving..." : "Save Highlight"}
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              label="Highlight Name"
              id="name"
              error={errors.name}
              required
            >
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </FormField>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                label="Image URL"
                id="image"
                error={errors.image}
                required
              >
                <input
                  type="text"
                  name="image"
                  id="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </FormField>

              <FormField
                label="Video URL (optional)"
                id="video"
                error={errors.video}
              >
                <input
                  type="text"
                  name="video"
                  id="video"
                  value={formData.video}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </FormField>
            </div>

            <FormField
              label="Description"
              id="description"
              error={errors.description}
              required
            >
              <textarea
                name="description"
                id="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </FormField>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                label="Location"
                id="location"
                error={errors.location}
                required
              >
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </FormField>

              <FormField
                label="Region"
                id="region"
                error={errors.region}
                required
              >
                <select
                  name="region"
                  id="region"
                  value={formData.region}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="">Select a region</option>
                  <option value="Asia">Asia</option>
                  <option value="Europe">Europe</option>
                  <option value="North America">North America</option>
                  <option value="South America">South America</option>
                  <option value="Africa">Africa</option>
                  <option value="Oceania">Oceania</option>
                  <option value="Antarctica">Antarctica</option>
                </select>
              </FormField>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField label="Rating (0-5)" id="rating" error={errors.rating}>
                <input
                  type="number"
                  name="rating"
                  id="rating"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </FormField>

              <FormField label="Date" id="date" error={errors.date}>
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </FormField>
            </div>

            <div className="flex items-center">
              <input
                id="isPublished"
                name="isPublished"
                type="checkbox"
                checked={formData.isPublished}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="isPublished"
                className="ml-2 block text-sm text-gray-900"
              >
                Publish this highlight
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HighlightForm;
