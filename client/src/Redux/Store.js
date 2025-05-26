import { configureStore } from "@reduxjs/toolkit";
import authSliceRedux from "./Slice/authSlice";
import destinationSlice from "./Slice/detinationSlice";
import bannerRedux from "./Slice/bannerSlice";
import webContactRedux from "./Slice/web_contactSlice";
import highlightRedux from "./Slice/highlightSlice";
import aboutSlice from "./Slice/aboutSlice";
import stroyRedux from "./Slice/storiesSlice";
import FeedbackRedux from "./Slice/feedbackSlice";
import searchRedux from "./Slice/SearchSlice";
const Store = configureStore({
  reducer: {
    banner: bannerRedux,
    Feedback: FeedbackRedux,
    web_contact: webContactRedux,
    about: aboutSlice,
    auth: authSliceRedux,
    destination: destinationSlice,
    highlight: highlightRedux,
    story: stroyRedux,
    search: searchRedux,
  },
  devTools: true,
});
export default Store;
