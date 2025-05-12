import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ContinueWithGoogle, setCookieCall } from "../Redux/Slice/authSlice";
import toast from "react-hot-toast";
import { useState } from "react";

const CheckLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    async function setCookie() {
      const ContinueWithGoogleRes = await dispatch(ContinueWithGoogle());
      toast(ContinueWithGoogle?.payload?.message);
      if (ContinueWithGoogleRes?.payload?.success) {
        const res = await dispatch(setCookieCall(token));
        toast(res?.payload?.message);

        if (res?.payload?.success) {
          navigate("/");
        }
      }
    }
    setCookie();
  }, []);
  useEffect(() => {
    // const verifyGoogleLogin = async () => {
    //   // try {
    //   console.log(token);
    //   // if (!token) return;
    //   //
    //   //   if (res.payload.success) {
    //   //     // toast.success("Welcome back, traveler!");
    //   //     // navigate("/");
    //   //   } else {
    //   //     throw new Error("Login failed");
    //   //   }
    //   // } catch (error) {
    //   //   toast.error("Login failed. Please login again.");
    //   //   navigate("/login");
    //   // }
    // };
    // verifyGoogleLogin();
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
