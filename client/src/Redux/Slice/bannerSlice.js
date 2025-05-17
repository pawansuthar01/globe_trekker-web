import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance";

const initialState = {
  banners: localStorage.getItem("banners")
    ? JSON.parse(localStorage.getItem("banners"))
    : {},
  loading: false,
  error: localStorage.getItem("error") || false,
  success: localStorage.getItem("success") || false,
};

// ✅ Get All Banners (Admin)
export const fetchBanners = createAsyncThunk(
  "banner/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/api/v5/admin/banner");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Get Active Banners (Public)
export const fetchActiveBanners = createAsyncThunk(
  "banner/fetchActive",
  async () => {
    try {
      const res = await axiosInstance.get("/banner");
      return res.data;
    } catch (err) {
      return err.response?.data || err.message;
    }
  }
);

// ✅ Update Banner (Admin)
export const updateBanner = createAsyncThunk(
  "banner/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(
        `/api/v5/admin/banner/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Delete Banner (Admin)
export const deleteBanner = createAsyncThunk("banner/delete", async (id) => {
  try {
    await axiosInstance.delete(`/api/v5/admin/banner/${id}`);
    return { id };
  } catch (err) {
    return err.response?.data || err.message;
  }
});

// ✅ Activate Banner (Admin)
export const activateBanner = createAsyncThunk(
  "banner/activate",
  async (id, thunkAPI) => {
    try {
      const res = await axiosInstance.put(`/api/v5/admin/banner-active/${id}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const newBanner = createAsyncThunk("banner/new", async (data) => {
  try {
    const res = await axiosInstance.post(`/api/v5/admin/banner/new`, data);
    return res.data;
  } catch (err) {
    return err.response?.data || err.message;
  }
});

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all banners
      .addCase(fetchActiveBanners.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchActiveBanners.fulfilled, (state, action) => {
        if (action?.payload?.success) {
          state.banners = action.payload.data;

          state.loading = false;
          localStorage.setItem("banners", JSON.stringify(action.payload.data));
          localStorage.setItem("success", true);
          localStorage.setItem("error", false);
        } else {
          localStorage.setItem("success", false);
          localStorage.setItem("error", true);
        }
      })
      .addCase(fetchActiveBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        localStorage.setItem("success", false);
        localStorage.setItem("error", true);
      });
  },
});

export default bannerSlice.reducer;
