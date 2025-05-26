import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance";

const initialState = {
  feedbacks: localStorage.getItem("feedbacks")
    ? JSON.parse(localStorage.getItem("feedbacks"))
    : [],
  page: Number(localStorage.getItem("page")) || 1,
  totalPages: Number(localStorage.getItem("totalPages")) || 1,
  success: localStorage.getItem("success") || false,
  error: localStorage.getItem("error") || false,
};

export const addFeedback = createAsyncThunk("feedback/post", async (form) => {
  try {
    const res = await axiosInstance.post(`api/v3/auth/feedback`, form);
    return res.data;
  } catch (err) {
    return err.response?.data || err.message;
  }
});

export const getFeedbacks = createAsyncThunk(
  "feedback/get",
  async ({ page = 1, limit = 10 }) => {
    try {
      const res = await axiosInstance.get(
        `/api/v3/auth/feedback?page=${page}&limit=${limit}`
      );
      return res.data;
    } catch (err) {
      return err.response?.data || err.message;
    }
  }
);

export const deleteFeedback = createAsyncThunk(
  "feedback/delete",
  async (id) => {
    try {
      const res = await axiosInstance.delete(`/api/v3/auth/feedback/${id}`);
      return res.data;
    } catch (err) {
      return err.response?.data || err.message;
    }
  }
);

const FeedbackRedux = createSlice({
  name: "feedbacks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFeedbacks.fulfilled, (state, action) => {
      if (action?.payload?.success) {
        const { data, page, totalPages } = action?.payload;
        localStorage.setItem("feedbacks", JSON.stringify(data));
        localStorage.setItem("page", Number(page));
        localStorage.setItem("totalPages", Number(totalPages));
        localStorage.setItem("error", false);
        localStorage.setItem("success", true);
        state.feedbacks = data;
        state.totalPages = Number(totalPages);
        state.success = true;
        state.error = false;
        state.page = Number(page);
      } else {
        localStorage.setItem("error", true);
        localStorage.setItem("success", false);
        state.success = false;
        state.error = true;
      }
    });
  },
});
export const {} = FeedbackRedux.actions;
export default FeedbackRedux.reducer;
