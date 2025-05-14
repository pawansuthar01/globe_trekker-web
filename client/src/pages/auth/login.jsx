import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { ContinueWithGoogle, LoginAccount } from "../../Redux/Slice/authSlice";
import { basic_url } from "../../helper/axiosInstance";
import { Helmet } from "react-helmet-async";
const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (formData) {
      const res = await dispatch(LoginAccount(formData));
      if (res?.payload?.success) {
        navigate("/");
      } else {
        setError(res?.payload?.message);
      }
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${basic_url}/api/v3/auth/google`;
  };

  return (
    <>
      <Helmet>
        <title>Login - Trip Tales</title>
        <meta
          name="description"
          content="Login to your Trip Tales account to explore beautiful travel destinations, real stories, and helpful travel tips."
        />
        <meta
          name="keywords"
          content="Trip Tales login, travel login, explore destinations, travel stories, user account"
        />
        <meta name="author" content="Trip Tales Team" />

        {/* Open Graph */}
        <meta property="og:title" content="Login - Trip Tales" />
        <meta
          property="og:description"
          content="Access your Trip Tales account and dive into travel destinations, inspiring stories, and adventure tips."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://triptales.pawansuthar.in/login"
        />
        <meta
          property="og:image"
          content="https://triptales.pawansuthar.in/Logo.jpeg"
        />

        {/* Twitter */}
        <meta
          name="twitter:card"
          content="https://triptales.pawansuthar.in/Logo.jpeg"
        />
        <meta name="twitter:title" content="Login - Trip Tales" />
        <meta
          name="twitter:description"
          content="Securely login to Trip Tales and start planning your next journey."
        />
        <meta
          name="twitter:image"
          content="https://triptales.pawansuthar.in/Logo.jpeg"
        />
      </Helmet>

      <div className="min-h-screen pt-24 pb-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h1 className="text-2xl font-bold text-center mb-8">
                Welcome Back
              </h1>

              <form onSubmit={handleSubmit} className="space-y-6">
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
                      onChange={(e) => (
                        setFormData({ ...formData, email: e.target.value }),
                        setError(null)
                      )}
                      className="w-full px-4 py-3 pl-11 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                      required
                    />
                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-neutral-400" />
                  </div>
                </div>

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
                        setFormData(
                          { ...formData, password: e.target.value },
                          setError(null)
                        )
                      }
                      className="w-full px-4 py-3 pl-11 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                      required
                    />
                    <Lock className="absolute left-3 top-3.5 h-5 w-5 text-neutral-400" />
                  </div>
                </div>

                {error && (
                  <span className="text-sm    capitalize text-red-500 mt-1 block">
                    {error}
                  </span>
                )}
                <div className="flex relative  items-center justify-between">
                  <Link
                    to="/reset-password"
                    className="text-sm absolute right-0  text-primary-600 hover:text-primary-700"
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <LogIn className="h-5 w-5" />
                  Sign In
                </button>
              </form>

              <div className="my-4 flex items-center justify-center">
                <span className="text-neutral-500 text-sm">OR</span>
              </div>

              <button
                onClick={handleGoogleLogin}
                className="w-full border border-neutral-300 bg-white text-neutral-700 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 hover:bg-neutral-100"
              >
                <FcGoogle className="h-5 w-5" />
                Continue with Google
              </button>

              <div className="mt-6 text-center">
                <p className="text-neutral-600">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Sign up
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

export default LoginPage;
