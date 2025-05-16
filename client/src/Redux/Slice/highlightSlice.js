import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance";

const initialState = {
  highlights: localStorage.getItem("highlights")
    ? JSON.parse(localStorage.getItem("highlights"))
    : [],
  limit: localStorage.getItem("limit") || 0,
  totalPages: localStorage.getItem("totalPages") || 0,
  page: localStorage.getItem("page") || 0,
  homeHighlight: localStorage.getItem("homeHighlight")
    ? JSON.parse(localStorage.getItem("homeHighlight"))
    : [],
  loading: false,
  error: localStorage.getItem("error") || false,
  success: localStorage.getItem("success") || false,
  homeSuccess: localStorage.getItem("homeSuccess") || false,
  currentStory: null,
};

// Get all highlights (public)
export const fetchHighlights = createAsyncThunk(
  "highlight/fetchAll",
  async () => {
    try {
      const res = await axiosInstance.get("/highlight");
      return res.data;
    } catch (err) {
      return err.response?.data || err.message;
    }
  }
);

// Get published highlights (public)
export const fetchPublishedHighlights = createAsyncThunk(
  "highlight/fetchPublished",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/highlight/published");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Get featured Highlights
export const fetchFeaturedHighlights = createAsyncThunk(
  "highlight/fetchFeaturedHighlights",
  async () => {
    try {
      const res = await axiosInstance.get("/highlight/featured");

      return res.data;
    } catch (err) {
      return err.response?.data?.message;
    }
  }
);

// Get featured Highlights
export const fetchHomeHighlights = createAsyncThunk(
  "highlight/fetchFeaturedHighlights",
  async () => {
    try {
      const res = await axiosInstance.get("/highlight/home");

      return res.data;
    } catch (err) {
      return err.response?.data?.message;
    }
  }
);

// Get highlight by ID (public)
export const fetchHighlightById = createAsyncThunk(
  "highlight/fetchById",
  async (id, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/highlight/${id}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Admin - Add new highlight
export const addHighlight = createAsyncThunk(
  "highlight/add",
  async (formData, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        "/api/v5/admin/highlight",
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

// Admin - Update highlight
export const updateHighlight = createAsyncThunk(
  "highlight/update",
  async ({ id, formData }) => {
    try {
      const res = await axiosInstance.put(
        `/api/v5/admin/highlight/${id}`,
        formData
      );
      return res.data;
    } catch (err) {
      return err.response?.data || err.message;
    }
  }
);

// Admin - Delete highlight
export const deleteHighlight = createAsyncThunk(
  "highlight/delete",
  async (id, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(`/api/v5/admin/highlight/${id}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Admin - Publish/unpublish
export const togglePublishHighlight = createAsyncThunk(
  "highlight/publish",
  async (id, thunkAPI) => {
    try {
      const res = await axiosInstance.put(
        `/api/v5/admin/highlight/published/${id}`
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const highlightSlice = createSlice({
  name: "highlight",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchHighlights.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHighlights.fulfilled, (state, action) => {
        if (action?.payload?.success) {
          state.page = Number(action?.payload?.page);
          state.limit = Number(action?.payload?.limit);
          state.totalPages = Number(action?.payload?.totalPages);
          state.loading = false;
          state.success = true;
          state.error = false;
          localStorage.setItem("success", true);
          localStorage.setItem("page", Number(action?.payload?.page));
          localStorage.setItem("limit", Number(action?.payload?.limit));
          localStorage.setItem(
            "totalPages",
            Number(action?.payload?.totalPages)
          );
          state.highlights = JSON.stringify(action.payload?.data);
          localStorage.setItem(
            "highlights",
            JSON.stringify(action.payload?.data)
          );
        } else {
          localStorage.setItem("success", false);
          localStorage.setItem("error", true);
        }
      })
      .addCase(fetchHomeHighlights.fulfilled, (state, action) => {
        if (action?.payload?.success) {
          state.loading = false;
          state.error = false;
          localStorage.setItem("homeSuccess", true);
          localStorage.setItem("error", false);
          state.homeHighlight = action.payload?.data;
          localStorage.setItem(
            "homeHighlight",
            JSON.stringify(action.payload?.data)
          );
        } else {
          localStorage.setItem("homeSuccess", false);
          localStorage.setItem("error", true);
        }
      })
      .addCase(fetchHighlights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default highlightSlice.reducer;
