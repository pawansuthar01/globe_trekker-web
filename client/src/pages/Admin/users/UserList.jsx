import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Eye } from "lucide-react";
import SearchBar from "../../../components/AdminComponent/common/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, HandelPromotion } from "../../../Redux/Slice/authSlice";
import ConfirmModal from "../../../components/AdminComponent/common/confirmModal";
import toast from "react-hot-toast";

const UserList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { role, data } = useSelector((state) => state?.auth);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [roleUpdateLoading, setRoleUpdateLoading] = useState(null);
  const [isConfirm, SetIsConfirm] = useState(false);
  const [roleUpdate, setRoleUpdate] = useState({
    id: null,
    currentRole: null,
    newRole: null,
  });
  const [loading, setLoading] = useState(false);
  const [users, setUser] = useState([]);
  async function FetchUsers() {
    try {
      setLoading(true);
      const res = await dispatch(getAllUsers());
      if (res?.payload?.success) {
        setUser(res?.payload?.user || []);
      } else {
        console.error("Failed to fetch users", res);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    FetchUsers();
  }, []);
  const handleRoleChange = async () => {
    SetIsConfirm(false);
    if (roleUpdate.currentRole === roleUpdate.newRole) return;

    const adminCount = users.filter((u) => u.role === "ADMIN").length;
    const authorCount = users.filter((u) => u.role === "AUTHOR").length;

    if (roleUpdate.newRole === "ADMIN" && adminCount >= 5) {
      return toast.error("Max 5 admins allowed.");
    }
    if (roleUpdate.newRole === "AUTHOR" && authorCount >= 2) {
      return toast.error("Max 2 authors allowed.");
    }

    try {
      setRoleUpdateLoading(roleUpdate.id);
      const res = await dispatch(
        HandelPromotion({ id: roleUpdate.id, newRole: roleUpdate.newRole })
      );
      if (res?.payload?.success) {
        toast.success("Role updated successfully!");
        setUser((prev) =>
          prev.map((user) =>
            user._id === roleUpdate.id
              ? { ...user, role: res?.payload?.user.role }
              : user
          )
        );
      } else {
        toast.error(res?.payload?.message || "Failed to update role");
      }
    } catch (err) {
      console.error("Error updating role", err);
      toast.error("An error occurred.");
    } finally {
      setRoleUpdate({ id: null, currentRole: null, newRole: null });
      SetIsConfirm(false);
      setRoleUpdateLoading(null);
    }
  };

  // Filter users based on search term and role filter
  const filteredUsers =
    users &&
    users?.filter(
      (user) =>
        (user?.fullName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
          user?.email?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
          (user.address?.country &&
            user.address.country
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))) &&
        (roleFilter === "" || user.role === roleFilter)
    );
  const handleRoleUpdateClick = (id, currentRole, newRole) => {
    setRoleUpdate({
      id: id,
      currentRole: currentRole,
      newRole: newRole,
    });
    SetIsConfirm(true);
  };

  if (loading) return;

  return (
    <div className="space-y-6 overflow-x-hidden  p-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              placeholder="Search users by name, email or country..."
            />

            <div>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">All Roles</option>
                <option value="USER">User</option>
                <option value="AUTHOR">Author</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto ">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers?.map((user) => (
                  <tr key={user?._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {user?.avatar ? (
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={user?.avatar?.secure_url}
                              alt={user?.fullName}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                              {user?.fullName?.charAt(0)?.toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user?.fullName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user?.isSubscribed ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Subscribed
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                Not Subscribed
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user?.email}</div>
                      {user?.phoneNumber && (
                        <div className="text-sm text-gray-500">
                          {user?.phoneNumber}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user?.role === "ADMIN"
                            ? "bg-red-100 text-red-800"
                            : user?.role === "AUTHOR"
                            ? "bg-indigo-100 text-indigo-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user?.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user?.address ? (
                        <div>
                          <div className="text-sm text-gray-900">
                            {user?.address.country}
                          </div>
                          {user?.address?.city && (
                            <div className="text-sm text-gray-500">
                              {user?.address.city}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user?.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() =>
                          navigate(`/admin/users/${user?._id}`, {
                            state: { user },
                          })
                        }
                        className="text-indigo-600 hover:text-indigo-900 inline-flex items-center"
                      >
                        <Eye size={18} className="mr-1" />
                        View
                      </button>
                      {data._id != user._id && role === "AUTHOR" && (
                        <div className="flex gap-2 justify-end mt-2">
                          {user?.role !== "ADMIN" && (
                            <button
                              disabled={roleUpdateLoading === user?._id}
                              onClick={() =>
                                handleRoleUpdateClick(
                                  user?._id,
                                  user?.role,
                                  "ADMIN"
                                )
                              }
                              className={`px-3 py-1 text-xs rounded-md text-white ${
                                roleUpdateLoading === user?._id
                                  ? "bg-gray-400"
                                  : "bg-red-500 hover:bg-red-600"
                              }`}
                            >
                              {roleUpdateLoading === user?._id
                                ? "Updating..."
                                : "Make Admin"}
                            </button>
                          )}
                          {user?.role !== "AUTHOR" && (
                            <button
                              disabled={roleUpdateLoading === user?._id}
                              onClick={() =>
                                handleRoleUpdateClick(
                                  user?._id,
                                  user?.role,
                                  "AUTHOR"
                                )
                              }
                              className={`px-3 py-1 text-xs rounded-md text-white ${
                                roleUpdateLoading === user?._id
                                  ? "bg-gray-400"
                                  : "bg-indigo-500 hover:bg-indigo-600"
                              }`}
                            >
                              {roleUpdateLoading === user?._id
                                ? "Updating..."
                                : "Make Author"}
                            </button>
                          )}
                          {user?.role !== "USER" && (
                            <button
                              disabled={roleUpdateLoading === user?._id}
                              onClick={() =>
                                handleRoleUpdateClick(
                                  user?._id,
                                  user?.role,
                                  "USER"
                                )
                              }
                              className={`px-3 py-1 text-xs rounded-md text-white ${
                                roleUpdateLoading === user?._id
                                  ? "bg-gray-400"
                                  : "bg-green-500 hover:bg-green-600"
                              }`}
                            >
                              {roleUpdateLoading === user?._id
                                ? "Updating..."
                                : "Make User"}
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers && filteredUsers?.length === 0 && (
            <div className="text-center py-10">
              <p className="text-sm text-gray-500">
                No users found matching your search criteria.
              </p>
            </div>
          )}

          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">{filteredUsers?.length || 0}</span>{" "}
              of <span className="font-medium">{users?.length || 0}</span> users
            </div>
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={isConfirm}
        onConfirm={handleRoleChange}
        onClose={() => {
          setRoleUpdate({
            id: null,
            currentRole: null,
            newRole: null,
          }),
            SetIsConfirm(false);
        }}
        title={"Role Change"}
        message={`Change role from ${roleUpdate.currentRole} to ${roleUpdate.newRole}`}
      />
    </div>
  );
};

export default UserList;
