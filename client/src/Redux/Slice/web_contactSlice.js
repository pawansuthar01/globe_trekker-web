import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  contacts: [],
  loading: false,
  error: null,
};

// ✅ 1. Get all web contacts (Public)
export const getWebContacts = createAsyncThunk(
  "webContact/getAll",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/contact");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ 2. Add new web contact (Admin)
export const addWebContact = createAsyncThunk(
  "webContact/add",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post("/api/v5/admin/web-contact", data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ 3. Update existing web contact (Admin)
export const updateWebContact = createAsyncThunk(
  "webContact/update",
  async (data, thunkAPI) => {
    try {
      const res = await axios.put("/api/v5/admin/web-contact", data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const webContactSlice = createSlice({
  name: "webContact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all contacts
      .addCase(getWebContacts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWebContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(getWebContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add contact
      .addCase(addWebContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(addWebContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts.push(action.payload);
      })
      .addCase(addWebContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update contact
      .addCase(updateWebContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateWebContact.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.contacts.findIndex(
          (c) => c._id === action.payload._id
        );
        if (index !== -1) {
          state.contacts[index] = action.payload;
        }
      })
      .addCase(updateWebContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default webContactSlice.reducer;
