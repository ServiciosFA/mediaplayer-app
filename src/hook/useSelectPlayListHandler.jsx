import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import apiClient from "../spotify";
import { currentTrackActions } from "../store/currentTrackSlice";

const useSelectPlayList = (item, url) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  //Establecer nueva lista seleccionada por id -establece en storage-Redirige a player
  const playListHandler = async (item) => {
    try {
      setError(false);
      const response = await apiClient.get(
        item.type + "s/" + item.id + "/tracks"
      );
      dispatch(
        currentTrackActions.SET_LIST_TRACK({ tracks: response.data.items })
      );

      const objeto =
        item.type === "album"
          ? {
              ...response.data.items[0],
              album: {
                images: [item.images[0]],
                release_date: "",
                artists: item.artists,
              },
              indexTrack: 0,
            }
          : { ...response.data.items[0].track, indexTrack: 0 };

      dispatch(currentTrackActions.SET_CURRENT_TRACK(objeto));

      navigate("/player", { state: { playList: response.data.items } });
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };
  return { playListHandler };
};

export default useSelectPlayList;
