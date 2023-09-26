import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  imgUrl: "",
  releaseDate: null,
  artist: "",
  previewTrack: "",
  duration: 0,
  tracks: [],
  indexTrack: 0,
  repeat: false,
  shuffle: false,
};

const currentTrackSlice = createSlice({
  name: "currentTrack",
  initialState,
  reducers: {
    SET_CURRENT_TRACK(state, action) {
      state.id = action.payload?.id;
      state.name = action.payload?.name;

      state.imgUrl = action.payload?.album?.images[0].url || state.imgUrl;
      state.releaseDate =
        action.payload?.album?.release_date || state.release_date;
      state.artist = action.payload?.album?.artists[0].name || state.artist;

      state.previewTrack = action.payload?.preview_url;
      if (action.payload?.tracks) state.tracks = action.payload?.tracks;
      state.indexTrack = action.payload?.indexTrack;
    },
    NEXT_TRACK(state, action) {
      let index = state.indexTrack + 1;

      if (state.shuffle)
        index = Math.floor(Math.random() * state.tracks.length);

      //verificar modo repeat
      if (index > state.tracks.length - 1)
        state.repeat ? (index = 0) : (index = state.tracks.length - 1);

      //Controlar datos enviados de la API
      const data = action.payload?.tracks[index]?.track
        ? action.payload?.tracks[index]?.track
        : action.payload?.tracks[index];

      state.name = data.name;
      state.id = data.id;
      state.imgUrl = data.album?.images[1].url || state.imgUrl;
      state.releaseDate = data.album?.release_date || state.release_date;
      state.artist = data.album?.artists[0].name || state.artist;
      state.duration = data.duration_ms;
      state.previewTrack = data.preview_url;
      state.indexTrack = index;
    },

    PREV_TRACK(state, action) {
      let index = state.indexTrack - 1;

      //Controlar que el indice no sea negativo
      if (index < 0) {
        index = 0;
      }

      //Controlar datos enviados de la API
      const data = action.payload?.tracks[index]?.track
        ? action.payload?.tracks[index]?.track
        : action.payload?.tracks[index];

      state.name = data.name;
      state.id = data.id;

      state.imgUrl = data.album?.images[1].url || state.imgUrl;
      state.releaseDate = data.album?.release_date || state.release_date;
      state.artist = data.album?.artists[0].name || state.artist;

      state.duration = data.duration_ms;
      state.previewTrack = data.preview_url;
      state.indexTrack = index;
    },
    SET_LIST_TRACK(state, action) {
      state.tracks = action.payload?.tracks;
    },
    TOGGLE_REPEAT(state) {
      state.repeat = !state.repeat;
    },
    TOGGLE_SHUFFLE(state) {
      state.shuffle = !state.shuffle;
    },
  },
});

export const currentTrackActions = currentTrackSlice.actions;
export default currentTrackSlice.reducer;
