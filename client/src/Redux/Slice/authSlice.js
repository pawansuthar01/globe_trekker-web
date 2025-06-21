import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance";
const getValidToken = () => {
  const token = localStorage.getItem("Authenticator");
  return token && token !== "undefined" ? token : null;
};
const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  role: localStorage.getItem("role") || "",
  exp: Number(localStorage.getItem("exp")) || 0,
  userName: localStorage.getItem("userName") || "",
  Authenticator: getValidToken(),
  data: localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : {},
  favoriteDestinations: localStorage.getItem("favoriteDestinations")
    ? JSON.parse(localStorage.getItem("favoriteDestinations"))
    : [],
  favoriteStories: localStorage.getItem("favoriteStories")
    ? JSON.parse(localStorage.getItem("favoriteStories"))
    : [],
};

const User_basic_url = `/api/v3/auth`;
export const ContinueWithGoogle = createAsyncThunk("/auth/google", async () => {
  try {
    const res = await axiosInstance.get(`${User_basic_url}/me`);
    return res.data;
  } catch (error) {
    return error?.response?.data || error?.message || "Something went wrong";
  }
});
export const OtpSend = createAsyncThunk("/auth/otp", async (email) => {
  try {
    console.log(email);
    const res = await axiosInstance.post(
      `${User_basic_url}/otp${email}`,
      email
    );
    return res.data;
  } catch (error) {
    return error?.response?.data || error?.message || "Something went wrong";
  }
});
export const CreateAccount = createAsyncThunk(
  "/auth/register",
  async (data) => {
    try {
      const res = await axiosInstance.post(`${User_basic_url}/register`, data);
      return res.data;
    } catch (error) {
      return error?.response?.data || error?.message || "Something went wrong";
    }
  }
);
export const LoginAccount = createAsyncThunk("/auth/login", async (data) => {
  try {
    const res = await axiosInstance.post(`${User_basic_url}/login`, data);

    return res.data;
  } catch (error) {
    return error?.response?.data || error?.message || "Something went wrong";
  }
});

export const UpdateAccount = createAsyncThunk("/auth/update", async (data) => {
  try {
    const res = await axiosInstance.put(
      `${User_basic_url}/UpdateProfile`,
      data
    );

    return res.data;
  } catch (error) {
    return error?.response?.data || error?.message || "Something went wrong";
  }
});

export const LoadAccount = createAsyncThunk("/auth/getProfile", async () => {
  try {
    const res = await axiosInstance.get("/api/v3/auth/getProfile");

    return res.data;
  } catch (error) {
    return error?.response?.data || error?.message || "Something went wrong";
  }
});
export const SendPasswordResatEmail = createAsyncThunk(
  "/auth/passwordResat",
  async (email) => {
    try {
      const res = await axiosInstance.post(
        `${User_basic_url}/reset-Password${email}`
      );

      return res.data;
    } catch (error) {
      return error?.response?.data || error?.message || "Something went wrong";
    }
  }
);
export const changePassword = createAsyncThunk(
  "/auth/passwordResat",
  async ({ oldPassword, newPassword }) => {
    if (!(oldPassword, newPassword)) return;
    try {
      const res = await axiosInstance.put(`${User_basic_url}/updatePassword`, {
        oldPassword,
        newPassword,
      });

      return res.data;
    } catch (error) {
      return error?.response?.data || error?.message || "Something went wrong";
    }
  }
);
export const UpdateNewPassword = createAsyncThunk(
  "/auth/passwordResat",
  async ({ resetToken, newPassword }) => {
    try {
      const res = await axiosInstance.post(
        `${User_basic_url}/change-password${resetToken}`,
        { newPassword }
      );

      return res.data;
    } catch (error) {
      return error?.response?.data || error?.message || "Something went wrong";
    }
  }
);
export const getAllUsers = createAsyncThunk("/auth/User", async () => {
  try {
    const res = await axiosInstance.get("/api/v5/Admin/users");

    return res.data;
  } catch (error) {
    return error?.response?.data || error?.message || "Something went wrong";
  }
});
export const setCookieCall = createAsyncThunk("/auth/cookie", async (token) => {
  try {
    const res = await axiosInstance.post(`/api/v3/auth/set-cookie/${token}`);

    return res.data;
  } catch (error) {
    return error?.response?.data || error?.message || "Something went wrong";
  }
});
export const HandelDelete = createAsyncThunk("delete/", async (data) => {
  try {
    const token = localStorage.getItem("Authenticator");
    const res = await axiosInstance.delete("/api/v3/Admin/User", {
      data: data,
      headers: {
        Authorization: `${token}`,
      },
    });

    return res.data;
  } catch (error) {
    return error?.response?.data || error?.message || "Something went wrong";
  }
});
export const HandelSubscribe = createAsyncThunk(
  "subscribe/put",
  async (email) => {
    try {
      const res = await axiosInstance.put(
        `/api/v3/auth/subscribe-email${email}`
      );

      return res.data;
    } catch (error) {
      return error?.response?.data || error?.message || "Something went wrong";
    }
  }
);
export const HandelPromotion = createAsyncThunk(
  "user/roleUpdate",
  async ({ id, newRole }) => {
    try {
      const res = await axiosInstance.put(
        `/api/v5/admin/user-role?id=${id}&UpdateRole=${newRole}`
      );

      return res.data;
    } catch (error) {
      return error?.response?.data || error?.message || "Something went wrong";
    }
  }
);
// ✅ 2. get  data (Admin)
export const FetchActiveAdmin = createAsyncThunk(
  "activity/get",
  async ({ page = 1, limit = 10 }) => {
    try {
      const res = await axiosInstance.get(
        `/api/v5/admin?page=${page}limit=${limit}`
      );
      return res.data;
    } catch (err) {
      return err.response?.data || err.message;
    }
  }
);

