import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import FormField from "../../../components/AdminComponent/form/FormField";
import FileUpload from "../../../components/AdminComponent/common/FileUpload";
import {
  createDestination,
  updateDestination,
} from "../../../Redux/Slice/detinationSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const emptyDestination = {
  name: "",
  category: "",
  bestTimeToVisit: "",
  description: "",
  longDescription: "",
  featured: false,
  isPublished: false,
  SuggestedDuration: "",
  tags: [],
  popularFor: [],
  travelTips: [],
  itinerary: [
    {
      day: "",
      title: "",
      activities: [""],
    },
  ],
  weatherInfo: {
    avgTemp: "",
    climateType: "",
    bestMonth: "",
  },
  location: {
    country: "",
    region: "",
    coordinates: {
      latitude: "",
      longitude: "",
    },
  },
  images: [],
  thumbnail: null,
};
const DestinationForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { destination } = useLocation()?.state || [];
  const [formData, setFormData] = useState();
  const [loadingData, setLoadingData] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [newTip, setNewTip] = useState("");
  const [newPopularFor, setNewPopularFor] = useState("");
  const [removedImages, setRemovedImages] = useState([]);
  const isEditMode = id != null;
  useEffect(() => {
    if (isEditMode) {
      setFormData(destination);
      setLoadingData(false);
    } else {
      setFormData(emptyDestination);
      setLoadingData(false);
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

  const handleThumbnailChange = (file) => {
    setFormData((prev) => ({
      ...prev,
      thumbnail: file,
    }));
  };

  const handleImagesChange = (file) => {
    if (file) {
      const newFiles = Array.isArray(file) ? file : [file];
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newFiles],
      }));
    }
  };

  const handleCoordinateChange = (e) => {
    const { name, value } = e.target;
    const coordName = name.split(".")[2]; // location.coordinates.latitude

    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        coordinates: {
          ...prev.location.coordinates,
          [coordName]: parseFloat(value) || 0,
        },
      },
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

  const addPopularFor = () => {
    if (
      newPopularFor.trim() &&
      !formData.popularFor.includes(newPopularFor.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        popularFor: [...prev.popularFor, newPopularFor.trim()],
      }));
      setNewPopularFor("");
    }
  };

  const removePopularFor = (item) => {
    setFormData((prev) => ({
      ...prev,
      popularFor: prev.popularFor.filter((i) => i !== item),
    }));
  };

  const addTravelTip = () => {
    if (newTip.trim() && !formData.travelTips.includes(newTip.trim())) {
      setFormData((prev) => ({
        ...prev,
        travelTips: [...prev.travelTips, newTip.trim()],
      }));
      setNewTip("");
    }
  };

  const removeTravelTip = (tip) => {
    setFormData((prev) => ({
      ...prev,
      travelTips: prev.travelTips.filter((t) => t !== tip),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Destination name is required";
    }

    if (!formData.thumbnail && !formData.thumbnailPreview) {
      newErrors.thumbnail = "Thumbnail is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.location.country.trim()) {
      newErrors["location.country"] = "Country is required";
    }

    if (!formData.location.region.trim()) {
      newErrors["location.region"] = "Region is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    const form = new FormData();

    // Append basic fields
    form.append("name", formData.name);
    form.append("category", formData.category);
    form.append("bestTimeToVisit", formData.bestTimeToVisit);
    form.append("description", formData.description);
    form.append("longDescription", formData.longDescription);
    form.append("featured", formData.featured);
    form.append("isPublished", formData.isPublished);

    // Append location
    form.append("country", formData.location.country);
    form.append("region", formData.location.region);
    form.append("latitude", formData.location.coordinates.latitude);
    form.append("longitude", formData.location.coordinates.longitude);
    form.append("SuggestedDuration", formData.SuggestedDuration);
    form.append("avgTemp", formData.weatherInfo?.avgTemp);
    form.append("climateType", formData.weatherInfo?.climateType);
    form.append("bestMonth", formData.weatherInfo?.bestMonth);

    // Append itinerary as JSON string (or break into multiple fields as needed)
    form.append("itinerary", JSON.stringify(formData.itinerary || []));
    // Append arrays
    formData.tags.forEach((tag) => form.append("tags[]", tag));
    formData.popularFor.forEach((item) => form.append("popularFor[]", item));
    formData.travelTips.forEach((tip) => form.append("travelTips[]", tip));

    // Thumbnail (check if it's a File or URL object)
    if (formData.thumbnail && formData.thumbnail instanceof File) {
      form.append("thumbnail", formData.thumbnail);
    }

    // Images (only newly added files)
    formData.images.forEach((img) => {
      if (img instanceof File) {
        form.append("image", img);
      }
    });
    removedImages.forEach((img) =>
      form.append("removedImages", img.secure_url)
    );

    try {
      // Now dispatch the action with ID and formData
      const res = await dispatch(
        isEditMode
          ? updateDestination({ id, formData: form })
          : createDestination(form)
      );
      console.log(res);
      if (res?.payload?.success) {
        toast.success(res?.payload?.message);
        setFormData(res?.payload?.data);
      } else {
        toast.error(res?.payload?.message);
      }
      // navigate("/admin/destinations");
    } catch (error) {
      console.error("Error updating destination:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (index) => {
    const imageToRemove = formData.images[index];

    // Track removed URLs if they're not File instances (i.e., existing URLs)
    if (!(imageToRemove instanceof File)) {
      setRemovedImages((prev) => [...prev, imageToRemove]);
    }

    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };
  // Handle change for day or title
  const handleDayChange = (index, field, value) => {
    const updatedItinerary = [...formData.itinerary];
    updatedItinerary[index][field] = value;
    setFormData({ ...formData, itinerary: updatedItinerary });
  };

  // Handle change for specific activity
  const handleActivityChange = (dayIndex, activityIndex, value) => {
    const updatedItinerary = [...formData.itinerary];
    updatedItinerary[dayIndex].activities[activityIndex] = value;
    setFormData({ ...formData, itinerary: updatedItinerary });
  };

  // Add a new activity to an existing day
  const addActivityToDay = (dayIndex) => {
    const updatedItinerary = [...formData.itinerary];
    updatedItinerary[dayIndex].activities.push("");
    setFormData({ ...formData, itinerary: updatedItinerary });
  };

  // Add a new day
  const addNewDay = () => {
    const newDay = {
      day: "",
      title: "",
      activities: [""],
    };
    setFormData({
      ...formData,
      itinerary: [...formData.itinerary, newDay],
    });
  };

  if (loadingData) return;
  return (
    <div className="space-y-6  overflow-hidden p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => navigate("/admin/destinations")}
            className="mr-4 p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl max-sm:text-sm font-semibold text-gray-900">
            {isEditMode ? "Edit Destination" : "Create New Destination"}
          </h1>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="inline-flex  items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Save className="mr-2 h-5 w-5 max-sm:w-4 max-sm:mr-0" />
          {loading ? "Saving..." : "Save Destination"}
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              label="Destination Name"
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
                className="shadow-sm focus:ring-indigo-500 p-1 border focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </FormField>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField label="Category" id="category" error={errors.category}>
                <select
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 border  p-1 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="">Select a category</option>
                  <option value="Beach">Beach</option>
                  <option value="Mountain">Mountain</option>
                  <option value="City">City</option>
                  <option value="Rural">Rural</option>
                  <option value="Desert">Desert</option>
                  <option value="Forest">Forest</option>
                </select>
              </FormField>

              <FormField
                label="Best Time to Visit"
                id="bestTimeToVisit"
                error={errors.bestTimeToVisit}
              >
                <input
                  type="text"
                  name="bestTimeToVisit"
                  id="bestTimeToVisit"
                  value={formData.bestTimeToVisit}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 border p-1 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </FormField>
            </div>
            <FormField
              label="Thumbnail"
              id="thumbnail"
              error={errors.thumbnail}
              required
            >
              <FileUpload
                accept="image/*"
                onChange={handleThumbnailChange}
                value={formData.thumbnail?.url}
              />
            </FormField>
            <FormField
              label="Additional Images"
              id="images"
              error={errors.images}
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {formData?.images?.map((image, index) => (
                  <div key={index} className="relative">
                    <FileUpload
                      onChange={handleImagesChange}
                      alt={`Preview ${index + 1}`}
                      value={image.secure_url}
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 right-1 bg-red-500 text-white p-1 rounded-full"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </FormField>
            <FileUpload onChange={handleImagesChange} />
            <FormField
              label="Short Description"
              id="description"
              error={errors?.description}
              required
            >
              <textarea
                name="description"
                id="description"
                rows={3}
                value={formData?.description}
                onChange={handleChange}
                className="shadow-sm focus:ring-indigo-500 border p-1 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </FormField>
            <FormField
              label="Long Description"
              id="longDescription"
              error={errors?.longDescription}
            >
              <textarea
                name="longDescription"
                id="longDescription"
                rows={5}
                value={formData?.longDescription}
                onChange={handleChange}
                className="shadow-sm focus:ring-indigo-500 border p-1  focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </FormField>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                label="Country"
                id="location.country"
                error={errors["location.country"]}
                required
              >
                <input
                  type="text"
                  name="location.country"
                  id="location.country"
                  value={formData?.location?.country}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 border p-1  focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </FormField>

              <FormField
                label="Region"
                id="location.region"
                error={errors["location.region"]}
                required
              >
                <input
                  type="text"
                  name="location.region"
                  id="location.region"
                  value={formData?.location?.region}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 border p-1 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </FormField>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                label="Latitude"
                id="location.coordinates.latitude"
                error={errors["location.coordinates.latitude"]}
              >
                <input
                  type="number"
                  name="location.coordinates.latitude"
                  id="location.coordinates.latitude"
                  value={formData?.location?.coordinates?.latitude}
                  onChange={handleCoordinateChange}
                  step="0.0001"
                  className="shadow-sm focus:ring-indigo-500 border p-1 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </FormField>

              <FormField
                label="Longitude"
                id="location.coordinates.longitude"
                error={errors["location.coordinates.longitude"]}
              >
                <input
                  type="number"
                  name="location.coordinates.longitude"
                  id="location.coordinates.longitude"
                  value={formData?.location?.coordinates?.longitude}
                  onChange={handleCoordinateChange}
                  step="0.0001"
                  className="shadow-sm focus:ring-indigo-500 border p-1 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </FormField>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <FormField label="Tags" id="tags" error={errors.tags}>
                  <div className="flex">
                    <input
                      type="text"
                      id="newTag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="shadow-sm focus:ring-indigo-500 border p-1 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-l-md"
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
                      Add
                    </button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData?.tags?.map((tag) => (
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
                          <span className="sr-only">Remove {tag}</span>
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                </FormField>
              </div>

              <div>
                <FormField
                  label="Popular For"
                  id="popularFor"
                  error={errors.popularFor}
                >
                  <div className="flex">
                    <input
                      type="text"
                      id="newPopularFor"
                      value={newPopularFor}
                      onChange={(e) => setNewPopularFor(e.target.value)}
                      className="shadow-sm focus:ring-indigo-500 border p-1 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-l-md"
                      placeholder="Add a popular feature"
                      onKeyDown={(e) =>
                        e.key === "Enter" &&
                        (e.preventDefault(), addPopularFor())
                      }
                    />
                    <button
                      type="button"
                      onClick={addPopularFor}
                      className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100"
                    >
                      Add
                    </button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData?.popularFor?.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800"
                      >
                        {item}
                        <button
                          type="button"
                          onClick={() => removePopularFor(item)}
                          className="ml-1.5 inline-flex  items-center justify-center h-4 w-4 rounded-full text-amber-400 hover:bg-amber-200 hover:text-amber-500 focus:outline-none"
                        >
                          <span className="sr-only">Remove {item}</span>
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                </FormField>
              </div>
            </div>
            <div>
              <FormField
                label="Travel Tips"
                id="travelTips"
                error={errors?.travelTips}
              >
                <div className="flex">
                  <input
                    type="text"
                    id="newTip"
                    value={newTip}
                    onChange={(e) => setNewTip(e.target.value)}
                    className="shadow-sm focus:ring-indigo-500 border p-1 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-l-md"
                    placeholder="Add a travel tip"
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTravelTip())
                    }
                  />
                  <button
                    type="button"
                    onClick={addTravelTip}
                    className="inline-flex  items-center px-3 py-2 border border-l-0 border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100"
                  >
                    Add
                  </button>
                </div>

                <div className="mt-2">
                  <ul className="divide-y divide-gray-200">
                    {formData?.travelTips?.map((tip, index) => (
                      <li
                        key={index}
                        className="py-2 flex justify-between items-center"
                      >
                        <span className="text-sm text-gray-900">{tip}</span>
                        <button
                          type="button"
                          onClick={() => removeTravelTip(tip)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </FormField>
            </div>{" "}
            <div>
              <FormField
                label="Suggested Duration"
                id="SuggestedDuration"
                error={errors["SuggestedDuration"]}
                required
              >
                <input
                  type="text"
                  name="SuggestedDuration"
                  id="SuggestedDuration"
                  value={formData?.SuggestedDuration}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 border p-1 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </FormField>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex items-center">
                <input
                  id="featured"
                  name="featured"
                  type="checkbox"
                  checked={formData?.featured}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      featured: e.target.checked,
                    }))
                  }
                  className="h-4 w-4 border text-indigo-600 p-1 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="featured"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Feature this destination
                </label>
              </div>

              <FormField label="Average Temperature">
                <input
                  type="text"
                  name="weatherInfo.avgTemp"
                  value={formData.weatherInfo?.avgTemp || ""}
                  onChange={handleChange}
                  className="shadow-sm  focus:ring-indigo-500 border  focus:border-indigo-500 block w-full sm:text-sm p-1 border-indigo-300 rounded-md"
                />
              </FormField>
              <FormField label="Climate Type">
                {" "}
                <input
                  type="text"
                  name="weatherInfo.climateType"
                  className="shadow-sm  focus:ring-indigo-500 border focus:border-indigo-500 block w-full sm:text-sm p-1 border-indigo-300 rounded-md"
                  value={formData.weatherInfo?.climateType || ""}
                  onChange={handleChange}
                />
              </FormField>
              <FormField label="Best Month">
                <input
                  type="text"
                  name="weatherInfo.bestMonth"
                  className="shadow-sm  focus:ring-indigo-500 border focus:border-indigo-500 block w-full sm:text-sm p-1 border-indigo-300 rounded-md"
                  value={formData.weatherInfo?.bestMonth || ""}
                  onChange={handleChange}
                />
              </FormField>
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Itinerary
                </label>
                {formData.itinerary.map((dayItem, dayIndex) => (
                  <div
                    key={dayIndex}
                    className="mb-4 border p-4 rounded shadow-sm"
                  >
                    {/* Day Number Input */}
                    <input
                      type="text"
                      value={dayItem.day}
                      onChange={(e) =>
                        handleDayChange(dayIndex, "day", e.target.value)
                      }
                      className="mb-2 w-full border p-2 rounded"
                      placeholder={`Day ${dayIndex + 1} Number`}
                    />

                    {/* Title Input */}
                    <input
                      type="text"
                      value={dayItem.title}
                      onChange={(e) =>
                        handleDayChange(dayIndex, "title", e.target.value)
                      }
                      className="mb-2 w-full border p-2 rounded"
                      placeholder="Day Title"
                    />

                    {/* Activities */}
                    {dayItem.activities.map((activity, activityIndex) => (
                      <input
                        key={activityIndex}
                        type="text"
                        value={activity}
                        onChange={(e) =>
                          handleActivityChange(
                            dayIndex,
                            activityIndex,
                            e.target.value
                          )
                        }
                        className="mb-2 w-full border p-2 rounded"
                        placeholder={`Activity ${activityIndex + 1}`}
                      />
                    ))}

                    <button
                      type="button"
                      onClick={() => addActivityToDay(dayIndex)}
                      className="text-sm text-blue-500"
                    >
                      + Add Activity
                    </button>
                  </div>
                ))}

                {/* Button to Add New Day */}
                <button
                  type="button"
                  onClick={addNewDay}
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
                >
                  + Add New Day
                </button>
              </div>
              <div className="flex items-center">
                <input
                  id="isPublished"
                  name="isPublished"
                  type="checkbox"
                  checked={formData?.isPublished}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isPublished: e.target.checked,
                    }))
                  }
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="isPublished"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Publish this destination
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DestinationForm;
