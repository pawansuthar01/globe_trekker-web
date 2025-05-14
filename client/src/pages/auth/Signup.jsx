import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, UserPlus } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { basic_url } from "../../helper/axiosInstance";
import { useDispatch } from "react-redux";
import { CreateAccount } from "../../Redux/Slice/authSlice";
import { Helmet } from "react-helmet-async";
const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const { password, confirmPassword, acceptTerms } = formData;

    if (!acceptTerms) {
      setError("Please accept terms and conditions.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await dispatch(CreateAccount(formData));
      if (res?.payload?.success) {
        navigate("/");
      } else {
        setError(res?.payload?.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed");
    }
  };
  const handleGoogleLogin = () => {
    window.location.href = `${basic_url}/api/v3/auth/google`;
  };

  return (
    <>
      <Helmet>
        <title>Create Your Account - Trip Tales</title>
        <meta
          name="description"
          content="Sign up to Trip Tales and start discovering, saving, and sharing amazing travel destinations and stories."
        />
        <meta
          name="keywords"
          content="Trip Tales signup, create account, travel app registration, travel blog signup, join Trip Tales"
        />
        <meta name="author" content="Trip Tales Team" />

        {/* Open Graph */}
        <meta property="og:title" content="Create Your Account - Trip Tales" />
        <meta
          property="og:description"
          content="Join Trip Tales to explore and share unforgettable travel stories and destinations."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://triptales.com/signup" />
        <meta
          property="og:image"
          content="https://triptales.com/assets/signup-preview.png"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Create Your Account - Trip Tales" />
        <meta
          name="twitter:description"
          content="Sign up to explore top destinations, save favorites, and share your travel tales."
        />
        <meta
          name="twitter:image"
          content="https://triptales.com/assets/signup-preview.png"
        />
      </Helmet>
      <div className="min-h-screen pt-24 pb-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h1 className="text-2xl font-bold text-center mb-8">
                Create an Account
              </h1>
              <div>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full bg-white border border-neutral-300 hover:border-neutral-400 text-neutral-700 py-3 rounded-lg font-medium flex items-center justify-center gap-3 shadow-sm hover:shadow transition"
                  >
                    <img
                      src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                      alt="Google"
                      className="h-5 w-5"
                    />
                    Continue with Google
                  </button>
                </div>
                <div className="my-4 flex items-center justify-center">
                  <span className="text-neutral-500 text-sm">OR</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-neutral-700 mb-2"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 pl-11 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                      required
                    />
                    <User className="absolute left-3 top-3.5 h-5 w-5 text-neutral-400" />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-neutral-700 mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 pl-11 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                      required
                    />
                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-neutral-400" />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-neutral-700 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="w-full px-4 py-3 pl-11 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                      required
                    />
                    <Lock className="absolute left-3 top-3.5 h-5 w-5 text-neutral-400" />
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-neutral-700 mb-2"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 pl-11 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                      required
                    />
                    <Lock className="absolute left-3 top-3.5 h-5 w-5 text-neutral-400" />
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        acceptTerms: e.target.checked,
                      })
                    }
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded mt-1"
                  />
                  <label
                    htmlFor="acceptTerms"
                    className="ml-2 text-sm text-neutral-600"
                  >
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      className="text-primary-600 hover:text-primary-700"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="text-primary-600 hover:text-primary-700"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                {error && (
                  <span className="text-sm text-red-500 mt-1 block">
                    {error}
                  </span>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <UserPlus className="h-5 w-5" />
                  Create Account
                </button>
              </form>

              {/* Already have an account */}
              <div className="mt-6 text-center">
                <p className="text-neutral-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
