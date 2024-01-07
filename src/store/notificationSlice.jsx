import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "success",
  message: "",
  active: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    ACTIVE_NOTIFICATION(state, action) {
      state.active = true;
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    DESACTIVE_NOTIFICATION(state) {
      state.active = false;
      state.type = "";
      state.message = "";
    },
  },
});
export const notificationActions = notificationSlice.actions;

export const selectActive = (state) => state.chat.active;
export const selectType = (state) => state.chat.type;
export const selectMessage = (state) => state.chat.message;

export default notificationSlice.reducer;
