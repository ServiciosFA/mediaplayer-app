import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  tokenType: null,
  expiresIn: null,
  expiresTime: null,
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    SET_TOKEN(state, action) {
      state.accessToken = action.payload.accessToken;
      state.tokenType = action.payload.tokenType;
      state.expiresIn = action.payload.expiresIn;
      state.expiresTime = action.payload.expiresTime;
    },
  },
});

export const tokenActions = tokenSlice.actions;
export default tokenSlice.reducer;
