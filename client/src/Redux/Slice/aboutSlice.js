import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance";

const initialState = {
  aboutData: null,
  loading: false,
  error: null,
};

// ✅ 1. Get About data (Public)

export const fetchAbout = createAsyncThunk("about/fetch", async () => {
  try {
    const res = await axiosInstance.get("/about");
    return res.data;
  } catch (err) {
    return err.response?.data || err.message;
  }
});

// ✅ 2. Add About data (Admin)
export const addAbout = createAsyncThunk("about/add", async (formData) => {
  try {
    const res = await axiosInstance.post("/api/v5/admin/about", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    return err.response?.data || err.message;
  }
});

// ✅ 3. Update About data (Admin)
export const updateAbout = createAsyncThunk(
  "about/update",
  async (formData) => {
    try {
      const res = await axiosInstance.put(`/api/v5/admin/about`, formData);
      return res.data;
    } catch (err) {
      return err.response?.data || err.message;
    }
  }
);
export const updateAboutTeam = createAsyncThunk(
  "about/update",
  async ({ id, formData }) => {
    try {
      const res = await axiosInstance.put(
        `/api/v5/admin/about/team/${id}`,
        formData
      );
      return res.data;
    } catch (err) {
      return err.response?.data || err.message;
    }
  }
);
export const newAboutTeam = createAsyncThunk(
  "about/update",
  async (formData) => {
    try {
      const res = await axiosInstance.put(
        `/api/v5/admin/about/team/new`,
        formData
      );
      return res.data;
    } catch (err) {
      return err.response?.data || err.message;
    }
  }
);
export const getTeamCall = createAsyncThunk("about/update", async () => {
  try {
    const res = await axiosInstance.get(`/api/v5/admin/about/team`);
    return res.data;
  } catch (err) {
    return err.response?.data || err.message;
  }
});
export const DeleteAboutTeam = createAsyncThunk(
  "about/team/delete",
  async (id) => {
    try {
      const res = await axiosInstance.delete(
        `/api/v5/admin/about/team/delete/${id}`
      );
      return res.data;
    } catch (err) {
      return err.response?.data || err.message;
    }
  }
);

const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchAbout.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAbout.fulfilled, (state, action) => {
        state.loading = false;
        state.aboutData = action.payload?.data;
      })
      .addCase(fetchAbout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add
      .addCase(addAbout.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAbout.fulfilled, (state, action) => {
        state.loading = false;
        state.aboutData = action.payload;
      })
      .addCase(addAbout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateAbout.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAbout.fulfilled, (state, action) => {
        state.loading = false;
        state.aboutData = action.payload;
      })
      .addCase(updateAbout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default aboutSlice.reducer;
