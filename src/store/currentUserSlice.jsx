/*display_name: "Fernando Agustín Acosta"
href: "https://api.spotify.com/v1/users/terstyle"
id: "terstyle"
images: (2) [{…}, {…}]
type: "user"
uri: "spotify:user:terstyle*/
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  displayName: "",
  href: "",
  id: null,
  images: [],
  followers: 0,
};

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    SET_USER(state, action) {
      state.displayName = action.payload.display_name;
      state.href = action.payload.href;
      state.id = action.payload.id;
      state.images = action.payload.images;
      state.followers = action.payload.followers.total;
    },
    RESET(state) {
      state.displayName = "";
      state.href = "";
      state.id = null;
      state.images = [];
      state.followers = 0;
    },
  },
});

export const currentUserActions = currentUserSlice.actions;
export default currentUserSlice.reducer;
