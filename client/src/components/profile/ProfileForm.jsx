import React, { useState, useEffect } from "react";
import { Camera, Loader2, Globe, Phone, Mail, Bell } from "lucide-react";
import toast from "react-hot-toast";

const ProfileForm = ({ user }) => {
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user.fullName | "",
    email: user.email | "",
    phoneNumber: user.phoneNumber || "",
    isSubscribed: user.isSubscribed | "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber || "",
      isSubscribed: user.isSubscribed,
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (!file.type.match(/image\/(jpeg|jpg|png|gif)/)) {
        setErrors((prev) => ({
          ...prev,
          avatar: "Please select a valid image file (JPEG, PNG, or GIF)",
        }));
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          avatar: "Image size should be less than 5MB",
        }));
        return;
      }

      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));

      if (errors.avatar) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.avatar;
          return newErrors;
        });
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName || formData.fullName.length < 5) {
      newErrors.fullName = "Full name must be at least 5 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (
      formData.phoneNumber &&
      !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(
        formData.phoneNumber
      )
    ) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (avatarFile) {
      updateUser({
        ...formData,
        avatar: {
          secure_url: avatarPreview || user?.avatar?.secure_url,
        },
      });
    } else {
      updateUser(formData);
    }

    toast.success("Travel profile updated successfully!");
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 mt-6 border border-emerald-100">
      <h3 className="text-xl font-semibold mb-6 text-emerald-900">
        Edit Travel Profile
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-emerald-900 mb-2">
            Profile Picture
          </label>
          <div className="flex items-center space-x-6">
            <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-emerald-50 border-2 border-emerald-100">
              <img
                src={
                  avatarPreview ||
                  user?.avatar?.secure_url ||
                  "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"
                }
                alt="Avatar preview"
                className="w-full h-full object-cover"
              />
              <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer group opacity-0 hover:opacity-100 transition-opacity duration-200">
                <Camera className="w-8 h-8 text-white" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>
            <div>
              <label className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg cursor-pointer hover:bg-emerald-100 transition-colors duration-200 inline-flex items-center gap-2">
                <Camera className="w-4 h-4" />
                Upload New Photo
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </label>
              {errors.avatar && (
                <p className="text-red-500 text-sm mt-1">{errors.avatar}</p>
              )}
              <p className="text-sm text-emerald-600 mt-1">
                JPG, PNG or GIF. Max size 5MB.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center text-sm font-medium text-emerald-900 mb-1">
              <Globe className="w-4 h-4 mr-1" />
              Full Name
            </label>
            <input
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-white/50 backdrop-blur-sm border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors duration-200 ${
                errors.fullName ? "border-red-500" : "border-emerald-200"
              }`}
              placeholder="Your full name"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-emerald-900 mb-1">
              <Mail className="w-4 h-4 mr-1" />
              Email Address
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-white/50 backdrop-blur-sm border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors duration-200 ${
                errors.email ? "border-red-500" : "border-emerald-200"
              }`}
              placeholder="Your email address"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-emerald-900 mb-1">
              <Phone className="w-4 h-4 mr-1" />
              Phone Number
            </label>
            <input
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-white/50 backdrop-blur-sm border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors duration-200 ${
                errors.phoneNumber ? "border-red-500" : "border-emerald-200"
              }`}
              placeholder="Your phone number"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
            )}
          </div>

          <div className="flex items-center h-full pt-6">
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  name="isSubscribed"
                  checked={formData.isSubscribed}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div
                  className={`block w-14 h-8 rounded-full transition-colors duration-200 ${
                    formData.isSubscribed ? "bg-emerald-500" : "bg-gray-300"
                  }`}
                ></div>
                <div
                  className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-200 transform ${
                    formData.isSubscribed ? "translate-x-6" : ""
                  }`}
                ></div>
              </div>
              <span className="ml-3 flex items-center text-sm font-medium text-emerald-900">
                <Bell className="w-4 h-4 mr-1" />
                Travel Notifications
              </span>
            </label>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button
            type="button"
            className="px-6 py-2 border border-emerald-200 rounded-lg text-emerald-700 bg-white hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200 disabled:bg-emerald-400 disabled:cursor-not-allowed flex items-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
                Updating...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
