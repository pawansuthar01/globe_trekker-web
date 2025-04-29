import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Lock, UserPlus } from "lucide-react";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement signup logic here
    console.log("Signup attempt:", formData);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-2xl font-bold text-center mb-8">
              Create an Account
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
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

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={(e) =>
                    setFormData({ ...formData, acceptTerms: e.target.checked })
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

              <button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <UserPlus className="h-5 w-5" />
                Create Account
              </button>
            </form>

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
  );
};

export default SignupPage;