// ✅ 2. get data (Admin)
export const FetchDashboardDetails = createAsyncThunk(
  "activity/get",
  async () => {
    try {
      const res = await axiosInstance.get(`/api/v5/admin/dashboard`);
      return res.data;
    } catch (err) {
      return err.response?.data || err.message;
    }
  }
);
export const FavoriteListAddDestination = createAsyncThunk(
  "Favorite/post",
  async (id) => {
    try {
      const res = await axiosInstance.post(`api/v3/destination/favorite/${id}`);
      return res.data;
    } catch (err) {
      return err.response?.data || err.message;
    }
  }
);
export const FavoriteListRemoveDestination = createAsyncThunk(
  "Favorite/destination/Delete",
  async (id) => {
    try {
      const res = await axiosInstance.delete(
        `api/v3/destination/favorite/${id}`
      );
      return res.data;
    } catch (err) {
      return err.response?.data || err.message;
    }
  }
);
export const FavoriteListAddStory = createAsyncThunk(
  "Favorite/story/post",
  async (id) => {
    try {
      const res = await axiosInstance.post(`story/favorite/${id}`);

      return res.data;
    } catch (err) {
      return err.response?.data || err.message;
    }
  }
);
export const FavoriteRemoveStory = createAsyncThunk(
  "Favorite/Delete",
  async (id) => {
    try {
      const res = await axiosInstance.delete(`story/favorite/${id}`);
      return res.data;
    } catch (err) {
      return err.response?.data || err.message;
    }
  }
);

