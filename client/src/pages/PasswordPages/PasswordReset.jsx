import React, { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import PasswordForm from "../../components/password/passwordForm";
import {
  calculatePasswordStrength,
  validatePassword,
} from "../../utils/password";
import { useDispatch } from "react-redux";
import { UpdateNewPassword } from "../../Redux/Slice/authSlice";

const PasswordReset = () => {
  const dispatch = useDispatch();
  const token = new URLSearchParams(window.location.search).get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const passwordStrength = calculatePasswordStrength(password);
  const isPasswordValid = validatePassword(password);
  const doPasswordsMatch = password === confirmPassword;
  const canSubmit =
    isPasswordValid && doPasswordsMatch && confirmPassword.length > 0;
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate before submission
    const newErrors = {};

    if (!isPasswordValid) {
      newErrors.password =
        "Password must be at least 8 characters with letters, numbers, and symbols";
    }

    if (!doPasswordsMatch) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await dispatch(
        UpdateNewPassword({ resetToken: token, newPassword: password })
      );

      if (res?.payload?.success) {
        setIsSubmitting(false);
        setResetSuccess(true);
      } else {
        setErrors({
          message: res?.payload?.message,
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      setIsSubmitting(false);
      setErrors({
        server: "There was an error resetting your password. Please try again.",
      });
    }
  };

  useEffect(() => {
    if (token) {
    } else {
      setErrors({ message: "token is does not found" });
    }
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div
            className={`${
              errors.message ? "bg-red-600" : "bg-blue-600"
            } p-6 flex items-center justify-center`}
          >
            <div className="bg-white/10 p-3 rounded-full">
              <ShieldCheck className="h-8 w-8 text-white" />
            </div>
          </div>

          <div className="p-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">
                Reset Your Password
              </h1>
              <p className="text-gray-500 mt-2">
                Create a new password that is secure and easy to remember
              </p>
            </div>

            <PasswordForm
              password={password}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              setErrors={setErrors}
              errors={errors}
              isSubmitting={isSubmitting}
              setPassword={setPassword}
              resetSuccess={resetSuccess}
              handleSubmit={handleSubmit}
              canSubmit={canSubmit}
              passwordStrength={passwordStrength}
            />
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Need help?{" "}
            <a
              href="mailto:support@globetrekker.site"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
