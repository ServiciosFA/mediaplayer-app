import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import apiClient from "../spotify";
import { currentTrackActions } from "../store/currentTrackSlice";

const useSelectPlayList = (item) => {
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
      setError(true);
    }
  };
  return { playListHandler };
};

export default useSelectPlayList;
