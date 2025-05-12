import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance";

const initialState = {
  stories: [],
  featuredStories: [],
  currentStory: null,
  loading: false,
  error: null,
};

// Public APIs
export const fetchStories = createAsyncThunk("stories/fetchAll", async () => {
  try {
    const res = await axiosInstance.get("/story");
    return res.data;
  } catch (err) {
    return err.response?.data || err.message;
  }
});

export const fetchFeaturedStories = createAsyncThunk(
  "stories/fetchFeatured",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/story/featured");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const fetchHomeStories = createAsyncThunk(
  "stories/fetchFeatured",
  async () => {
    try {
      const res = await axiosInstance.get("/story/home");
      return res.data;
    } catch (err) {
      return err.response?.data || err.message;
    }
  }
);

export const fetchStoryById = createAsyncThunk(
  "stories/fetchById",
  async (id, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/story/${id}`);
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
      const res = await axiosInstance.post("/api/v5/admin/stories", formData, {
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
      const res = await axiosInstance.put(
        `/api/v5/admin/stories/${id}`,
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

export const deleteStory = createAsyncThunk("stories/delete", async (id) => {
  try {
    const res = await axiosInstance.delete(`/api/v5/admin/stories/${id}`);
    return res?.data;
  } catch (err) {
    return err.response?.data || err.message;
  }
});

export const markAsFeatured = createAsyncThunk(
  "stories/markAsFeatured",
  async (id, thunkAPI) => {
    try {
      const res = await axiosInstance.put(
        `/api/v5/admin/stories/featured/${id}`
      );
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
      });
  },
});

export default storiesSlice.reducer;
