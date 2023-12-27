import apiClient from "../spotify";
import { currentTrackActions } from "../store/currentTrackSlice";

export const fetchTracks = async (location, setLoading, setError, dispatch) => {
  try {
    setLoading(true);
    if (location?.state?.id) {
      const data = await apiClient.get(
        "playlists/" + location.state?.id + "/tracks"
      );
      dispatch(
        currentTrackActions.SET_CURRENT_TRACK({
          ...data.data.items[0].track,
          tracks: data.data.items,
          indexTrack: 0,
        })
      );
      if (!data) throw new Error("Bad request");
      setError(null);
      setLoading(false);
    } else {
    }
  } catch (error) {
    console.log(error);
    setError(error.message);
    setLoading(false);
  }
};

export const fetchArtist = async (setLoading, setLike, id) => {
  setLoading(true);
  const data = await apiClient.get("me/tracks");
  if (data.data.items.find((item) => item.track.id === id)) {
    setLike(true);
    setLoading(false);
  } else {
    setLike(false);
    setLoading(false);
  }
};

export const fetchTooglelikes = async (setLike, like, id) => {
  try {
    if (!like) {
      const response = await apiClient.put("me/tracks?ids=" + id);
      if (response.status === 200 || response.status === 204) {
        setLike(true);
      }
    } else {
      const response = await apiClient.delete("me/tracks?ids=" + id);

      if (response.status === 200 || response.status === 204) {
        setLike(false);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
