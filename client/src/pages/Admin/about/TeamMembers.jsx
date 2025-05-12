import React, { useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  ImagePlus,
  Save,
} from "lucide-react";
import { Link } from "react-router-dom";
import FileUpload from "../../../components/AdminComponent/common/FileUpload";
import { useDispatch } from "react-redux";
import { newAboutTeam, updateAboutTeam } from "../../../Redux/Slice/aboutSlice";

const TeamMembers = () => {
  // Sample data
  const [teamMembers, setTeamMembers] = useState([
    {
      id: "1",
      name: "John Doe",
      role: "CEO & Founder",
      description: "John has over 15 years of experience in the industry.",
      imageUrl:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "2",
      name: "Jane Smith",
      role: "Marketing Director",
      description:
        "Jane leads our marketing efforts with creativity and vision.",
      imageUrl:
        "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "3",
      name: "Mike Johnson",
      role: "Lead Developer",
      description:
        "Mike is a skilled developer with expertise in multiple programming languages.",
      imageUrl:
        "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ]);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const [tempMember, setTempMember] = useState({
    name: "",
    role: "",
    description: "",
    imageUrl: "",
  });

  const handleThumbnailChange = (file) => {
    setTempMember((prev) => ({
      ...prev,
      imageUrl: file,
    }));
  };

  // Filtered team members
  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAddModal = () => {
    setEditingMember(null);
    setTempMember({
      name: "",
      role: "",
      description: "",
      imageUrl: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (member) => {
    setEditingMember(member);
    setTempMember({ ...member });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempMember({ ...tempMember, [name]: value });
  };

  const handleSave = async () => {
    if (!tempMember.name || !tempMember.role) {
      alert("Name and role are required!");
      return;
    }
    console.log(tempMember);
    const formData = new FormData();
    if (tempMember.name) {
      formData.append("name", tempMember.name);
    }
    if (tempMember.name) {
      formData.append("description", tempMember.description);
    }
    if (tempMember.name) {
      formData.append("role", tempMember.role);
    }
    if (tempMember.imageUrl) {
      formData.append("image", tempMember.imageUrl);
    }
    if (editingMember) {
      // Update existing member
      const res = await dispatch(
        updateAboutTeam({ id: editingMember.id, formData })
      );
      console.log(res);
      return;
      setTeamMembers(
        teamMembers.map((member) =>
          member.id === editingMember.id ? { ...member, ...tempMember } : member
        )
      );
    } else {
      // Add new member
      const res = await dispatch(newAboutTeam(formData));
      console.log(res);
      return;
      const newMember = {
        id: Date.now().toString(),
        name: tempMember.name,
        role: tempMember.role,
        description: tempMember.description || "",
        imageUrl:
          tempMember.imageUrl ||
          "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Default image
      };
      setTeamMembers([...teamMembers, newMember]);
    }

    closeModal();
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this team member?")) {
      setTeamMembers(teamMembers.filter((member) => member.id !== id));
    }
  };

  return (
    <div className=" space-y-6 overflow-hidden  p-6">
      <div className="page-header ">
        <div>
          <div className="flex items-center">
            <Link
              to="/about"
              className="mr-2 text-gray-500 hover:text-gray-700"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Team Members</h1>
          </div>
          <p className="text-sm text-gray-500">Manage your team members</p>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={openAddModal}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Member
        </button>
      </div>

      {/* Search and filters */}
      <div className="mb-6 flex items-center justify-between">
        <div className="w-full max-w-xs">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="search-input"
              placeholder="Search members..."
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

      {/* Team members grid */}
      {filteredMembers.length > 0 ? (
        <div className="card-grid">
          {filteredMembers.map((member) => (
            <div key={member.id} className="card overflow-hidden">
              <div className="relative mb-4 h-48 w-full overflow-hidden rounded-lg bg-gray-100">
                {member.imageUrl ? (
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-gray-400">
                    <ImagePlus className="h-12 w-12" />
                  </div>
                )}
              </div>
              <h3 className="mb-1 text-lg font-semibold text-gray-900">
                {member.name}
              </h3>
              <p className="mb-2 text-sm font-medium text-blue-600">
                {member.role}
              </p>
              <p className="mb-4 text-sm text-gray-500 line-clamp-2">
                {member.description}
              </p>

              <div className="flex space-x-2">
                <button
                  type="button"
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => openEditModal(member)}
                >
                  <Edit className="mr-1 inline-block h-4 w-4" />
                  Edit
                </button>
                <button
                  type="button"
                  className="flex-1 rounded-md border border-red-300 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
                  onClick={() => handleDelete(member.id)}
                >
                  <Trash2 className="mr-1 inline-block h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card flex items-center justify-center p-12 text-center">
          <div>
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No team members found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Get started by adding a new team member"}
            </p>
            <div className="mt-6">
              <button
                type="button"
                className="btn btn-primary"
                onClick={openAddModal}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Team Member
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
                {editingMember ? "Edit Team Member" : "Add Team Member"}
              </h2>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500"
                onClick={closeModal}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <FileUpload
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  value={teamMembers.imageUrl}
                />
              </div>

              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  value={tempMember.name || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="role" className="form-label">
                  Role <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  className="form-input"
                  value={tempMember.role || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group sm:col-span-2">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="form-textarea"
                  value={tempMember.description || ""}
                  onChange={handleInputChange}
                />
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
                {editingMember ? "Update" : "Add Member"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamMembers;
