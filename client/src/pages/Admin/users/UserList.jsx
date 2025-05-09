import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Eye } from "lucide-react";
import SearchBar from "../../../components/AdminComponent/common/SearchBar";

const UserList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  // Mock data - would come from API in real app
  const mockUsers = [
    {
      _id: "1",
      fullName: "John Doe",
      email: "john.doe@example.com",
      phoneNumber: "+1234567890",
      avatar: {
        secure_url:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      },
      role: "USER",
      isSubscribed: true,
      gender: "Male",
      address: {
        country: "United States",
        state: "California",
        city: "San Francisco",
      },
      createdAt: "2023-01-15T10:30:00Z",
    },
    {
      _id: "2",
      fullName: "Jane Smith",
      email: "jane.smith@example.com",
      avatar: {
        secure_url:
          "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg",
      },
      role: "AUTHOR",
      isSubscribed: true,
      gender: "Female",
      address: {
        country: "United Kingdom",
        state: "England",
        city: "London",
      },
      createdAt: "2023-02-20T14:45:00Z",
    },
    {
      _id: "3",
      fullName: "Michael Wong",
      email: "michael.wong@example.com",
      phoneNumber: "+9876543210",
      avatar: {
        secure_url:
          "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      },
      role: "ADMIN",
      isSubscribed: false,
      gender: "Male",
      address: {
        country: "Canada",
        state: "Ontario",
        city: "Toronto",
      },
      createdAt: "2023-03-05T09:15:00Z",
    },
    {
      _id: "4",
      fullName: "Maria Rodriguez",
      email: "maria.rodriguez@example.com",
      role: "USER",
      isSubscribed: true,
      createdAt: "2023-04-10T16:20:00Z",
    },
  ];

  // Filter users based on search term and role filter
  const filteredUsers = mockUsers.filter(
    (user) =>
      (user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.address?.country &&
          user.address.country
            .toLowerCase()
            .includes(searchTerm.toLowerCase()))) &&
      (roleFilter === "" || user.role === roleFilter)
  );

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
                {filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {user.avatar ? (
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={user.avatar.secure_url}
                              alt={user.fullName}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                              {user.fullName.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.fullName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.isSubscribed ? (
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
                      <div className="text-sm text-gray-900">{user.email}</div>
                      {user.phoneNumber && (
                        <div className="text-sm text-gray-500">
                          {user.phoneNumber}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === "ADMIN"
                            ? "bg-red-100 text-red-800"
                            : user.role === "AUTHOR"
                            ? "bg-indigo-100 text-indigo-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.address ? (
                        <div>
                          <div className="text-sm text-gray-900">
                            {user.address.country}
                          </div>
                          {user.address.city && (
                            <div className="text-sm text-gray-500">
                              {user.address.city}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/admin/users/${user._id}`}
                        className="text-indigo-600 hover:text-indigo-900 inline-flex items-center"
                      >
                        <Eye size={18} className="mr-1" />
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-10">
              <p className="text-sm text-gray-500">
                No users found matching your search criteria.
              </p>
            </div>
          )}

          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">{filteredUsers.length}</span> of{" "}
              <span className="font-medium">{mockUsers.length}</span> users
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
