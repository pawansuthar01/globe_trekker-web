import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  contacts: [],
  loading: false,
  error: null,
};

// ✅ 1. Add new contact (Public)
export const addNewContact = createAsyncThunk(
  "contact/add",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post("/userContact", data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ 2. Get all contacts (Admin)
export const getAllContacts = createAsyncThunk(
  "contact/getAll",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/api/v5/admin/contact");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ 3. Mark contact as read (Admin)
export const markContactAsRead = createAsyncThunk(
  "contact/markAsRead",
  async (id, thunkAPI) => {
    try {
      const res = await axios.put(`/api/v5/admin/contact/${id}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const userContactSlice = createSlice({
  name: "userContact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get All Contacts
      .addCase(getAllContacts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(getAllContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add New Contact
      .addCase(addNewContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts.push(action.payload);
      })
      .addCase(addNewContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Mark as Read
      .addCase(markContactAsRead.fulfilled, (state, action) => {
        const idx = state.contacts.findIndex(
          (c) => c._id === action.payload._id
        );
        if (idx !== -1) {
          state.contacts[idx] = action.payload;
        }
      });
  },
});

export default userContactSlice.reducer;
