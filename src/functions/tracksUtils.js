import apiClient from "../spotify";
import { currentTrackActions } from "../store/currentTrackSlice";

export const fetchTracks = async (location, setLoading, dispatch, setError) => {
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

      setLoading(false);
    } else {
    }
  } catch (error) {
    console.log(error);
    setError(error.response.data);
    setLoading(false);
  }
};

export const fetchArtist = async (setLoading, setLike, id, setError) => {
  try {
    setLoading(true);
    const data = await apiClient.get("me/tracks");
    if (data.status === 403)
      throw new Error(
        "This account doesn't have permission on this page, please follow the login instructions. "
      );
    if (data.data.items.find((item) => item.track.id === id)) {
      setLike(true);
      setLoading(false);
    } else {
      setLike(false);
      setLoading(false);
    }
  } catch (error) {
    setError(error.response.data);
  }
};

export const fetchTooglelikes = async (setLike, like, id, setError) => {
  try {
    if (!like) {
      const response = await apiClient.put("me/tracks?ids=" + id);
      if (
        response.status === 200 ||
        response.status === 204 ||
        response.status === 403
      ) {
        setLike(true);
      }
    } else {
      const response = await apiClient.delete("me/tracks?ids=" + id);

      if (
        response.status === 200 ||
        response.status === 204 ||
        response.status === 403
      ) {
        setLike(false);
      }
    }
  } catch (error) {
    setError(error.response.data);
    console.log(error);
  }
};
