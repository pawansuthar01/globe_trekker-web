import React from "react";
import { Calendar, Mail, Phone, MapPin, Compass } from "lucide-react";

const ProfileHeader = ({ user }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "ADMIN":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "AUTHOR":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-emerald-100">
      <div className="bg-[url('https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center h-48"></div>
      <div className="px-6 pb-6 relative">
        <div className="flex flex-col md:flex-row md:items-end -mt-16 mb-4">
          <div className="mx-auto md:mx-0 w-32 h-32 rounded-xl border-4 border-white overflow-hidden bg-white shadow-lg">
            <img
              src={
                user.avatar?.secure_url ||
                "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              }
              alt={`${user.fullName}'s avatar`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
            <h1 className="text-2xl font-bold text-emerald-900">
              {user.fullName}
            </h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
              <span
                className={`px-4 py-1 rounded-full text-sm font-medium border ${getRoleBadgeColor(
                  user.role
                )} flex items-center gap-1`}
              >
                <Compass className="w-4 h-4" />
                {user.role === "ADMIN"
                  ? "Travel Admin"
                  : user.role === "AUTHOR"
                  ? "Travel Guide"
                  : "Explorer"}
              </span>
              <span
                className={`px-4 py-1 rounded-full text-sm font-medium border ${
                  user.isSubscribed
                    ? "bg-teal-100 text-teal-800 border-teal-200"
                    : "bg-gray-100 text-gray-800 border-gray-200"
                }`}
              >
                {user.isSubscribed ? "🌟 Premium Traveler" : "Basic Traveler"}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center bg-white/50 backdrop-blur-sm rounded-lg p-3 border border-emerald-100">
            <Mail className="w-5 h-5 text-emerald-600 mr-3" />
            <span className="text-emerald-900 truncate">{user.email}</span>
          </div>
          <div className="flex items-center bg-white/50 backdrop-blur-sm rounded-lg p-3 border border-emerald-100">
            <Phone className="w-5 h-5 text-emerald-600 mr-3" />
            <span className="text-emerald-900">
              {user.phoneNumber || "Not provided"}
            </span>
          </div>
          <div className="flex items-center bg-white/50 backdrop-blur-sm rounded-lg p-3 border border-emerald-100">
            <Calendar className="w-5 h-5 text-emerald-600 mr-3" />
            <span className="text-emerald-900">
              Joined {formatDate(user.createdAt)}
            </span>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-100">
          <div className="flex items-start">
            <MapPin className="w-5 h-5 text-emerald-600 mt-1 mr-3" />
            <div>
              <h4 className="font-medium text-emerald-900">Travel Stats</h4>
              <p className="text-emerald-600 text-sm mt-1">
                Ready to start your journey! Set up your travel preferences to
                get personalized recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
