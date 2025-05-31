import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import { useDispatch } from "react-redux";
import { SendPasswordResatEmail } from "../../Redux/Slice/authSlice";

const EmailResetPasswordPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await dispatch(SendPasswordResatEmail(email));

    if (res?.payload?.success) {
      setIsSubmitted(true);
    } else {
      setError(res?.payload?.message);
      setIsSubmitted(true);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <Link
            to="/login"
            className="inline-flex items-center text-neutral-600 hover:text-neutral-900 mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to login
          </Link>

          <div className="bg-white rounded-lg shadow-md p-8">
            {isSubmitted ? (
              <div className="text-center">
                <div
                  className={`bg-green-50 ${
                    error
                      ? `bg-red-200 border-red-400`
                      : " text-green-800 border-green-400"
                  } p-4 rounded-lg mb-6 border-2`}
                >
                  <h2 className="text-lg font-semibold mb-2">
                    {error ? "Something want wrong" : "Check Your Email"}
                  </h2>
                  <p>
                    {error
                      ? error
                      : `We've sent password reset instructions to your email
                    address. Please check your inbox and follow the link to
                    reset your password.`}
                  </p>
                </div>
                <p className="text-neutral-600">
                  Didn't receive the email?{" "}
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Try again
                  </button>
                </p>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-center mb-4">
                  Reset Password
                </h1>
                <p className="text-neutral-600 text-center mb-8">
                  Enter your email address and we'll send you instructions to
                  reset your password.
                </p>

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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 pl-11 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                        required
                      />
                      <Mail className="absolute left-3 top-3.5 h-5 w-5 text-neutral-400" />
                    </div>
                  </div>

                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    {loading
                      ? "Please wait Sending Email..."
                      : "Send Reset Instructions"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailResetPasswordPage;
