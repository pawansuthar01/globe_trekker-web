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
export const deleteBanner = createAsyncThunk(
  "banner/delete",
  async (id, thunkAPI) => {
    try {
      await axiosInstance.delete(`/api/v5/admin/banner/${id}`);
      return { id };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

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
      })

      // Update banner
      .addCase(updateBanner.fulfilled, (state, action) => {
        const idx = state.banners.findIndex(
          (b) => b._id === action.payload._id
        );
        if (idx !== -1) state.banners[idx] = action.payload;
      })

      // Delete banner
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.banners = state.banners.filter(
          (b) => b._id !== action.payload.id
        );
      })

      // Activate banner
      .addCase(activateBanner.fulfilled, (state, action) => {
        const idx = state.banners.findIndex(
          (b) => b._id === action.payload._id
        );
        if (idx !== -1) state.banners[idx] = action.payload;
      });
  },
});

export default bannerSlice.reducer;
