import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance";

const initialState = {
  loading: false,
  destinations: localStorage.getItem("destinations")
    ? JSON.parse(localStorage.getItem("destinations"))
    : [],
  homeDestination: localStorage.getItem("homeDestination")
    ? JSON.parse(localStorage.getItem("homeDestination"))
    : [],
  limit: localStorage.getItem("limit") || 25,
  totalPages: localStorage.getItem("totalPages") || 1,
  page: localStorage.getItem("page") || 1,
  error: localStorage.getItem("error") || false,
  success: localStorage.getItem("success") || false,
  homeSuccess: localStorage.getItem("homeSuccess") || false,
};

// -------------------- USER-SIDE REQUESTS --------------------

// Get all destinations
export const fetchAllDestinations = createAsyncThunk(
  "destination/fetchAll",
  async ({ page = 1, limit = 12 }) => {
    try {
      const response = await axiosInstance.get(
        `/api/v3/destination?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (err) {
      return err.response?.data?.message;
    }
  }
);

// Get all destinations
export const fetchDestinations = createAsyncThunk(
  "destination/fetchAll/admin",
  async () => {
    try {
      const { data } = await axiosInstance.get("/api/v3/destination/admin");
      return data;
    } catch (err) {
      return err.response?.data?.message;
    }
  }
);

// Get destination by ID
export const fetchDestinationById = createAsyncThunk(
  "destination/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/api/v3/destination/${id}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// Get published destinations
export const fetchPublishedDestinations = createAsyncThunk(
  "destination/fetchPublished",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/api/v3/destination/published");
      return data;
    } catch (error) {
      return error?.response?.data || error?.message || "Something went wrong";
    }
  }
);

// Get featured destinations
export const fetchFeaturedDestinations = createAsyncThunk(
  "destination/fetchFeatured",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/api/v3/destination/featured");
      return data;
    } catch (error) {
      return error?.response?.data || error?.message || "Something went wrong";
    }
  }
);

// Add Review
export const addReview = createAsyncThunk(
  "destination/addReview",
  async ({ id, review }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        `/api/v3/destination/add-review/${id}`,
        review
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// Update Review
export const updateReview = createAsyncThunk(
  "destination/updateReview",
  async ({ destinationId, reviewId, review }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        `/api/v3/destination/update-review/${destinationId}/${reviewId}`,
        review
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// Save to user's saved list
export const saveDestination = createAsyncThunk(
  "destination/save",
  async ({ destinationId, userId }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        `/api/v3/destination/save/${destinationId}/${userId}`
      );
      return data;
    } catch (error) {
      return error?.response?.data || error?.message || "Something went wrong";
    }
  }
);

// Remove from saved
export const removeSavedDestination = createAsyncThunk(
  "destination/removeSaved",
  async ({ destinationId, userId }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        `/api/v3/destination/remove/${destinationId}/${userId}`
      );
      return data;
    } catch (error) {
      return error?.response?.data || error?.message || "Something went wrong";
    }
  }
);

// -------------------- ADMIN-SIDE REQUESTS --------------------

// Create new destination
export const createDestination = createAsyncThunk(
  "destination/create",
  async (formData) => {
    try {
      const { data } = await axiosInstance.post(
        "/api/v5/admin/destination",
        formData
      );
      return data;
    } catch (error) {
      return error?.response?.data || error?.message || "Something went wrong";
    }
  }
);

// Update destination
export const updateDestination = createAsyncThunk(
  "destination/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        `/api/v5/admin/destination/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// Delete destination
export const deleteDestination = createAsyncThunk(
  "destination/delete",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(
        `/api/v5/admin/destination/${id}`
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// Mark as Featured
export const markAsFeatured = createAsyncThunk(
  "destination/markFeatured",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        `/api/v5/admin/destination/featured/${id}`
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// Mark as Published
export const markAsPublished = createAsyncThunk(
  "destination/markPublished",
  async (id) => {
    try {
      const { data } = await axiosInstance.put(
        `/api/v5/admin/destination/published/${id}`
      );
      return data;
    } catch (err) {
      return err.response?.data?.message;
    }
  }
);

// -------------------- SLICE --------------------

const destinationSlice = createSlice({
  name: "destination",
  initialState,
  reducers: {
    clearDestinationState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle all actions here as needed
    builder
      .addCase(fetchAllDestinations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllDestinations.fulfilled, (state, action) => {
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
          state.destinations = action.payload?.data;
          localStorage.setItem(
            "destinations",
            JSON.stringify(action.payload?.data)
          );
        } else {
          localStorage.setItem("success", false);
          localStorage.setItem("error", true);
        }
      })
      .addCase(fetchFeaturedDestinations.fulfilled, (state, action) => {
        if (action?.payload?.success) {
          state.loading = false;
          state.error = false;
          localStorage.setItem("homeSuccess", true);
          localStorage.setItem("error", false);
          state.homeDestination = action.payload?.data;
          localStorage.setItem(
            "homeDestination",
            JSON.stringify(action.payload?.data)
          );
        } else {
          localStorage.setItem("homeSuccess", false);
          localStorage.setItem("error", true);
        }
      })
      .addCase(fetchAllDestinations.rejected, (state, action) => {
        if (!action?.payload?.success) return;
        state.loading = false;
        state.error = action.payload.message;
        localStorage.setItem("error", action.payload?.message);
      });
  },
});

export const { clearDestinationState } = destinationSlice.actions;
export default destinationSlice.reducer;
