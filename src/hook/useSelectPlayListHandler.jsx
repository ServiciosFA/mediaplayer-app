import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import apiClient from "../spotify";
import { currentTrackActions } from "../store/currentTrackSlice";
import { notificationActions } from "../store/notificationSlice";

const useSelectPlayList = (item) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Establecer nueva lista seleccionada por id -establece en storage-Redirige a player
  const playListHandler = async (item) => {
    try {
      const response = await apiClient.get(
        item.type + "s/" + item.id + "/tracks"
      );
      if (response.status === 403)
        throw new Error(
          "This account doesn't have permission on this page, please follow the login instructions. "
        );
      const data = response.data;
      dispatch(currentTrackActions.SET_LIST_TRACK({ tracks: data.items }));

      const objeto =
        item.type === "album"
          ? {
              ...data.items[0],
              album: {
                images: [item.images[0]],
                release_date: "",
                artists: item.artists,
              },
              indexTrack: 0,
            }
          : { ...data.items[0].track, indexTrack: 0, artists: data.artist };

      dispatch(currentTrackActions.SET_CURRENT_TRACK(objeto));
      navigate("/player", { state: { playList: data.items } });
    } catch (error) {
      console.log(error);
      dispatch(
        notificationActions.ACTIVE_NOTIFICATION({
          message: error.response.data || "An error occurred.",
          type: "error",
        })
      );
    }
  };
  return { playListHandler };
};

export default useSelectPlayList;
