import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ContinueWithGoogle, setToken } from "../Redux/Slice/authSlice";
import toast from "react-hot-toast";

const CheckLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (token) {
      dispatch(setToken(token));

      // 3. ✅ Continue login
      dispatch(ContinueWithGoogle()).then((res) => {
        const { success, message } = res?.payload || {};

        if (success) {
          toast.success(message || "Login successful");
          navigate("/"); // 4. ✅ Redirect to homepage
        } else {
          toast.error(message || "Login failed");
          navigate("/login");
        }
      });
    } else {
      toast.error("Token missing from URL");
      navigate("/login");
    }
  }, [dispatch, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-teal-100 px-4">
      <div className="text-center">
        <div className="animate-spin inline-block w-12 h-12 border-4 border-t-transparent border-blue-600 rounded-full mb-6"></div>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700">
          Verifying your login...
        </h2>
        <p className="text-gray-500 mt-2">
          We're preparing your travel dashboard. Please wait.
        </p>
      </div>
    </div>
  );
};

export default CheckLogin;
