import { configureStore } from "@reduxjs/toolkit";
import tokenSlice from "./tokenSlice";
import currentTrackSlice from "./currentTrackSlice";
import timerSilce from "./timerSilce";
import currentUserSlice from "./currentUserSlice";
import notificationSlice from "./notificationSlice";

const store = configureStore({
  reducer: {
    token: tokenSlice,
    currentTrack: currentTrackSlice,
    timer: timerSilce,
    currentUser: currentUserSlice,
    notification: notificationSlice,
  },
});

export default store;
