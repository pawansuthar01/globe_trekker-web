import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  Check,
  X,
} from "lucide-react";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useLocation()?.state || [];
  useEffect(() => {
    setUserData(user);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="text-center py-10 ">
        <p className="text-lg text-gray-700">User not found</p>
        <button
          onClick={() => navigate("/admin/users")}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
        >
          Back to Users
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 overflow-x-hidden ">
      <div className="flex items-center">
        <button
          onClick={() => navigate("/admin/users")}
          className="mr-4 p-2 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-semibold text-gray-900">User Profile</h1>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 bg-indigo-50">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-16 w-16">
                {
                  <img
                    className="h-16 w-16 rounded-full object-cover border-2 border-white"
                    src={userData?.avatar?.secure_url}
                    alt={userData.fullName}
                  />
                }
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {userData.fullName}
                </h2>
                <div className="flex items-center mt-1">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      userData.role === "ADMIN"
                        ? "bg-red-100 text-red-800"
                        : userData.role === "AUTHOR"
                        ? "bg-indigo-100 text-indigo-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {userData.role}
                  </span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span
                    className={`inline-flex items-center text-xs ${
                      userData.isSubscribed ? "text-green-600" : "text-gray-600"
                    }`}
                  >
                    {userData.isSubscribed ? (
                      <>
                        <Check size={14} className="mr-1" />
                        Subscribed
                      </>
                    ) : (
                      <>
                        <X size={14} className="mr-1" />
                        Not Subscribed
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-2">
              <a
                href={`mailto:${userData.email}`}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
              >
                <Mail size={16} className="mr-1" />
                Email
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Contact Information
              </h3>
              <dl className="space-y-3">
                <div className="flex items-start">
                  <dt className="flex-shrink-0 flex items-center text-gray-500 w-8 mt-0.5">
                    <Mail size={16} />
                  </dt>
                  <dd className="ml-2 text-gray-900">{userData.email}</dd>
                </div>

                {userData.phoneNumber && (
                  <div className="flex items-start">
                    <dt className="flex-shrink-0 flex items-center text-gray-500 w-8 mt-0.5">
                      <Phone size={16} />
                    </dt>
                    <dd className="ml-2 text-gray-900">
                      {userData.phoneNumber}
                    </dd>
                  </div>
                )}

                {userData.address && (
                  <div className="flex items-start">
                    <dt className="flex-shrink-0 flex items-center text-gray-500 w-8 mt-0.5">
                      <MapPin size={16} />
                    </dt>
                    <dd className="ml-2 text-gray-900">
                      {[
                        userData.address.city,
                        userData.address.state,
                        userData.address.country,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </dd>
                  </div>
                )}

                <div className="flex items-start">
                  <dt className="flex-shrink-0 flex items-center text-gray-500 w-8 mt-0.5">
                    <Calendar size={16} />
                  </dt>
                  <dd className="ml-2 text-gray-900">
                    Joined on{" "}
                    {new Date(userData.createdAt).toLocaleDateString()}
                  </dd>
                </div>

                {userData.gender && (
                  <div className="flex items-start">
                    <dt className="flex-shrink-0 flex items-center text-gray-500 w-8 mt-0.5">
                      <User size={16} />
                    </dt>
                    <dd className="ml-2 text-gray-900">{userData.gender}</dd>
                  </div>
                )}

                {userData.dob && (
                  <div className="flex items-start">
                    <dt className="flex-shrink-0 flex items-center text-gray-500 w-8 mt-0.5">
                      <Calendar size={16} />
                    </dt>
                    <dd className="ml-2 text-gray-900">
                      Birth Date: {new Date(userData.dob).toLocaleDateString()}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {userData.travelAchievements &&
              userData.travelAchievements.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Travel Achievements
                  </h3>
                  <ul className="space-y-4">
                    {userData.travelAchievements.map((achievement) => (
                      <li
                        key={achievement.key}
                        className="bg-gray-50 p-3 rounded-lg"
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100 text-2xl">
                            {achievement.icon || "🌍"}
                          </div>
                          <div className="ml-3">
                            <h4 className="text-sm font-medium text-gray-900">
                              {achievement.title}
                            </h4>
                            {achievement.description && (
                              <p className="text-sm text-gray-500">
                                {achievement.description}
                              </p>
                            )}
                            <p className="text-xs text-gray-400 mt-1">
                              Achieved on{" "}
                              {new Date(
                                achievement.achievedAt
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
