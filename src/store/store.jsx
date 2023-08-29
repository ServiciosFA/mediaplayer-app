import { configureStore } from "@reduxjs/toolkit";
import tokenSlice from "./tokenSlice";
import currentTrackSlice from "./currentTrackSlice";
import timerSilce from "./timerSilce";


const store = configureStore({
  reducer: {
    token: tokenSlice,
    currentTrack: currentTrackSlice,
    timer: timerSilce,
  
  },
});

export default store;
