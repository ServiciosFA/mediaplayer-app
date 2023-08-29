import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timer: { seconds: 0, minutes: 0 },
  trackPercentage: 0,
  totalTime: 0,
};

const timerSlice = createSlice({
  name: "timerTrack",
  initialState,
  reducers: {
    SET_TIMER(state, action) {
      state.timer.seconds = action?.payload?.timer.seconds;
      state.timer.minutes = action?.payload?.timer.minutes;
      state.totalTime = action?.payload?.totalTime;
      if (state.timer?.seconds !== 0)
        state.trackPercentage =
          ((state.timer.minutes * 60 + state.timer.seconds) * 100) /
          state.totalTime;
    },
    RESTART(state, action) {
      state.timer.seconds = 0;
      state.timer.minutes = 0;
      state.trackPercentage = 0;
      state.totalTime = 0;
      state.isRunning = true;
    },
    PLAY_PAUSE(state, action) {
      state.isRunning = action.payload;
    },
    SET_PROGRES(state, action) {
      if (
        action?.payload?.trackPercentage &&
        state.trackPercentage !== action?.payload?.trackPercentage
      ) {
        state.trackPercentage = action?.payload?.trackPercentage;
        const timePercentage = Math.floor(
          (state.totalTime * action?.payload?.trackPercentage) / 100
        );
        state.timer.minutes = Math.floor(timePercentage / 60);
        state.timer.seconds = Math.floor(timePercentage % 60);
      }
    },
  },
});

export const timerSliceActions = timerSlice.actions;
export default timerSlice.reducer;
