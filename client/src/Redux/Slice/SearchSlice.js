import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance";

const initialState = {
  results: [],
  highlightResults: [],
  suggestions: [],
  keywords: [],
  loading: false,
  error: null,
};

// ✅ 1. General search (destination + stories)
export const searchDestinationsAndStories = createAsyncThunk(
  "search/general",
  async (keyword, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/api/search?keyword=${keyword}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ 2. Search highlights
export const searchHighlights = createAsyncThunk(
  "search/highlights",
  async (keyword, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `/api/search/highlights?keyword=${keyword}`
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ 2. Search highlights
export const searchDestinations = createAsyncThunk(
  "search/destinations",
  async (keyword, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `/api/search/destinations?keyword=${keyword}`
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ 2. Search highlights
export const searchStories = createAsyncThunk(
  "search/destinations",
  async (keyword, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `/api/search/stories?keyword=${keyword}`
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ 3. Suggest search keywords
export const suggestSearchKeywords = createAsyncThunk(
  "search/suggestions",
  async (keyword) => {
    try {
      const res = await axiosInstance.get(`/api/search/suggest?q=${keyword}`);
      return res.data;
    } catch (err) {
      return err.response?.data || err.message;
    }
  }
);

// ✅ 4. Get all search keywords (Admin)
export const getAllSearchKeywords = createAsyncThunk(
  "search/allKeywords",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/api/v5/admin/search");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // General search
      .addCase(searchDestinationsAndStories.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchDestinationsAndStories.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(searchDestinationsAndStories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Highlights search
      .addCase(searchHighlights.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchHighlights.fulfilled, (state, action) => {
        state.loading = false;
        state.highlightResults = action.payload;
      })
      .addCase(searchHighlights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Suggestions
      .addCase(suggestSearchKeywords.pending, (state) => {
        state.loading = true;
      })
      .addCase(suggestSearchKeywords.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestions = action.payload;
      })
      .addCase(suggestSearchKeywords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Admin - All keywords
      .addCase(getAllSearchKeywords.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllSearchKeywords.fulfilled, (state, action) => {
        state.loading = false;
        state.keywords = action.payload;
      })
      .addCase(getAllSearchKeywords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default searchSlice.reducer;
