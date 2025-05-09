import React from "react";
import { format } from "date-fns";

const RecentActivity = () => {
  // Mock data - would come from API in real app
  const activities = [
    {
      id: 1,
      action: "created",
      target: "new destination",
      user: "Admin User",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
    },
    {
      id: 2,
      action: "updated",
      target: "story post",
      user: "Content Writer",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    },
    {
      id: 3,
      action: "published",
      target: "highlight",
      user: "Editor",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    },
    {
      id: 4,
      action: "deleted",
      target: "user comment",
      user: "Moderator",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      id: 5,
      action: "responded to",
      target: "contact message",
      user: "Support Agent",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
  ];

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {activities.map((activity, index) => (
          <li key={activity.id}>
            <div className="relative pb-8">
              {index < activities.length - 1 ? (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                ></span>
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center ring-8 ring-white">
                    <svg
                      className="h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </div>
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-900">
                        {activity.user}
                      </span>{" "}
                      {activity.action}{" "}
                      <span className="font-medium text-gray-900">
                        {activity.target}
                      </span>
                    </p>
                  </div>
                  <div className="text-right text-sm whitespace-nowrap text-gray-500">
                    {format(activity.timestamp, "MMM d, h:mm a")}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;
