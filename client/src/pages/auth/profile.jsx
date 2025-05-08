import React, { useState } from "react";
import { Loader2, Compass } from "lucide-react";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileForm from "../../components/profile/ProfileForm";
import AccountInfo from "../../components/profile/AcountInfo";
import { mockUser } from "../../utils/mokData";

const Profile = () => {
  const [user, setUser] = useState(mockUser);
  const [isLoading, setLoading] = useState(false);
  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        {isLoading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
            <p className="mt-4 text-gray-600">
              Loading your journey details...
            </p>
          </div>
        ) : (
          <div className="text-center">
            <Compass className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
            <p className="text-gray-600">
              Please log in to view your travel profile.
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto sm:ml-5 p-2 ">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-lg"></div>
        <div className="relative p-6">
          <h1 className="text-3xl font-bold text-emerald-800 mb-2">
            Welcome, Fellow Traveler!
          </h1>
          <p className="text-emerald-600">
            Manage your travel preferences and account details below.
          </p>
        </div>
      </div>
      <ProfileHeader user={user} />
      <ProfileForm user={user} />
      <AccountInfo user={user} />
    </div>
  );
};

export default Profile;
