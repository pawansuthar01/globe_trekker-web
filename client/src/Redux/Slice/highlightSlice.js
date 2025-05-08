import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  highlights: [],
  publishedHighlights: [],
  currentHighlight: null,
  loading: false,
  error: null,
};

// Get all highlights (public)
export const fetchHighlights = createAsyncThunk(
  "highlight/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/highlight");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Get published highlights (public)
export const fetchPublishedHighlights = createAsyncThunk(
  "highlight/fetchPublished",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/highlight/published");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Get highlight by ID (public)
export const fetchHighlightById = createAsyncThunk(
  "highlight/fetchById",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`/highlight/${id}`);
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
      const res = await axios.post("/api/v5/admin/highlight", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Admin - Update highlight
export const updateHighlight = createAsyncThunk(
  "highlight/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      const res = await axios.put(`/api/v5/admin/highlight/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Admin - Delete highlight
export const deleteHighlight = createAsyncThunk(
  "highlight/delete",
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`/api/v5/admin/highlight/${id}`);
      return { id };
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
      const res = await axios.put(`/api/v5/admin/highlight/published/${id}`);
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
        state.loading = false;
        state.highlights = action.payload;
      })
      .addCase(fetchHighlights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Published
      .addCase(fetchPublishedHighlights.fulfilled, (state, action) => {
        state.publishedHighlights = action.payload;
      })

      // Get By ID
      .addCase(fetchHighlightById.fulfilled, (state, action) => {
        state.currentHighlight = action.payload;
      })

      // Add
      .addCase(addHighlight.fulfilled, (state, action) => {
        state.highlights.push(action.payload);
      })

      // Update
      .addCase(updateHighlight.fulfilled, (state, action) => {
        const index = state.highlights.findIndex(
          (h) => h._id === action.payload._id
        );
        if (index !== -1) state.highlights[index] = action.payload;
      })

      // Delete
      .addCase(deleteHighlight.fulfilled, (state, action) => {
        state.highlights = state.highlights.filter(
          (h) => h._id !== action.payload.id
        );
      })

      // Publish/Unpublish
      .addCase(togglePublishHighlight.fulfilled, (state, action) => {
        const index = state.highlights.findIndex(
          (h) => h._id === action.payload._id
        );
        if (index !== -1) state.highlights[index] = action.payload;
      });
  },
});

export default highlightSlice.reducer;
