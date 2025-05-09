import React from "react";
import {
  Users,
  Image as ImageIcon,
  Mail,
  Clock,
  ArrowUpRight,
  FileText,
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const stats = [
    {
      id: 1,
      name: "Team Members",
      value: "12",
      icon: <Users className="h-5 w-5" />,
      link: "/admin/about/team",
      color: "bg-blue-500",
    },
    {
      id: 2,
      name: "Active Banners",
      value: "3",
      icon: <ImageIcon className="h-5 w-5" />,
      link: "/admin/banners",
      color: "bg-purple-500",
    },
    {
      id: 3,
      name: "Unread Contacts",
      value: "8",
      icon: <Mail className="h-5 w-5" />,
      link: "/admin/contacts",
      color: "bg-red-500",
    },
    {
      id: 4,
      name: "Last Updated",
      value: "2h ago",
      icon: <Clock className="h-5 w-5" />,
      link: "/admin/about",
      color: "bg-green-500",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "Updated banner",
      item: "Summer Sale",
      time: "10 minutes ago",
      user: "Admin",
    },
    {
      id: 2,
      action: "Added team member",
      item: "John Doe",
      time: "2 hours ago",
      user: "Admin",
    },
    {
      id: 3,
      action: "Responded to contact",
      item: "Inquiry about services",
      time: "3 hours ago",
      user: "Admin",
    },
    {
      id: 4,
      action: "Updated about page",
      item: "Mission statement",
      time: "1 day ago",
      user: "Admin",
    },
  ];

  return (
    <div className="space-y-6 overflow-hidden p-6">
      <div className="page-header">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Welcome back to your admin dashboard
        </p>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-5 justify-evenly">
        {stats.map((stat) => (
          <Link
            key={stat.id}
            to={stat.link}
            className="group transition-all duration-200 hover:scale-[1.02]"
          >
            <div className="card overflow-hidden">
              <div className="flex items-center">
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
        ))}
      </div>

      {/* Recent activity */}
      <div className="card">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Activity
          </h2>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
            View all
          </button>
        </div>
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <ul className="divide-y divide-gray-200">
            {recentActivities.map((activity) => (
              <li
                key={activity.id}
                className="flex items-center justify-between bg-white px-6 py-4 hover:bg-gray-50"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {activity.action}:{" "}
                    <span className="font-semibold">{activity.item}</span>
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                  {activity.user}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Quick actions */}
      <div className="card">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Link
            to="/about/team/new"
            className="flex flex-col items-center rounded-lg border border-gray-200 p-4 text-center transition-colors hover:border-blue-500 hover:bg-blue-50"
          >
            <Users className="h-8 w-8 text-blue-500" />
            <span className="mt-2 text-sm font-medium">Add Team Member</span>
          </Link>
          <Link
            to="/banners/new"
            className="flex flex-col items-center rounded-lg border border-gray-200 p-4 text-center transition-colors hover:border-purple-500 hover:bg-purple-50"
          >
            <ImageIcon className="h-8 w-8 text-purple-500" />
            <span className="mt-2 text-sm font-medium">Create Banner</span>
          </Link>
          <Link
            to="/about"
            className="flex flex-col items-center rounded-lg border border-gray-200 p-4 text-center transition-colors hover:border-green-500 hover:bg-green-50"
          >
            <FileText className="h-8 w-8 text-green-500" />
            <span className="mt-2 text-sm font-medium">Edit About Page</span>
          </Link>
          <Link
            to="/contacts"
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
