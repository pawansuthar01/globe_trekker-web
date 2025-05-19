import React, { useEffect, useState } from "react";
import {
  Users,
  Image as ImageIcon,
  Mail,
  Clock,
  ArrowUpRight,
  FileText,
  Pencil,
  UserPlus,
  MessageCircle,
  Trash2,
  Star,
  BookOpen,
  MapPin,
  UserIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { formatTime } from "../../utils/DataFormat";
import {
  FetchActiveAdmin,
  FetchDashboardDetails,
} from "../../Redux/Slice/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [recentActivities, setRecentActivities] = useState([]);
  const [dashboardData, setDashboardData] = useState({});
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const fetchActivityData = async (page = 1) => {
    setLoading(true);

    const res = await dispatch(FetchActiveAdmin({ page, limit: 7 }));

    if (res?.payload?.success) {
      setTotalPage(res?.payload?.totalPages);
      setRecentActivities(res?.payload?.data);
      setTotalCount(res?.payload?.totalCount);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchActivityData(currentPage);
  }, [currentPage]);
  const fetchDashboardData = async (page = 1) => {
    setDashboardLoading(true);

    const res = await dispatch(FetchDashboardDetails());
    if (res?.payload?.success) {
      setDashboardData(res?.payload);
    }

    setDashboardLoading(false);
  };
  useEffect(() => {
    fetchDashboardData();
  }, []);
  const stats = [
    {
      id: 0,
      name: "Users",
      value: dashboardData?.userCount || 0,
      icon: <UserIcon className="h-5 w-5" />,
      link: "/admin/users",
      color: "bg-blue-500",
    },
    {
      id: 1,
      name: "Team Members",
      value: dashboardData?.teamMember?.length || 0,
      icon: <Users className="h-5 w-5" />,
      link: "/admin/about/team",
      color: "bg-blue-500",
    },
    {
      id: 2,
      name: "Active Banners",
      value: dashboardData?.activeBanner || 0, // updated to match backend response
      icon: <ImageIcon className="h-5 w-5" />,
      link: "/admin/banners",
      color: "bg-purple-500",
    },
    {
      id: 3,
      name: "Unread Contacts",
      value: dashboardData?.unReadMessage || 0,
      icon: <Mail className="h-5 w-5" />,
      link: "/admin/contacts",
      color: "bg-red-500",
    },
    {
      id: 4,
      name: "Last Updated",
      value: formatTime(dashboardData?.lastActivity || ""),
      icon: <Clock className="h-5 w-5" />,
      link: "/admin",
      color: "bg-green-500",
    },
    {
      id: 5,
      name: "Destinations",
      value: dashboardData?.destinationCount || 0,
      icon: <MapPin className="h-5 w-5" />,
      link: "/admin/destinations",
      color: "bg-yellow-500",
    },
    {
      id: 6,
      name: "Stories",
      value: dashboardData?.storiesCount || 0,
      icon: <BookOpen className="h-5 w-5" />,
      link: "/admin/stories",
      color: "bg-pink-500",
    },
    {
      id: 7,
      name: "Highlights",
      value: dashboardData?.highlightCount || 0,
      icon: <Star className="h-5 w-5" />,
      link: "/admin/highlights",
      color: "bg-indigo-500",
    },
  ];

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const getIcon = (type) => {
    switch (type) {
      case "update":
        return <Pencil className="w-3 h-3 text-blue-500" />;
      case "add":
        return <UserPlus className="w-3 h-3 text-green-500" />;
      case "reply":
        return <MessageCircle className="w-3 h-3 text-purple-500" />;
      case "Delete":
        return <Trash2 className="w-3 h-3 text-purple-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 overflow-hidden p-6">
      <div className="page-header">
        <h1 className="text-2xl font-bold text-gray-900 max-sm:text-xl">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Welcome back to your admin dashboard
        </p>
      </div>

      {/* Stats */}
      <div className="grid  max-sm:grid-cols-1 grid-cols-2  gap-5 justify-evenly">
        {dashboardLoading ? (
          <>
            {[...Array(stats?.length || 4)].map((_, i) => (
              <div
                key={i}
                className="card overflow-hidden animate-pulse"
                aria-busy="true"
                aria-label="Loading content"
              >
                <div className="flex items-center space-x-4 p-4">
                  <div className="h-12 w-12 rounded-lg bg-gray-300 " />
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-4 w-3/4 rounded bg-gray-300 " />
                    <div className="h-6 w-1/2 rounded bg-gray-300 " />
                  </div>
                  <div className="h-5 w-5 rounded bg-gray-300 " />
                </div>
              </div>
            ))}
          </>
        ) : (
          stats.map((stat) => (
            <Link
              key={stat.id}
              to={stat.link}
              className="group transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="card overflow-hidden">
                <div className="flex  items-center">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.color} text-white`}
                  >
                    {stat.icon}
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-500">
                      {stat.name}
                    </p>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {stat.value}
                    </h3>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-gray-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:translate-y-[-4px] group-hover:text-blue-500" />
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Recent activity */}
      <div className="card">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Activity
          </h2>

          <div className="flex justify-center items-center space-x-4 mt-6">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-4 py-2 text-sm font-medium rounded-md border transition 
      ${
        currentPage === 1
          ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
      }
    `}
            >
              ← Previous
            </button>

            <span className="text-sm text-gray-600">
              Page <strong>{currentPage}</strong> of{" "}
              <strong>{totalPages}</strong>
            </span>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 text-sm font-medium rounded-md border transition 
      ${
        currentPage === totalPages
          ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
      }
    `}
            >
              Next →
            </button>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <ul className="divide-y divide-gray-200">
            {loading
              ? new Array(3).fill(null).map((_, i) => {
                  return (
                    <li
                      key={i}
                      className="flex items-center justify-between bg-white px-6 py-4 animate-pulse"
                    >
                      <div>
                        <div className="h-4 w-40 mb-2 bg-gray-200 rounded"></div>
                        <div className="h-3 w-24 bg-gray-200 rounded"></div>
                      </div>
                      <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
                    </li>
                  );
                })
              : recentActivities.map((activity) => (
                  <li
                    key={activity._id}
                    className="flex items-center justify-between bg-white px-6 py-4 hover:bg-gray-50"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {activity.action}:{" "}
                        <span className="font-semibold">{activity.detail}</span>
                      </p>

                      <p className="text-xs flex gap-2 p-1 items-center text-gray-500">
                        {" "}
                        <span> {getIcon(activity.type)}</span>
                        {activity.type}
                        <span> {formatTime(activity.time)}</span>
                      </p>
                    </div>
                    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                      {activity.role}
                    </span>
                  </li>
                ))}
          </ul>
        </div>
        <p className=" bg-gray-100  p-5 text-xs font-medium text-gray-800">
          Total Activity :{" "}
          <span className="text-green-800  font-bold">{totalCount || 0}</span>
        </p>
      </div>

      {/* Quick actions */}
      <div className="card">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Link
            to="/admin/about/team"
            className="flex flex-col items-center rounded-lg border border-gray-200 p-4 text-center transition-colors hover:border-blue-500 hover:bg-blue-50"
          >
            <Users className="h-8 w-8 text-blue-500" />
            <span className="mt-2 text-sm font-medium">Add Team Member</span>
          </Link>
          <Link
            to="/admin/banners/new"
            className="flex flex-col items-center rounded-lg border border-gray-200 p-4 text-center transition-colors hover:border-purple-500 hover:bg-purple-50"
          >
            <ImageIcon className="h-8 w-8 text-purple-500" />
            <span className="mt-2 text-sm font-medium">Create Banner</span>
          </Link>
          <Link
            to="/admin/about"
            className="flex flex-col items-center rounded-lg border border-gray-200 p-4 text-center transition-colors hover:border-green-500 hover:bg-green-50"
          >
            <FileText className="h-8 w-8 text-green-500" />
            <span className="mt-2 text-sm font-medium">Edit About Page</span>
          </Link>
          <Link
            to="/admin/contacts"
            className="flex flex-col items-center rounded-lg border border-gray-200 p-4 text-center transition-colors hover:border-red-500 hover:bg-red-50"
          >
            <Mail className="h-8 w-8 text-red-500" />
            <span className="mt-2 text-sm font-medium">View Messages</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