const authSliceRedux = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.Authenticator = action.payload;

      localStorage.setItem("Authenticator", action.payload);
    },
    logout: (state) => {
      localStorage.setItem("data", null);
      localStorage.setItem("isLoggedIn", false);
      localStorage.setItem("exp", 0);
      localStorage.setItem("role", "");
      localStorage.setItem("userName", "");
      localStorage.setItem("favoriteStories", []);
      localStorage.setItem("favoriteDestinations", []);
      state.favoriteDestinations = [];

      state.favoriteStories = [];
      state.userName = "";

      state.exp = 0;
      localStorage.removeItem("Authenticator");
      state.Authenticator = null;
      state.isLoggedIn = false;
      state.data = "";
      state.role = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CreateAccount.fulfilled, (state, action) => {
        if (action.payload.success) {
          const { user } = action.payload;
          localStorage.setItem("data", JSON.stringify(action?.payload?.user));
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("exp", Number(action?.payload?.exp));
          localStorage.setItem("role", action?.payload?.user.role);
          localStorage.setItem("userName", action?.payload?.user.userName);
          localStorage.setItem(
            "Authenticator",
            action?.payload?.AuthenticatorToken
          );
          state.Authenticator = action?.payload?.AuthenticatorToken;
          state.userName = action?.payload?.user.userName;
          localStorage.setItem(
            "favoriteStories",
            JSON.stringify(user.favoriteStories)
          );
          localStorage.setItem(
            "favoriteDestinations",
            JSON.stringify(user.favoriteDestinations)
          );
          state.favoriteDestinations = user.favoriteDestinations;
          state.favoriteStories = user.favoriteStories;
          state.exp = Number(action?.payload?.exp);
          state.isLoggedIn = true;
          state.data = action?.payload?.user;
          state.role = action?.payload?.user.role;
        }
      })
      .addCase(UpdateAccount.fulfilled, (state, action) => {
        if (action.payload.success) {
          const { user } = action.payload;
          localStorage.setItem("data", JSON.stringify(action?.payload?.user));
          localStorage.setItem("role", action?.payload?.user.role);
          localStorage.setItem("userName", action?.payload?.user.userName);
          localStorage.setItem(
            "Authenticator",
            action?.payload?.AuthenticatorToken
          );
          localStorage.setItem(
            "favoriteStories",
            JSON.stringify(user.favoriteStories)
          );
          localStorage.setItem(
            "favoriteDestinations",
            JSON.stringify(user.favoriteDestinations)
          );
          state.favoriteDestinations = user.favoriteDestinations;
          state.favoriteStories = user.favoriteStories;
          state.Authenticator = action?.payload?.AuthenticatorToken;
          state.userName = action?.payload?.user.userName;

          state.role = state.data = action?.payload?.user;
          state.role = action?.payload?.user.role;
        }
      })
      .addCase(ContinueWithGoogle.fulfilled, (state, action) => {
        if (action.payload.success) {
          localStorage.setItem("data", JSON.stringify(action?.payload?.user));
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("exp", Number(action?.payload?.exp));
          localStorage.setItem(
            "favoriteStories",
            JSON.stringify(action?.payload?.user.favoriteStories)
          );
          localStorage.setItem(
            "favoriteDestinations",
            JSON.stringify(action?.payload?.user?.favoriteDestinations)
          );
          localStorage.setItem("role", action?.payload?.user.role);
          localStorage.setItem("userName", action?.payload?.user.userName);
          localStorage.setItem(
            "Authenticator",
            action?.payload?.AuthenticatorToken
          );
          state.Authenticator = action?.payload?.AuthenticatorToken;
          state.userName = action?.payload?.user.userName;
          state.favoriteDestinations =
            action?.payload?.user?.favoriteDestinations;
          state.favoriteStories = action?.payload?.user?.favoriteStories;
          state.exp = Number(action?.payload?.exp);
          state.isLoggedIn = true;
          state.data = action?.payload?.user;
          state.role = action?.payload?.user.role;
        }
      })
      .addCase(LoginAccount.fulfilled, (state, action) => {
        if (action?.payload?.success) {
          const { user, exp } = action.payload;
          localStorage.setItem("data", JSON.stringify(user));
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("exp", Number(exp));
          localStorage.setItem(
            "favoriteStories",
            JSON.stringify(user.favoriteStories)
          );
          localStorage.setItem(
            "favoriteDestinations",
            JSON.stringify(user.favoriteDestinations)
          );
          localStorage.setItem("role", user.role);
          localStorage.setItem("userName", user.userName);
          localStorage.setItem(
            "Authenticator",
            action?.payload?.AuthenticatorToken
          );
          state.Authenticator = action?.payload?.AuthenticatorToken;
          state.userName = user.userName;
          state.favoriteDestinations = user.favoriteDestinations;
          state.favoriteStories = user.favoriteStories;
          state.exp = Number(exp);
          state.isLoggedIn = true;
          state.data = user;
          state.role = user.role;
        }
      })
      .addCase(LoadAccount.fulfilled, (state, action) => {
        if (action.payload.success) {
          const { user, exp, AuthenticatorToken } = action.payload;
          localStorage.setItem("data", JSON.stringify(user));
          localStorage.setItem(
            "favoriteStories",
            JSON.stringify(user.favoriteStories)
          );
          localStorage.setItem(
            "favoriteDestinations",
            JSON.stringify(user.favoriteDestinations)
          );
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("exp", Number(exp));
          localStorage.setItem("role", user.role);
          localStorage.setItem("userName", user.userName);
          localStorage.setItem("Authenticator", AuthenticatorToken);
          state.Authenticator = AuthenticatorToken;
          state.userName = user.userName;
          state.favoriteDestinations = user.favoriteDestinations;
          state.favoriteStories = user.favoriteStories;
          state.exp = Number(exp);
          state.isLoggedIn = true;
          state.data = user;
          state.role = user.role;
        }
      })
      .addCase(FavoriteListRemoveDestination.fulfilled, (state, action) => {
        if (action?.payload?.success) {
          const { data } = action?.payload;

          localStorage.setItem("favoriteDestinations", JSON.stringify(data));
          state.favoriteDestinations = data;
        }
      })
      .addCase(FavoriteListAddDestination.fulfilled, (state, action) => {
        if (action?.payload?.success) {
          const { data } = action?.payload;

          localStorage.setItem("favoriteDestinations", JSON.stringify(data));
          state.favoriteDestinations = data;
        }
      })
      .addCase(FavoriteListAddStory.fulfilled, (state, action) => {
        if (action?.payload?.success) {
          const { data } = action?.payload;

          localStorage.setItem("favoriteStories", JSON.stringify(data));
          state.favoriteStories = data;
        }
      })
      .addCase(FavoriteRemoveStory.fulfilled, (state, action) => {
        if (action?.payload?.success) {
          const { data } = action?.payload;

          localStorage.setItem("favoriteStories", JSON.stringify(data));
          state.favoriteStories = data;
        }
      });
  },
});
export const { logout, setToken } = authSliceRedux.actions;
export default authSliceRedux.reducer;
