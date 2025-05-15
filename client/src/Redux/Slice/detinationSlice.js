import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance";

const initialState = {
  loading: false,
  destinations: [],
  destination: null,
  error: null,
  success: false,
};

// -------------------- USER-SIDE REQUESTS --------------------

// Get all destinations
export const fetchAllDestinations = createAsyncThunk(
  "destination/fetchAll",
  async () => {
    try {
      const { data } = await axiosInstance.get("/api/v3/destination");
      return data;
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
        state.loading = false;
        state.destinations = action.payload;
      })
      .addCase(fetchAllDestinations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDestinationState } = destinationSlice.actions;
export default destinationSlice.reducer;
