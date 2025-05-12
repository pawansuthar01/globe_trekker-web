import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance";

const initialState = {
  banners: [],
  loading: false,
  error: null,
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
    console.log(id);
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
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bannerSlice.reducer;
