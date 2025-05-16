import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance";

const initialState = {
  stories: localStorage.getItem("stories")
    ? JSON.parse(localStorage.getItem("stories"))
    : [],
  limit: localStorage.getItem("limit") || 25,
  totalPages: localStorage.getItem("totalPages") || 1,
  page: localStorage.getItem("page") || 1,
  HomeStories: localStorage.getItem("HomeStories")
    ? JSON.parse(localStorage.getItem("HomeStories"))
    : [],
  loading: false,
  error: localStorage.getItem("error") || false,
  success: localStorage.getItem("success") || false,
  homeSuccess: localStorage.getItem("homeSuccess") || false,
  currentStory: null,
};

// Public APIs
export const fetchStories = createAsyncThunk(
  "stories/fetchAll",
  async ({ page = 1, limit = 25 }) => {
    try {
      const res = await axiosInstance.get(`/story?page=${page}&limit=${limit}`);
      return res.data;
    } catch (err) {
      return err.response?.data || err.message;
    }
  }
);

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
  "stories/fetchFeatured/home",
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
          state.stories = action.payload?.data;
          localStorage.setItem("stories", JSON.stringify(action.payload?.data));
        } else {
          localStorage.setItem("success", false);
          localStorage.setItem("error", true);
        }
      })

      .addCase(fetchStories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchFeaturedStories.fulfilled, (state, action) => {
        state.featuredStories = action.payload;
      })
      .addCase(fetchHomeStories.fulfilled, (state, action) => {
        if (action?.payload?.success) {
          state.loading = false;
          state.error = false;
          localStorage.setItem("homeSuccess", true);
          localStorage.setItem("error", false);
          state.HomeStories = action.payload?.data;
          localStorage.setItem(
            "HomeStories",
            JSON.stringify(action.payload?.data)
          );
        } else {
          localStorage.setItem("homeSuccess", false);
          localStorage.setItem("error", true);
        }
      })

      .addCase(fetchStoryById.fulfilled, (state, action) => {
        state.currentStory = action.payload;
      });
  },
});

export default storiesSlice.reducer;
