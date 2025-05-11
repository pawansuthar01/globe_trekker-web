import React from "react";
import {
  Clock,
  Shield,
  Globe,
  MapPin,
  Compass,
  Award,
  Sailboat,
  UserCircle,
} from "lucide-react";
import formatDate from "../../utils/DataFormat";
import { data } from "react-router-dom";

const AccountInfo = ({ user }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 mt-6 border border-emerald-100">
      <h3 className="text-xl font-semibold mb-6 text-emerald-900 flex items-center">
        <Globe className="w-6 h-6 mr-2 text-emerald-600" />
        Travel Account Information
      </h3>

      <div className="space-y-6">
        <div className="flex items-start">
          <Shield className="w-5 h-5 text-emerald-600 mt-1 mr-3" />
          <div>
            <h4 className="font-medium text-emerald-900">Traveler Status</h4>
            <p className="text-emerald-700">
              {user.role === "ADMIN"
                ? "Travel Admin"
                : user.role === "AUTHOR"
                ? "Travel Guide"
                : "Explorer"}
            </p>
            <p className="text-sm text-emerald-600 mt-1">
              {user.role === "ADMIN"
                ? "Full access to manage travel experiences and guide other travelers."
                : user.role === "AUTHOR"
                ? "Create and share travel guides and recommendations."
                : "Explore destinations and plan your next adventure."}
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <Clock className="w-5 h-5 text-emerald-600 mt-1 mr-3" />
          <div>
            <h4 className="font-medium text-emerald-900">
              Travel Journey Timeline
            </h4>
            <div className="mt-2 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-emerald-700">Journey Started</span>
                <span className="text-emerald-900 font-medium">
                  {formatDate(user.createdAt)}
                </span>
              </div>
              <div className="w-full bg-emerald-100 h-1 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-1 rounded-full"
                  style={{ width: "100%" }}
                ></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-emerald-700">Last Adventure</span>
                <span className="text-emerald-900 font-medium">
                  {formatDate(user.updatedAt)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start">
          <Award className="w-5 h-5 text-emerald-600 mt-1 mr-3" />
          <div>
            <h4 className="font-medium text-emerald-900">
              Travel Achievements
            </h4>
            {data.travelAchievements && data.travelAchievements.length > 0 ? (
              <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4">
                {data.travelAchievements.map((t) => (
                  <div
                    key={t._id}
                    className="bg-emerald-50 p-3 rounded-lg border border-emerald-100"
                  >
                    <div className="flex items-center justify-center w-10 h-10 bg-emerald-100 rounded-full mb-2 mx-auto">
                      {t.title}
                    </div>
                    <div className="flex items-center justify-center w-10 h-10 bg-emerald-100 rounded-full mb-2 mx-auto">
                      {t.icon}
                    </div>
                    <p className="text-center text-sm font-medium text-emerald-900">
                      {t.description}
                    </p>
                    <p className="text-center text-sm font-medium text-emerald-900">
                      {formatDate(t.achievedAt)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-2 flex justify-center items-center  w-full">
                <div className=" p-3  rounded-lg border ">
                  <div className="flex items-center justify-center w-10 h-10 bg-emerald-100 rounded-full mb-2 mx-auto">
                    <UserCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <p className="text-center text-sm font-medium text-emerald-900">
                    No travelAchievements
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-emerald-100">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium text-emerald-900">
                Travel Account ID
              </h4>
              <p className="text-emerald-600 font-mono text-sm">{user._id}</p>
            </div>
            {/* <button className="text-emerald-600 hover:text-emerald-800 text-sm font-medium transition-colors duration-200 flex items-center">
              <Compass className="w-4 h-4 mr-1" />
              View Travel History
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
