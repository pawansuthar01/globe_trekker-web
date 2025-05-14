import React, { useEffect, useState } from "react";
import { Loader2, Compass } from "lucide-react";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileForm from "../../components/profile/ProfileForm";
import AccountInfo from "../../components/profile/AcountInfo";
import { mockUser } from "../../utils/mokData";
import { useDispatch, useSelector } from "react-redux";
import { LoadAccount } from "../../Redux/Slice/authSlice";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const Profile = () => {
  const [user, setUser] = useState(mockUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const { isLoggedIn, role, data } = useSelector((state) => state?.auth);

  const fetchProfile = async () => {
    setLoading(true);
    await dispatch(LoadAccount());
    setLoading(false);
  };
  useEffect(() => {
    if (isLoggedIn) {
      fetchProfile();
    } else {
      navigate("/login");
    }
  }, [isLoggedIn]);
  if (isLoading || !isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
          <p className="mt-4 text-gray-600">Loading your journey details...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title> Profile - Trip Tales</title>
        <meta
          name="description"
          content="Manage your Trip Tales profile, view saved destinations, favorite stories, and customize your travel preferences."
        />
        <meta
          name="keywords"
          content="Trip Tales profile, user dashboard, travel favorites, saved destinations, travel account"
        />
        <meta name="author" content="Trip Tales Team" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Your Profile - Trip Tales" />
        <meta
          property="og:description"
          content="Access your Trip Tales profile to manage your travel experiences, saved places, and favorite stories."
        />
        <meta property="og:type" content="profile" />
        <meta
          property="og:url"
          content="https://triptales.pawansuthar.in/profile"
        />
        <meta
          property="og:image"
          content="https://triptales.pawansuthar.in/profile/Logo.jpeg"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Your Profile - Trip Tales" />
        <meta
          name="twitter:description"
          content="Customize your Trip Tales travel experience, view favorites, and update your profile."
        />
        <meta
          name="twitter:image"
          content="https://triptales.pawansuthar.in/profile/Logo.jpeg"
        />
      </Helmet>

      <div className=" flex  justify-center  sm:ml-5 p-2 ">
        <div className="md:w-[80%] w-full">
          <div className="relative mb-8 ">
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
          <ProfileHeader user={data} />
          <ProfileForm user={data} />
          <AccountInfo user={data} />
        </div>
      </div>
    </>
  );
};

export default Profile;
