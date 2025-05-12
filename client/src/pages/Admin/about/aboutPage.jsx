import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Save, Plus, ChevronRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { fetchAbout, updateAbout } from "../../../Redux/Slice/aboutSlice";
import FileUpload from "../../../components/AdminComponent/common/FileUpload";
import { AboutPageSkeleton } from "../../../components/Skeleton/admin/about/about";

const AboutUpdatePage = () => {
  // Sample data
  const dispatch = useDispatch();
  const [originalAboutData, setOriginalAboutData] = useState();

  const [loading, setLoading] = useState(false);
  const [newIntroImage, setIntroImage] = useState();
  const [aboutData, setAboutData] = useState();

  const FetchAboutData = async () => {
    setLoading(true);
    const res = await dispatch(fetchAbout());
    if (res?.payload?.success) {
      setAboutData(res.payload.data);
      setOriginalAboutData(JSON.parse(JSON.stringify(res.payload.data))); // deep clone
    }
    setLoading(false);
  };
  useEffect(() => {
    FetchAboutData();
  }, []);
  const handleTitleChange = (e) => {
    setAboutData({
      ...aboutData,
      title: e.target.value,
    });
  };
  const handelIntroImageChange = (file) => {
    setIntroImage(file);
  };
  const handleIntroChange = (e) => {
    setAboutData({
      ...aboutData,
      intro: e.target.value,
    });
  };

  const handleMissionChange = (index, value) => {
    const updatedMission = [...aboutData.mission];
    updatedMission[index] = value;
    setAboutData({
      ...aboutData,
      mission: updatedMission,
    });
  };

  const addMissionItem = () => {
    setAboutData({
      ...aboutData,
      mission: [...aboutData.mission, ""],
    });
  };

  const removeMissionItem = (index) => {
    const updatedMission = [...aboutData.mission];
    updatedMission.splice(index, 1);
    setAboutData({
      ...aboutData,
      mission: updatedMission,
    });
  };

  const handleValueChange = (index, field, value) => {
    const updatedValues = [...aboutData.values];
    updatedValues[index] = {
      ...updatedValues[index],
      [field]: value,
    };
    setAboutData({
      ...aboutData,
      values: updatedValues,
    });
  };

  const addValue = () => {
    setAboutData({
      ...aboutData,
      values: [...aboutData.values, { icon: "", title: "", description: "" }],
    });
  };

  const removeValue = (index) => {
    const updatedValues = [...aboutData.values];
    updatedValues.splice(index, 1);
    setAboutData({
      ...aboutData,
      values: updatedValues,
    });
  };

  const handleJoinChange = (field) => {
    setAboutData({
      ...aboutData,
      join: {
        ...aboutData.join,
        [field]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.preventDefault();

    const formData = new FormData();

    // Compare and append changed fields
    if (aboutData.title !== originalAboutData.title) {
      formData.append("title", aboutData.title);
    }

    if (aboutData.intro !== originalAboutData.intro) {
      formData.append("intro", aboutData.intro);
    }

    if (newIntroImage) {
      formData.append("introImage", newIntroImage);
    }

    if (
      JSON.stringify(aboutData.mission) !==
      JSON.stringify(originalAboutData.mission)
    ) {
      formData.append("mission", JSON.stringify(aboutData.mission));
    }

    if (
      JSON.stringify(aboutData.values) !==
      JSON.stringify(originalAboutData.values)
    ) {
      formData.append("values", JSON.stringify(aboutData.values));
    }

    if (
      aboutData.join.title !== originalAboutData.join.title ||
      aboutData.join.description !== originalAboutData.join.description
    ) {
      formData.append("join", JSON.stringify(aboutData.join));
    }
    const res = await dispatch(updateAbout(formData));
    if (res?.payload?.success) {
      setAboutData(res.payload.data);
      setOriginalAboutData(JSON.parse(JSON.stringify(res.payload.data))); // deep clone
    }
  };
  if (loading) {
    return <AboutPageSkeleton />;
  }
  return (
    <div className=" overflow-hidden p-6">
      <div className="page-header">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">About Page</h1>
          <p className="text-sm text-gray-500">
            Manage your about page content
          </p>
        </div>
        <div className="flex space-x-3">
          <Link to="/admin/about/team" className="btn btn-secondary">
            Manage Team
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="card">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            General Information
          </h2>

          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Page Title
            </label>
            <input
              type="text"
              id="title"
              className="form-input"
              value={aboutData?.title || ""}
              onChange={handleTitleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="intro" className="form-label">
              Introduction
            </label>
            <textarea
              id="intro"
              rows={4}
              className="form-textarea"
              value={aboutData?.intro || ""}
              onChange={handleIntroChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="intro" className="form-label">
              Image
            </label>

            <FileUpload
              onChange={handelIntroImageChange}
              value={aboutData?.introImage || ""}
            />
          </div>
        </div>

        <div className="card">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Mission</h2>

          <div className="space-y-3">
            {!loading &&
              aboutData &&
              aboutData?.mission.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    className="form-input"
                    value={item || ""}
                    onChange={(e) => handleMissionChange(index, e.target.value)}
                  />
                  <button
                    type="button"
                    className="rounded-md p-2 text-red-500 hover:bg-red-50"
                    onClick={() => removeMissionItem(index)}
                  >
                    &times;
                  </button>
                </div>
              ))}

            <button
              type="button"
              className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
              onClick={addMissionItem}
            >
              <Plus className="mr-1 h-4 w-4" />
              Add Mission Item
            </button>
          </div>
        </div>

        <div className="card">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Core Values
          </h2>

          <div className="space-y-6">
            {!loading &&
              aboutData &&
              aboutData?.values.map((value, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-gray-200 p-4"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-md font-medium text-gray-900">
                      Value {index + 1}
                    </h3>
                    <button
                      type="button"
                      className="rounded-md p-1 text-red-500 hover:bg-red-50"
                      onClick={() => removeValue(index)}
                    >
                      &times;
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="form-group">
                      <label className="form-label">Icon</label>
                      <input
                        type="text"
                        className="form-input"
                        value={value.icon || ""}
                        onChange={(e) =>
                          handleValueChange(index, "icon", e.target.value)
                        }
                        placeholder="e.g., star, users"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Title</label>
                      <input
                        type="text"
                        className="form-input"
                        value={value?.title || ""}
                        onChange={(e) =>
                          handleValueChange(index, "title", e.target.value)
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Description</label>
                      <input
                        type="text"
                        className="form-input"
                        value={value.description || ""}
                        onChange={(e) =>
                          handleValueChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}

            <button
              type="button"
              className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
              onClick={addValue}
            >
              <Plus className="mr-1 h-4 w-4" />
              Add Core Value
            </button>
          </div>
        </div>

        <div className="card">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Join Section
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="form-group">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-input"
                value={aboutData?.join.title || ""}
                onChange={(e) => handleJoinChange("title", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="form-textarea"
                rows={3}
                value={aboutData?.join.description || ""}
                onChange={(e) =>
                  handleJoinChange("description", e.target.value)
                }
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUpdatePage;
