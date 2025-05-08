import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  stories: [],
  featuredStories: [],
  currentStory: null,
  loading: false,
  error: null,
};

// Public APIs
export const fetchStories = createAsyncThunk(
  "stories/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/story");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchFeaturedStories = createAsyncThunk(
  "stories/fetchFeatured",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/story/featured");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchStoryById = createAsyncThunk(
  "stories/fetchById",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`/story/${id}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Admin APIs
export const addStory = createAsyncThunk(
  "stories/add",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post("/api/v5/admin/stories", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateStory = createAsyncThunk(
  "stories/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      const res = await axios.put(`/api/v5/admin/stories/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteStory = createAsyncThunk(
  "stories/delete",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/api/v5/admin/stories/${id}`);
      return { id };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const markAsFeatured = createAsyncThunk(
  "stories/markAsFeatured",
  async (id, thunkAPI) => {
    try {
      const res = await axios.put(`/api/v5/admin/stories/featured-true/${id}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const unmarkAsFeatured = createAsyncThunk(
  "stories/unmarkAsFeatured",
  async (id, thunkAPI) => {
    try {
      const res = await axios.put(`/api/v5/admin/stories/featured-false/${id}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const storiesSlice = createSlice({
  name: "stories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.loading = false;
        state.stories = action.payload;
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchFeaturedStories.fulfilled, (state, action) => {
        state.featuredStories = action.payload;
      })

      .addCase(fetchStoryById.fulfilled, (state, action) => {
        state.currentStory = action.payload;
      })

      .addCase(addStory.fulfilled, (state, action) => {
        state.stories.push(action.payload);
      })

      .addCase(updateStory.fulfilled, (state, action) => {
        const index = state.stories.findIndex(
          (s) => s._id === action.payload._id
        );
        if (index !== -1) state.stories[index] = action.payload;
      })

      .addCase(deleteStory.fulfilled, (state, action) => {
        state.stories = state.stories.filter(
          (s) => s._id !== action.payload.id
        );
      })

      .addCase(markAsFeatured.fulfilled, (state, action) => {
        const index = state.stories.findIndex(
          (s) => s._id === action.payload._id
        );
        if (index !== -1) state.stories[index] = action.payload;
      })

      .addCase(unmarkAsFeatured.fulfilled, (state, action) => {
        const index = state.stories.findIndex(
          (s) => s._id === action.payload._id
        );
        if (index !== -1) state.stories[index] = action.payload;
      });
  },
});

export default storiesSlice.reducer;
